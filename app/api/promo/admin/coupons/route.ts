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

    // Resolve the set of codes to create.
    let codes: string[] = [];
    if (typeof body.count === "number" && body.count > 0) {
      const count = Math.min(body.count, 5000); // safety cap
      const set = new Set<string>();
      while (set.size < count) {
        set.add(generateCode(body.prefix ?? "", body.codeLength ?? 8));
      }
      codes = [...set];
    } else if (Array.isArray(body.codes)) {
      codes = body.codes
        .map((c: any) => String(c).trim().toUpperCase())
        .filter(Boolean);
    } else if (body.code) {
      codes = [String(body.code).trim().toUpperCase()];
    }

    if (codes.length === 0) {
      return NextResponse.json(
        { message: "Provide code, codes[], or count." },
        { status: 400 }
      );
    }

    // Skip codes that already exist for this app.
    const existing = await prisma.promoCoupon.findMany({
      where: { appId, code: { in: codes } },
      select: { code: true },
    });
    const existingSet = new Set(existing.map((e) => e.code));
    const toCreate = codes.filter((c) => !existingSet.has(c));

    if (toCreate.length > 0) {
      await prisma.promoCoupon.createMany({
        data: toCreate.map((code) => ({ appId, code, ...defaults })),
        skipDuplicates: true,
      });
    }

    return NextResponse.json(
      {
        success: true,
        created: toCreate,
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

// PATCH /api/promo/admin/coupons  { id, active?, revokeGrants? }
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

    if (typeof body.active === "boolean") {
      await prisma.promoCoupon.update({ where: { id }, data: { active: body.active } });
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

// DELETE /api/promo/admin/coupons?id=...  (cascades to its redemptions)
export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ message: "id is required" }, { status: 400 });
    await prisma.promoCoupon.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 400 });
  }
}
