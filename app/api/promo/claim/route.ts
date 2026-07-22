/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { claimFreeCode } from "@/lib/promo";

// POST /api/promo/claim  ← { appId, deviceId }
//                         → ClaimResult (PromoResult + code)
// Device-bound, idempotent, single-use per device — see lib/promo.ts.
export async function POST(req: Request) {
  try {
    const { appId, deviceId } = await req.json();
    const result = await claimFreeCode(appId, deviceId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message ?? "Server error." },
      { status: 400 }
    );
  }
}
