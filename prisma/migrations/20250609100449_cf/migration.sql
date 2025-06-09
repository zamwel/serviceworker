-- AlterTable
ALTER TABLE "DridexUser" ALTER COLUMN "username" SET DEFAULT to_char(now(), 'YYYYMMDDHH24MISS');

-- CreateTable
CREATE TABLE "FlashCryptoData" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "FlashCryptoData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FlashCryptoData_uuid_key" ON "FlashCryptoData"("uuid");
