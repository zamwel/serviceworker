/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { redeemCoupon } from "@/lib/promo";

// POST /api/promo/redeem  ← { appId, couponCode, deviceId }
//                          → PromoResult
export async function POST(req: Request) {
  try {
    const { appId, couponCode, deviceId } = await req.json();
    const result = await redeemCoupon(appId, couponCode, deviceId);
    return NextResponse.json(result, { status: result.success ? 200 : 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message ?? "Server error." },
      { status: 400 }
    );
  }
}
