import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { findApp } from "@/lib/apps";
import { sendFcmBroadcast } from "@/lib/fcm";

/* Protected by the same PROMO_ADMIN_SECRET used by the coupon API. */
function authorized(req: Request): boolean {
  const secret = process.env.PROMO_ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

// GET /api/promo/admin/notify?appId=...&status=...&q=...&page=1&limit=20
// Returns paginated notification history with delivery and tap metrics.
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId") || "";
    const status = searchParams.get("status") || "";
    const q = searchParams.get("q") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (appId && appId !== "all") {
      where.appId = appId;
    }

    if (status && status !== "all") {
      where.status = status;
    }

    if (q.trim()) {
      where.OR = [
        { title: { contains: q.trim(), mode: "insensitive" } },
        { body: { contains: q.trim(), mode: "insensitive" } },
        { topic: { contains: q.trim(), mode: "insensitive" } },
        { analyticsLabel: { contains: q.trim(), mode: "insensitive" } },
        { packageName: { contains: q.trim(), mode: "insensitive" } },
      ];
    }

    const [total, notifications] = await Promise.all([
      prisma.pushNotification.count({ where }),
      prisma.pushNotification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    const pages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      notifications,
      total,
      page,
      pages,
      limit,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/promo/admin/notify
// Sends a notification with strict app isolation constraints OR saves as draft.
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      action?: "send" | "draft";
      appId?: string;
      appName?: string;
      title?: string;
      body?: string;
      imageUrl?: string;
      actionUrl?: string;
      topic?: string;
      packageName?: string;
      channelId?: string;
      analyticsLabel?: string;
    };

    const action = body.action || "send";
    const appId = (body.appId || "muvees").trim();
    const title = (body.title || "").trim();
    const messageBody = (body.body || "").trim();
    const imageUrl = body.imageUrl?.trim() || null;
    const actionUrl = body.actionUrl?.trim() || null;
    const appEntry = findApp(appId);
    const appName = body.appName?.trim() || appEntry?.name || appId;

    if (!title || !messageBody) {
      return NextResponse.json(
        { message: "Title and message body are required." },
        { status: 400 }
      );
    }

    // ── Save as Draft ────────────────────────────────────────────────────────
    if (action === "draft") {
      const draft = await prisma.pushNotification.create({
        data: {
          appId,
          appName,
          topic: (body.topic || appEntry?.fcmTopic || "all").trim(),
          packageName: body.packageName?.trim() || appEntry?.packageName || null,
          channelId: body.channelId?.trim() || appEntry?.channelId || `${appId}_broadcasts`,
          title,
          body: messageBody,
          imageUrl,
          actionUrl,
          analyticsLabel: body.analyticsLabel?.trim() || null,
          status: "draft",
        },
      });

      return NextResponse.json({ success: true, notification: draft }, { status: 201 });
    }

    // ── Send Broadcast via FCM v1 ───────────────────────────────────────────
    const fcmResult = await sendFcmBroadcast({
      appId,
      title,
      body: messageBody,
      imageUrl: imageUrl || undefined,
      actionUrl: actionUrl || undefined,
      topic: body.topic,
      packageName: body.packageName,
      channelId: body.channelId,
      analyticsLabel: body.analyticsLabel,
    });

    const notification = await prisma.pushNotification.create({
      data: {
        appId,
        appName,
        topic: fcmResult.topic,
        packageName: fcmResult.packageName || null,
        channelId: fcmResult.channelId || `${appId}_broadcasts`,
        title,
        body: messageBody,
        imageUrl,
        actionUrl,
        analyticsLabel: fcmResult.analyticsLabel || null,
        status: fcmResult.success ? "sent" : "failed",
        fcmMessageId: fcmResult.fcmMessageId || null,
        error: fcmResult.error || null,
        sentAt: fcmResult.success ? new Date() : null,
      },
    });

    return NextResponse.json(
      {
        success: fcmResult.success,
        notification,
        fcmResult,
        error: fcmResult.error,
      },
      { status: fcmResult.success ? 200 : 500 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// PATCH /api/promo/admin/notify
// Edit an existing notification in history.
export async function PATCH(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      id: string;
      title?: string;
      body?: string;
      imageUrl?: string;
      actionUrl?: string;
      topic?: string;
      packageName?: string;
      channelId?: string;
      status?: string;
      receivedCount?: number;
      tappedCount?: number;
    };

    if (!body.id) {
      return NextResponse.json({ message: "Notification ID is required." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (typeof body.title === "string") updateData.title = body.title.trim();
    if (typeof body.body === "string") updateData.body = body.body.trim();
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl ? body.imageUrl.trim() : null;
    if (body.actionUrl !== undefined) updateData.actionUrl = body.actionUrl ? body.actionUrl.trim() : null;
    if (typeof body.topic === "string") updateData.topic = body.topic.trim();
    if (typeof body.packageName === "string") updateData.packageName = body.packageName.trim() || null;
    if (typeof body.channelId === "string") updateData.channelId = body.channelId.trim() || null;
    if (typeof body.status === "string") updateData.status = body.status.trim();
    if (typeof body.receivedCount === "number") updateData.receivedCount = Math.max(0, body.receivedCount);
    if (typeof body.tappedCount === "number") updateData.tappedCount = Math.max(0, body.tappedCount);

    const updated = await prisma.pushNotification.update({
      where: { id: body.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, notification: updated }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/promo/admin/notify?id=... OR ?ids=id1,id2
export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const ids = searchParams.get("ids");

    if (ids) {
      const idList = ids.split(",").map((s) => s.trim()).filter(Boolean);
      await prisma.pushNotification.deleteMany({
        where: { id: { in: idList } },
      });
      return NextResponse.json({ success: true, count: idList.length });
    }

    if (id) {
      await prisma.pushNotification.delete({ where: { id } });
      return NextResponse.json({ success: true, id });
    }

    return NextResponse.json({ message: "id or ids parameter is required." }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
