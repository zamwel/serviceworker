/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getDeviceGrant } from "@/lib/promo";

// GET /api/promo/device-grant?appId=muvees&deviceId=...
//   → PromoResult (success:false when no active grant — NOT an error)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId") ?? "";
    const deviceId = searchParams.get("deviceId") ?? "";
    const result = await getDeviceGrant(appId, deviceId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message ?? "Server error." },
      { status: 400 }
    );
  }
}
