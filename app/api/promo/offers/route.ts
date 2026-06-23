import { NextResponse } from "next/server";
import { findApp } from "@/lib/apps";

// GET /api/promo/offers?appId=muvees → { offers: OfferItem[] }
// Offers are defined in lib/apps.ts under each app's `offers` array.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId") ?? "";
    const app = findApp(appId);
    return NextResponse.json({ offers: app?.offers ?? [] }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ offers: [], message }, { status: 200 });
  }
}
