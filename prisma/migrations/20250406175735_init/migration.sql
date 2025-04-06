-- CreateTable
CREATE TABLE "DridexUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT to_char(now(), 'YYYYMMDDHH24MISS'),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceInfo" TEXT NOT NULL,

    CONSTRAINT "DridexUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DridexTransfer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT NOT NULL,

    CONSTRAINT "DridexTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DridexLicense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "license" TEXT NOT NULL,

    CONSTRAINT "DridexLicense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DridexTransaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentId" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,

    CONSTRAINT "DridexTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DridexUser_email_key" ON "DridexUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DridexTransaction_paymentId_key" ON "DridexTransaction"("paymentId");
