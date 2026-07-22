import type { PromoRedemption } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "@/lib/prisma";

/** Generate a human-friendly random coupon code (no ambiguous chars). */
export function generateCode(prefix = "", length = 8): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // excludes I, O, 0, 1
  const bytes = crypto.randomBytes(length);
  let body = "";
  for (let i = 0; i < length; i++) body += alphabet[bytes[i] % alphabet.length];
  const clean = prefix.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return clean ? `${clean}-${body}` : body;
}

/* Lifetime grants get a long token lease so they keep working offline
   effectively forever; subscription tokens expire with the subscription. */
const LIFETIME_LEASE_DAYS = 3650;

function privateKey(): string {
  // Supports the key stored with real newlines OR escaped "\n".
  return (process.env.PROMO_JWT_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
}

/** Sign an RS256 grant token the app verifies offline with its embedded public key. */
function signGrantToken(r: PromoRedemption): string | undefined {
  const key = privateKey();
  if (!key) return undefined;
  const nowSec = Math.floor(Date.now() / 1000);
  const grantExpSec = r.grantExpiresAt
    ? Math.floor(r.grantExpiresAt.getTime() / 1000)
    : nowSec + LIFETIME_LEASE_DAYS * 86_400;
  try {
    return jwt.sign(
      {
        appId: r.appId,
        deviceId: r.deviceId,
        rewardType: r.rewardType,
        // null = lifetime entitlement (token still has its own long lease via exp)
        grantExpiresAt: r.grantExpiresAt ? r.grantExpiresAt.toISOString() : null,
      },
      key,
      { algorithm: "RS256", expiresIn: grantExpSec - nowSec, issuer: "muvees-promo" }
    );
  } catch {
    return undefined;
  }
}

/* ───────────────────────────────────────────────────────────────────────────
   Generic, multi-app promo redemption logic. Every app (Muvees, FemCarePlus,
   SubsWatcher, …) calls these functions with its own `appId`, so the backend
   is written once and shared across all apps.

   Grants are bound to a device's stable hardware id → they survive reinstalls
   with no user sign-in.
   ────────────────────────────────────────────────────────────────────────── */

export type PromoResult = {
  success: boolean;
  rewardType?: string; // "lifetime" | "subscription" | "credits"
  creditAmount?: number | null;
  expiresAt?: string | null; // ISO-8601 for subscription grants; null = lifetime
  token?: string; // RS256 signed grant token, verified offline by the app
  message: string;
  errorCode?: string; // INVALID_CODE | EXPIRED | ALREADY_REDEEMED | REVOKED
};

function grantResult(r: PromoRedemption): PromoResult {
  return {
    success: true,
    rewardType: r.rewardType,
    creditAmount: r.creditAmount ?? undefined,
    expiresAt: r.grantExpiresAt ? r.grantExpiresAt.toISOString() : null,
    token: signGrantToken(r),
    message: "Code redeemed successfully.",
  };
}

/** Validate and redeem a coupon for a device. Idempotent per (coupon, device). */
export async function redeemCoupon(
  appId: string,
  rawCode: string,
  deviceId: string
): Promise<PromoResult> {
  const code = (rawCode || "").trim().toUpperCase();
  if (!appId || !code || !deviceId) {
    return { success: false, message: "Missing required fields.", errorCode: "INVALID_CODE" };
  }

  const coupon = await prisma.promoCoupon.findUnique({
    where: { appId_code: { appId, code } },
  });

  if (!coupon || !coupon.active) {
    return { success: false, message: "This code is not valid.", errorCode: "INVALID_CODE" };
  }
  if (coupon.expiresAt && coupon.expiresAt.getTime() < Date.now()) {
    return { success: false, message: "This code has expired.", errorCode: "EXPIRED" };
  }

  // Idempotent: a device re-entering its code (e.g. after reinstall) gets the
  // same grant back instead of consuming another redemption slot.
  const existing = await prisma.promoRedemption.findUnique({
    where: { couponId_deviceId: { couponId: coupon.id, deviceId } },
  });
  if (existing) {
    if (existing.revoked) {
      return { success: false, message: "This grant has been revoked.", errorCode: "REVOKED" };
    }
    return grantResult(existing);
  }

  // Enforce the global use limit (<= 0 means unlimited).
  if (coupon.maxRedemptions > 0 && coupon.redeemedCount >= coupon.maxRedemptions) {
    return {
      success: false,
      message: "This code has already been fully redeemed.",
      errorCode: "ALREADY_REDEEMED",
    };
  }

  const grantExpiresAt =
    coupon.rewardType === "subscription" && coupon.durationDays
      ? new Date(Date.now() + coupon.durationDays * 86_400_000)
      : null;

  const newCount = coupon.redeemedCount + 1;
  const [redemption] = await prisma.$transaction([
    prisma.promoRedemption.create({
      data: {
        appId,
        couponId: coupon.id,
        code,
        deviceId,
        rewardType: coupon.rewardType,
        durationDays: coupon.durationDays,
        creditAmount: coupon.creditAmount,
        grantExpiresAt,
      },
    }),
    prisma.promoCoupon.update({
      where: { id: coupon.id },
      data: {
        redeemedCount: { increment: 1 },
        // Auto-disable once all slots are consumed so the admin panel
        // immediately reflects "redeemed" rather than still showing "active".
        ...(coupon.maxRedemptions > 0 && newCount >= coupon.maxRedemptions
          ? { active: false }
          : {}),
      },
    }),
  ]);

  return grantResult(redemption);
}

/** Return the best active (non-revoked, unexpired) grant for a device. */
export async function getDeviceGrant(
  appId: string,
  deviceId: string
): Promise<PromoResult> {
  if (!appId || !deviceId) {
    return { success: false, message: "Missing device id." };
  }
  const now = Date.now();
  const redemptions = await prisma.promoRedemption.findMany({
    where: { appId, deviceId, revoked: false },
    orderBy: { createdAt: "desc" },
  });

  // Pro grants only (credits are consumable and handled separately client-side).
  const active = redemptions.filter(
    (r) =>
      r.rewardType !== "credits" &&
      (r.grantExpiresAt === null || r.grantExpiresAt.getTime() > now)
  );
  // Prefer lifetime (no expiry), then the longest-lived subscription.
  active.sort((a, b) => {
    const ax = a.grantExpiresAt ? a.grantExpiresAt.getTime() : Infinity;
    const bx = b.grantExpiresAt ? b.grantExpiresAt.getTime() : Infinity;
    return bx - ax;
  });

  if (active.length === 0) {
    return { success: false, message: "No active grant for this device." };
  }
  return grantResult(active[0]);
}
