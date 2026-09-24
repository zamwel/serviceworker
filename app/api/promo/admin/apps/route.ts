import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { APPS } from "@/lib/apps";

/* Admin management of custom apps for the promo dashboard. Built-in apps live
   in lib/apps.ts; apps registered from the UI live here instead of the
   browser's localStorage so they survive across devices/browsers. Protected
   by the PROMO_ADMIN_SECRET env var, sent as the `x-admin-secret` header. */
function authorized(req: Request): boolean {
  const secret = process.env.PROMO_ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

function titleCase(id: string): string {
  return id.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// GET /api/promo/admin/apps
// Also recovers any app that has coupons but no registry row — this covers
// apps that were registered from the browser before apps moved out of
// localStorage and into this table.
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const [apps, couponAppIds] = await Promise.all([
    prisma.promoApp.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.promoCoupon.findMany({ distinct: ["appId"], select: { appId: true } }),
  ]);

  const knownIds = new Set([...APPS.map((a) => a.id), ...apps.map((a) => a.id)]);
  const orphanIds = couponAppIds.map((c) => c.appId).filter((id) => !knownIds.has(id));

  if (orphanIds.length > 0) {
    const recovered = await prisma.$transaction(
      orphanIds.map((id) =>
        prisma.promoApp.upsert({
          where: { id },
          create: { id, name: titleCase(id), prefix: id.slice(0, 2).toUpperCase(), fcmTopic: `${id}_all` },
          update: {},
        })
      )
    );
    apps.push(...recovered);
  }

  return NextResponse.json({ apps }, { status: 200 });
}

// POST /api/promo/admin/apps  { id, name, prefix, fcmTopic }
// Upserts — safe to call again for an app that already exists.
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = String(body.id ?? "").trim().toLowerCase().replace(/\s+/g, "-");
    const name = String(body.name ?? "").trim();
    const prefix = String(body.prefix ?? "").trim().toUpperCase();
    const fcmTopic = String(body.fcmTopic ?? "").trim() || `${id}_all`;
    if (!id || !name || !prefix) {
      return NextResponse.json({ message: "id, name, and prefix are required" }, { status: 400 });
    }
    const app = await prisma.promoApp.upsert({
      where: { id },
      create: { id, name, prefix, fcmTopic },
      update: { name, prefix, fcmTopic },
    });
    return NextResponse.json({ success: true, app }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save app.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// DELETE /api/promo/admin/apps?id=<appId>
export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ message: "id is required" }, { status: 400 });
  await prisma.promoApp.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true }, { status: 200 });
}
