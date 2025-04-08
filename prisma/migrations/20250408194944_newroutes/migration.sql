-- AlterTable
ALTER TABLE "DridexUser" ALTER COLUMN "username" SET DEFAULT to_char(now(), 'YYYYMMDDHH24MISS');
