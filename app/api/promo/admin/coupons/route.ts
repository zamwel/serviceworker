/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateCode } from "@/lib/promo";

/* Admin coupon management for ALL apps. Protected by the PROMO_ADMIN_SECRET
   env var, sent as the `x-admin-secret` header. */
function authorized(req: Request): boolean {
  const secret = process.env.PROMO_ADMIN_SECRET;
  if (!secret) return false; // refuse if no secret is configured
  return req.headers.get("x-admin-secret") === secret;
}

type CouponDefaults = {
  rewardType: string;
  durationDays: number | null;
  creditAmount: number | null;
  maxRedemptions: number;
  active: boolean;
  expiresAt: Date | null;
  note: string;
};

function readDefaults(body: any): CouponDefaults {
  return {
    rewardType: body.rewardType ?? "lifetime",
    durationDays: body.durationDays ?? null,
    creditAmount: body.creditAmount ?? null,
    maxRedemptions: body.maxRedemptions ?? 1,
    active: body.active ?? true,
    expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    note: body.note ?? "",
  };
}

// POST /api/promo/admin/coupons
//   Single : { appId, code, ...defaults }
//   List   : { appId, codes: ["A","B"], ...defaults }
//   Bulk   : { appId, count: 50, prefix?: "MV", codeLength?: 8, ...defaults }
//   Rows   : { appId, rows: [{ code, rewardType?, durationDays?, creditAmount?,
//              maxRedemptions?, note? }], ...defaults }  (CSV import)
//   Pass `replaceExisting: true` to overwrite any coupon that already has the
//   same (appId, code) instead of skipping it.
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const appId = String(body.appId ?? "").trim();
    if (!appId) {
      return NextResponse.json({ message: "appId is required" }, { status: 400 });
    }
    const defaults = readDefaults(body);
    const replaceExisting = body.replaceExisting === true;

    // Per-row entries (CSV import) carry their own reward config, falling
    // back to the shared defaults for anything left blank.
    let rows: (CouponDefaults & { code: string })[] = [];
    if (Array.isArray(body.rows) && body.rows.length > 0) {
      rows = body.rows
        .map((r: any) => ({
          code: String(r.code ?? "").trim().toUpperCase(),
          rewardType: r.rewardType ?? defaults.rewardType,
          durationDays: r.durationDays ?? defaults.durationDays,
          creditAmount: r.creditAmount ?? defaults.creditAmount,
          maxRedemptions: r.maxRedemptions ?? defaults.maxRedemptions,
          active: defaults.active,
          expiresAt: defaults.expiresAt,
          note: r.note ?? defaults.note,
        }))
        .filter((r: { code: string }) => r.code);
    } else {
      // Resolve the set of codes to create from count / codes[] / code.
      let codes: string[] = [];
      if (typeof body.count === "number" && body.count > 0) {
        const count = Math.min(body.count, 5000); // safety cap
        const set = new Set<string>();
        while (set.size < count) {
          set.add(generateCode(body.prefix ?? "", body.codeLength ?? 8));
        }
        codes = [...set];
      } else if (Array.isArray(body.codes)) {
        codes = body.codes.map((c: any) => String(c).trim().toUpperCase()).filter(Boolean);
      } else if (body.code) {
        codes = [String(body.code).trim().toUpperCase()];
      }
      rows = codes.map((code) => ({ code, ...defaults }));
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Provide code, codes[], rows[], or count." },
        { status: 400 }
      );
    }

    const codes = rows.map((r) => r.code);
    const existing = await prisma.promoCoupon.findMany({
      where: { appId, code: { in: codes } },
      select: { code: true },
    });
    const existingSet = new Set(existing.map((e) => e.code));

    if (replaceExisting) {
      // Upsert in small concurrent batches — firing one promise per row
      // (CSV imports can be thousands of rows) exhausts the connection pool.
      const BATCH_SIZE = 5;
      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map(({ code, ...defaults }) =>
            prisma.promoCoupon.upsert({
              where: { appId_code: { appId, code } },
              create: { appId, code, ...defaults },
              update: { ...defaults },
            })
          )
        );
      }
      return NextResponse.json(
        {
          success: true,
          created: rows.filter((r) => !existingSet.has(r.code)).map((r) => r.code),
          replaced: [...existingSet],
          createdCount: rows.length,
        },
        { status: 201 }
      );
    }

    const toCreate = rows.filter((r) => !existingSet.has(r.code));
    if (toCreate.length > 0) {
      await prisma.promoCoupon.createMany({
        data: toCreate.map(({ code, ...defaults }) => ({ appId, code, ...defaults })),
        skipDuplicates: true,
      });
    }

    return NextResponse.json(
      {
        success: true,
        created: toCreate.map((r) => r.code),
        createdCount: toCreate.length,
        skipped: [...existingSet],
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 400 });
  }
}

// GET /api/promo/admin/coupons?appId=muvees&page=1&limit=50&q=MV
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId") ?? undefined;
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") ?? "50")));
    const q = (searchParams.get("q") ?? "").trim().toUpperCase();
    const where = {
      ...(appId ? { appId } : {}),
      ...(q ? { code: { contains: q } } : {}),
    };
    const [coupons, total] = await Promise.all([
      prisma.promoCoupon.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { _count: { select: { redemptions: true } } },
      }),
      prisma.promoCoupon.count({ where }),
    ]);
    return NextResponse.json({ coupons, total, page, limit, pages: Math.ceil(total / limit) }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}

// PATCH /api/promo/admin/coupons
//   { id, active?, revokeGrants? }              — status toggle / revoke
//   { id, code?, rewardType?, durationDays?, creditAmount?, maxRedemptions?,
//     note?, expiresAt? }                        — full field edit
//   active:false stops new redemptions; revokeGrants:true also revokes every
//   device grant already issued from this coupon (kills it on next online sync).
export async function PATCH(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = String(body.id ?? "");
    if (!id) return NextResponse.json({ message: "id is required" }, { status: 400 });

    const data: Record<string, unknown> = {};
    if (typeof body.active === "boolean") data.active = body.active;
    if (typeof body.code === "string" && body.code.trim()) data.code = body.code.trim().toUpperCase();
    if (typeof body.rewardType === "string") data.rewardType = body.rewardType;
    if ("durationDays" in body) data.durationDays = body.durationDays === null ? null : Number(body.durationDays);
    if ("creditAmount" in body) data.creditAmount = body.creditAmount === null ? null : Number(body.creditAmount);
    if (typeof body.maxRedemptions === "number") data.maxRedemptions = body.maxRedemptions;
    if (typeof body.note === "string") data.note = body.note;
    if ("expiresAt" in body) data.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;

    if (Object.keys(data).length > 0) {
      await prisma.promoCoupon.update({ where: { id }, data });
    }
    if (body.revokeGrants === true) {
      await prisma.promoRedemption.updateMany({
        where: { couponId: id },
        data: { revoked: true },
      });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 400 });
  }
}

// DELETE /api/promo/admin/coupons?id=<single>  — or —  ?ids=id1,id2,id3
// Both cascade to their redemptions via the Prisma onDelete: Cascade relation.
export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids")?.split(",").map((s) => s.trim()).filter(Boolean);
    const id  = searchParams.get("id");

    if (ids && ids.length > 0) {
      const { count } = await prisma.promoCoupon.deleteMany({ where: { id: { in: ids } } });
      return NextResponse.json({ success: true, deleted: count }, { status: 200 });
    }

    if (!id) return NextResponse.json({ message: "id or ids is required" }, { status: 400 });
    await prisma.promoCoupon.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 400 });
  }
}
