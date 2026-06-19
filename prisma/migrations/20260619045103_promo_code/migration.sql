-- AlterTable
ALTER TABLE "DridexUser" ALTER COLUMN "username" SET DEFAULT to_char(now(), 'YYYYMMDDHH24MISS');

-- CreateTable
CREATE TABLE "FlashCryptoReward" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL DEFAULT '',
    "referer" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlashCryptoReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCoupon" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL DEFAULT 'lifetime',
    "durationDays" INTEGER,
    "creditAmount" INTEGER,
    "maxRedemptions" INTEGER NOT NULL DEFAULT 1,
    "redeemedCount" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "note" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCoupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoRedemption" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "rewardType" TEXT NOT NULL,
    "durationDays" INTEGER,
    "creditAmount" INTEGER,
    "grantExpiresAt" TIMESTAMP(3),
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PromoCoupon_appId_idx" ON "PromoCoupon"("appId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCoupon_appId_code_key" ON "PromoCoupon"("appId", "code");

-- CreateIndex
CREATE INDEX "PromoRedemption_appId_deviceId_idx" ON "PromoRedemption"("appId", "deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoRedemption_couponId_deviceId_key" ON "PromoRedemption"("couponId", "deviceId");

-- AddForeignKey
ALTER TABLE "PromoRedemption" ADD CONSTRAINT "PromoRedemption_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "PromoCoupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
