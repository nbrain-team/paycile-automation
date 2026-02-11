-- AlterTable: Add Microsoft OAuth fields
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "microsoftEmail" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "microsoftAccessToken" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "microsoftRefreshToken" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "microsoftTokenExpiry" TIMESTAMP(3);

-- AlterTable: Add LinkedIn OAuth fields
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "linkedinProfileUrl" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "linkedinAccessToken" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "linkedinRefreshToken" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "linkedinTokenExpiry" TIMESTAMP(3);
