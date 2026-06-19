/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* Admin coupon management for ALL apps. Protected by the PROMO_ADMIN_SECRET
   env var, sent as the `x-admin-secret` header. */
function authorized(req: Request): boolean {
  const secret = process.env.PROMO_ADMIN_SECRET;
  if (!secret) return false; // refuse if no secret is configured
  return req.headers.get("x-admin-secret") === secret;
}

// POST /api/promo/admin/coupons
//   body: { appId, code, rewardType?, durationDays?, creditAmount?,
//           maxRedemptions?, expiresAt?, note? }
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const appId = String(body.appId ?? "").trim();
    const code = String(body.code ?? "").trim().toUpperCase();
    if (!appId || !code) {
      return NextResponse.json({ message: "appId and code are required" }, { status: 400 });
    }
    const coupon = await prisma.promoCoupon.create({
      data: {
        appId,
        code,
        rewardType: body.rewardType ?? "lifetime",
        durationDays: body.durationDays ?? null,
        creditAmount: body.creditAmount ?? null,
        maxRedemptions: body.maxRedemptions ?? 1,
        active: body.active ?? true,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        note: body.note ?? "",
      },
    });
    return NextResponse.json({ success: true, coupon }, { status: 201 });
  } catch (error: any) {
    // Unique constraint (appId, code) already exists
    if (error?.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "A coupon with this code already exists for this app." },
        { status: 409 }
      );
    }
    return NextResponse.json({ success: false, message: error?.message }, { status: 400 });
  }
}

// GET /api/promo/admin/coupons?appId=muvees  → list coupons (+ redeemed counts)
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId") ?? undefined;
    const coupons = await prisma.promoCoupon.findMany({
      where: appId ? { appId } : undefined,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { redemptions: true } } },
    });
    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
