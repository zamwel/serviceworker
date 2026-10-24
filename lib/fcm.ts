import jwt from "jsonwebtoken";
import { findApp, getAppPackageName, getAppChannelId } from "./apps";
import prisma from "./prisma";

export interface FcmSendOptions {
  appId: string;
  title: string;
  body: string;
  imageUrl?: string;
  actionUrl?: string;
  topic?: string;
  packageName?: string;
  channelId?: string;
  analyticsLabel?: string;
}

export interface FcmSendResult {
  success: boolean;
  fcmMessageId?: string;
  analyticsLabel?: string;
  packageName?: string;
  channelId?: string;
  topic: string;
  error?: string;
  raw?: unknown;
}

/**
 * Sanitizes an analytics label to conform to FCM v1 requirements:
 * max 50 chars, allowed: [a-zA-Z0-9-_.~%]
 */
export function sanitizeAnalyticsLabel(label: string): string {
  const sanitized = label.replace(/[^a-zA-Z0-9\-_.~%]/g, "_").slice(0, 50);
  return sanitized || `camp_${Date.now()}`;
}

export function generateAnalyticsLabel(appId: string): string {
  const cleanApp = appId.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 14) || "app";
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // e.g. 261024
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${cleanApp}_${dateStr}_${randomSuffix}`;
}

/**
 * Parse and validate the Firebase service account JSON from environment.
 */
export function getFirebaseServiceAccount(): {
  project_id: string;
  client_email: string;
  private_key: string;
} {
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!saJson) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON env var is not set.");
  }
  let sa: Record<string, string>;
  try {
    sa = JSON.parse(saJson);
  } catch {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }
  const { project_id, client_email, private_key } = sa;
  if (!project_id || !client_email || !private_key) {
    throw new Error(
      "Service account JSON missing project_id, client_email, or private_key."
    );
  }
  return { project_id, client_email, private_key };
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

/**
 * Exchanges a service account JWT for a Google OAuth2 access token with messaging scopes.
 */
export async function getFirebaseAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60) {
    return cachedAccessToken.token;
  }

  const { client_email, private_key } = getFirebaseServiceAccount();
  const assertion = jwt.sign(
    {
      iss: client_email,
      scope:
        "https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/cloud-platform",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    },
    private_key,
    { algorithm: "RS256" }
  );

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${assertion}`,
  });

  const data = (await res.json()) as Record<string, unknown>;
  const accessToken = typeof data.access_token === "string" ? data.access_token : null;
  const expiresIn = typeof data.expires_in === "number" ? data.expires_in : 3600;

  if (!accessToken) {
    throw new Error(`Token exchange failed: ${JSON.stringify(data)}`);
  }

  cachedAccessToken = {
    token: accessToken,
    expiresAt: now + expiresIn,
  };

  return accessToken;
}

/**
 * Resolves the package name constraint for an app.
 * Checks lib/apps.ts registry first, then falls back to PromoApp in the database.
 */
