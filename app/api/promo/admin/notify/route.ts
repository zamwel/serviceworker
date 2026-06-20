import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/* Protected by the same PROMO_ADMIN_SECRET used by the coupon API. */
function authorized(req: Request): boolean {
  const secret = process.env.PROMO_ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

/* Exchange a RS256 service-account JWT for a short-lived OAuth2 access token,
   then POST the notification to FCM v1. */
async function sendFcmBroadcast({
  title,
  body,
  imageUrl,
  topic = "all",
}: {
  title: string;
  body: string;
  imageUrl?: string;
  topic?: string;
}): Promise<{ success: boolean; error?: string; raw?: unknown }> {
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!saJson) {
    return { success: false, error: "FIREBASE_SERVICE_ACCOUNT_JSON env var is not set." };
  }

  let sa: Record<string, string>;
  try {
    sa = JSON.parse(saJson);
  } catch {
    return { success: false, error: "FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON." };
  }

  const { project_id, client_email, private_key } = sa;
  if (!project_id || !client_email || !private_key) {
    return { success: false, error: "Service account JSON missing project_id, client_email, or private_key." };
  }

  // Build a JWT to exchange for an OAuth2 access token.
  const nowSecs = Math.floor(Date.now() / 1000);
  const assertion = jwt.sign(
    {
      iss: client_email,
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: "https://oauth2.googleapis.com/token",
      exp: nowSecs + 3600,
      iat: nowSecs,
    },
    private_key,
    { algorithm: "RS256" }
  );

  // Exchange for access token.
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${assertion}`,
  });
  const tokenData = await tokenRes.json() as Record<string, string>;
  const accessToken = tokenData.access_token;
  if (!accessToken) {
    return { success: false, error: `Token exchange failed: ${JSON.stringify(tokenData)}` };
  }

  // Send to FCM v1.
  const payload = {
    message: {
      topic,
      notification: {
        title,
        body,
        ...(imageUrl ? { image: imageUrl } : {}),
      },
      android: {
        priority: "high",
        notification: { channel_id: "muvees_broadcasts" },
      },
      apns: {
        payload: { aps: { sound: "default" } },
      },
    },
  };

  const fcmRes = await fetch(
    `https://fcm.googleapis.com/v1/projects/${project_id}/messages:send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  const fcmData = await fcmRes.json();
  return { success: fcmRes.ok, raw: fcmData, ...(!fcmRes.ok ? { error: JSON.stringify(fcmData) } : {}) };
}

// POST /api/promo/admin/notify  { title, body, imageUrl?, topic? }
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { title, body, imageUrl, topic } = await req.json() as {
      title?: string;
      body?: string;
      imageUrl?: string;
      topic?: string;
    };

    if (!title?.trim() || !body?.trim()) {
      return NextResponse.json({ message: "title and body are required." }, { status: 400 });
    }

    const result = await sendFcmBroadcast({ title: title.trim(), body: body.trim(), imageUrl, topic });
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
