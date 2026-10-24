import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  fetchFcmDeliveryData,
  resolveFirebaseAppId,
  getFirebaseServiceAccount,
} from "@/lib/fcm";

function authorized(req: Request): boolean {
  const secret = process.env.PROMO_ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

// GET /api/promo/admin/notify/stats?appId=...&id=...
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId") || "";
    const id = searchParams.get("id");

    const { project_id } = getFirebaseServiceAccount();
    const firebaseConsoleUrl = `https://console.firebase.google.com/project/${project_id}/notification/reporting`;

    // Calculate aggregated database metrics
    const where: Record<string, unknown> = {};
    if (appId && appId !== "all") where.appId = appId;
    if (id) where.id = id;

    const notifications = await prisma.pushNotification.findMany({
      where,
      select: {
        id: true,
        appId: true,
        appName: true,
        packageName: true,
        title: true,
        topic: true,
        analyticsLabel: true,
        status: true,
        receivedCount: true,
        tappedCount: true,
        sentAt: true,
        lastSyncedAt: true,
      },
    });

    const totalSent = notifications.filter((n) => n.status === "sent").length;
    const totalReceived = notifications.reduce((acc, n) => acc + (n.receivedCount || 0), 0);
    const totalTapped = notifications.reduce((acc, n) => acc + (n.tappedCount || 0), 0);
    const overallTapRate = totalReceived > 0 ? (totalTapped / totalReceived) * 100 : 0;

    // Check Google Cloud FCM Data API status if appId is specified
    let fcmDataApiStatus = {
      checked: false,
      enabled: false,
      firebaseAppId: undefined as string | undefined,
      activationUrl: `https://console.developers.google.com/apis/api/fcmdata.googleapis.com/overview?project=${project_id}`,
      data: undefined as unknown,
      note: "Enable Firebase Cloud Messaging Data API on Google Cloud to automatically query aggregated delivery metrics.",
    };

    if (appId && appId !== "all") {
      const firebaseAppId = await resolveFirebaseAppId(appId);
      if (firebaseAppId) {
        const apiCheck = await fetchFcmDeliveryData(firebaseAppId);
        fcmDataApiStatus = {
          checked: true,
          enabled: apiCheck.enabled,
          firebaseAppId,
          activationUrl:
            apiCheck.activationUrl ||
            `https://console.developers.google.com/apis/api/fcmdata.googleapis.com/overview?project=${project_id}`,
          data: apiCheck.data,
          note: apiCheck.enabled
            ? "FCM Data API is active and reporting aggregated delivery metrics."
            : "FCM Data API is pending activation in Google Cloud Console. Enable it with 1 click to sync metrics directly.",
        };
      }
    }

    return NextResponse.json({
      success: true,
      projectId: project_id,
      firebaseConsoleUrl,
      totals: {
        totalSent,
        totalReceived,
        totalTapped,
        overallTapRate: Math.round(overallTapRate * 10) / 10,
      },
      fcmDataApiStatus,
      notifications,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/promo/admin/notify/stats
// Sync or update metrics for a specific notification.
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      id?: string;
      appId?: string;
      receivedCount?: number;
      tappedCount?: number;
    };

    if (body.id) {
      const updated = await prisma.pushNotification.update({
        where: { id: body.id },
        data: {
          ...(typeof body.receivedCount === "number" ? { receivedCount: body.receivedCount } : {}),
          ...(typeof body.tappedCount === "number" ? { tappedCount: body.tappedCount } : {}),
          lastSyncedAt: new Date(),
        },
      });
      return NextResponse.json({ success: true, notification: updated });
    }

    return NextResponse.json({ message: "Notification ID is required." }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