export async function resolvePackageName(appId: string): Promise<string | undefined> {
  const builtInPackage = getAppPackageName(appId);
  if (builtInPackage) return builtInPackage;

  try {
    const dbApp = await prisma.promoApp.findUnique({
      where: { id: appId },
      select: { packageName: true },
    });
    return dbApp?.packageName || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Resolves the Firebase App ID for deliveryData sync.
 */
export async function resolveFirebaseAppId(appId: string): Promise<string | undefined> {
  const builtIn = findApp(appId);
  if (builtIn?.firebaseAppId) return builtIn.firebaseAppId;

  try {
    const dbApp = await prisma.promoApp.findUnique({
      where: { id: appId },
      select: { firebaseAppId: true },
    });
    return dbApp?.firebaseAppId || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Sends a push notification with strict app isolation constraints.
 * 
 * Constraint mechanisms:
 * 1. android.restricted_package_name: Enforced by Google Play Services on client devices.
 *    If an app like sanitarypad is also subscribed to "all", Android drops the push because
 *    its package name does not match restricted_package_name.
 * 2. apns.headers["apns-topic"]: Enforced by Apple APNs to only deliver to this bundle ID.
 * 3. notification.channel_id: Namespaced to the target app (${appId}_broadcasts).
 * 4. fcm_options.analytics_label: Attributes notification_receive and notification_open
 *    automatically in Firebase Cloud Messaging reporting and BigQuery without touching mobile apps.
 */
export async function sendFcmBroadcast(
  options: FcmSendOptions
): Promise<FcmSendResult> {
  const { appId, title, body, imageUrl, actionUrl } = options;
  const app = findApp(appId);

  // Determine topic: options.topic -> app.fcmTopic -> "all"
  const topic = (options.topic?.trim() || app?.fcmTopic || "all").trim();

  // Determine package name constraint
  let packageName = options.packageName?.trim();
  if (!packageName) {
    packageName = await resolvePackageName(appId);
  }

  // Determine channel ID
  const channelId = options.channelId?.trim() || getAppChannelId(appId);

  // Generate or sanitize analytics label
  const analyticsLabel = options.analyticsLabel?.trim()
    ? sanitizeAnalyticsLabel(options.analyticsLabel.trim())
    : generateAnalyticsLabel(appId);

  const { project_id } = getFirebaseServiceAccount();
  const accessToken = await getFirebaseAccessToken();

  // Construct FCM v1 payload with isolation constraints
  const messagePayload: Record<string, unknown> = {
    topic,
    notification: {
      title,
      body,
      ...(imageUrl ? { image: imageUrl } : {}),
    },
    android: {
      priority: "high",
      ...(packageName ? { restricted_package_name: packageName } : {}),
      notification: {
        channel_id: channelId,
        default_sound: true,
        notification_priority: "PRIORITY_HIGH",
      },
    },
    apns: {
      headers: {
        ...(packageName ? { "apns-topic": packageName } : {}),
      },
      payload: {
        aps: {
          sound: "default",
          alert: {
            title,
            body,
          },
        },
      },
    },
    data: {
      appId,
      ...(packageName ? { packageName } : {}),
      ...(actionUrl ? { actionUrl } : {}),
      ...(analyticsLabel ? { analyticsLabel } : {}),
    },
    fcm_options: {
      analytics_label: analyticsLabel,
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
      body: JSON.stringify({ message: messagePayload }),
    }
  );

  const fcmData = (await fcmRes.json()) as { name?: string; error?: unknown };

  if (fcmRes.ok && fcmData.name) {
    return {
      success: true,
      fcmMessageId: fcmData.name,
      analyticsLabel,
      packageName,
      channelId,
      topic,
      raw: fcmData,
    };
  }

  return {
    success: false,
    analyticsLabel,
    packageName,
    channelId,
    topic,
    error: JSON.stringify(fcmData.error || fcmData),
    raw: fcmData,
  };
}

/**
 * Queries Google Cloud FCM Data API for delivery performance.
 * If API is not enabled on GCP, returns status and the activation URL.
 */
export async function fetchFcmDeliveryData(firebaseAppId: string): Promise<{
  enabled: boolean;
  activationUrl?: string;
  data?: unknown;
  error?: string;
}> {
  try {
    const { project_id } = getFirebaseServiceAccount();
    const token = await getFirebaseAccessToken();
    const url = `https://fcmdata.googleapis.com/v1beta1/projects/${project_id}/androidApps/${firebaseAppId}/deliveryData`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = (await res.json()) as { error?: { status?: string; message?: string } };

    if (res.status === 403 && json.error?.status === "PERMISSION_DENIED") {
      return {
        enabled: false,
        activationUrl: `https://console.developers.google.com/apis/api/fcmdata.googleapis.com/overview?project=${project_id}`,
        error: json.error.message,
      };
    }

    if (!res.ok) {
      return {
        enabled: false,
        error: json.error?.message || `HTTP ${res.status}`,
      };
    }

    return {
      enabled: true,
      data: json,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { enabled: false, error: message };
  }
}
