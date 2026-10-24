import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/promo/admin/notify/track?id=...&url=...
// Zero-app-touch tracking redirect: increments tappedCount in the database and redirects to target URL.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const targetUrl = searchParams.get("url");

    if (id) {
      // Increment tap count asynchronously without blocking the user redirect
      prisma.pushNotification
        .update({
          where: { id },
          data: {
            tappedCount: { increment: 1 },
            lastSyncedAt: new Date(),
          },
        })
        .catch(() => null);
    }

    if (targetUrl) {
      try {
        const parsed = new URL(targetUrl);
        return NextResponse.redirect(parsed.toString(), { status: 307 });
      } catch {
        // invalid URL
      }
    }

    // Default fallback if no valid target URL
    return NextResponse.json({
      success: true,
      message: "Notification tap recorded.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
