/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

// GET /api/promo/offers?appId=muvees → { offers: ParentOffer[] }
//
// Promotional offers shown inside an app's Offers screen. These are
// marketing/coupon offers (NOT store IAP products, which the app gets from the
// store directly). Return per-app offers here as your campaigns require.
const OFFERS_BY_APP: Record<string, unknown[]> = {
  // Example shape — populate per campaign:
  // muvees: [{
  //   id: "promo-launch", title: "Launch Special", description: "Redeem your code for free Pro.",
  //   type: "lifetime", price: 0, currency: "USD", isFree: true, badge: "LIMITED",
  // }],
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId") ?? "";
    return NextResponse.json({ offers: OFFERS_BY_APP[appId] ?? [] }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ offers: [], message: error?.message }, { status: 200 });
  }
}
