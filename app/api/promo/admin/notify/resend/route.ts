import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendFcmBroadcast } from "@/lib/fcm";

function authorized(req: Request): boolean {
  const secret = process.env.PROMO_ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

// POST /api/promo/admin/notify/resend
// Resends an existing push notification with strict app isolation constraints.
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      id: string;
      createNewRecord?: boolean;
      title?: string;
      body?: string;
      topic?: string;
      packageName?: string;
      channelId?: string;
      actionUrl?: string;
      imageUrl?: string;
    };

    if (!body.id) {
      return NextResponse.json({ message: "Notification ID is required." }, { status: 400 });
    }

    const existing = await prisma.pushNotification.findUnique({
      where: { id: body.id },
    });

    if (!existing) {
      return NextResponse.json({ message: "Notification not found." }, { status: 404 });
    }

    const title = (body.title || existing.title).trim();
    const messageBody = (body.body || existing.body).trim();
    const topic = (body.topic || existing.topic).trim();
    const packageName = body.packageName !== undefined ? body.packageName.trim() || undefined : existing.packageName || undefined;
    const channelId = body.channelId || existing.channelId || undefined;
    const imageUrl = body.imageUrl !== undefined ? body.imageUrl.trim() || undefined : existing.imageUrl || undefined;
    const actionUrl = body.actionUrl !== undefined ? body.actionUrl.trim() || undefined : existing.actionUrl || undefined;

    const fcmResult = await sendFcmBroadcast({
      appId: existing.appId,
      title,
      body: messageBody,
      imageUrl,
      actionUrl,
      topic,
      packageName,
      channelId,
    });

    if (body.createNewRecord) {
      const newNotification = await prisma.pushNotification.create({
        data: {
          appId: existing.appId,
          appName: existing.appName,
          topic: fcmResult.topic,
          packageName: fcmResult.packageName || null,
          channelId: fcmResult.channelId || existing.channelId,
          title,
          body: messageBody,
          imageUrl: imageUrl || null,
          actionUrl: actionUrl || null,
          analyticsLabel: fcmResult.analyticsLabel || null,
          status: fcmResult.success ? "sent" : "failed",
          fcmMessageId: fcmResult.fcmMessageId || null,
          error: fcmResult.error || null,
          sentAt: fcmResult.success ? new Date() : null,
        },
      });

      return NextResponse.json({
        success: fcmResult.success,
        notification: newNotification,
        fcmResult,
      });
    }

    // Update existing row
    const updated = await prisma.pushNotification.update({
      where: { id: body.id },
      data: {
        title,
        body: messageBody,
        topic: fcmResult.topic,
        packageName: fcmResult.packageName || null,
        channelId: fcmResult.channelId || existing.channelId,
        imageUrl: imageUrl || null,
        actionUrl: actionUrl || null,
        analyticsLabel: fcmResult.analyticsLabel || existing.analyticsLabel,
        status: fcmResult.success ? "sent" : "failed",
        fcmMessageId: fcmResult.fcmMessageId || existing.fcmMessageId,
        error: fcmResult.error || null,
        sentAt: fcmResult.success ? new Date() : existing.sentAt,
      },
    });

    return NextResponse.json({
      success: fcmResult.success,
      notification: updated,
      fcmResult,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
