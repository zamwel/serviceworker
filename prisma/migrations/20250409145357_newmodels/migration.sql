/*
  Warnings:

  - You are about to drop the column `license` on the `DridexLicense` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `DridexTransfer` table. All the data in the column will be lost.
  - Added the required column `licensedata` to the `DridexLicense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferdata` to the `DridexTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DridexLicense" DROP COLUMN "license",
ADD COLUMN     "licensedata" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DridexTransfer" DROP COLUMN "data",
ADD COLUMN     "transferdata" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DridexUser" ADD COLUMN     "license" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "username" SET DEFAULT to_char(now(), 'YYYYMMDDHH24MISS');
