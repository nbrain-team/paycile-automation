-- AlterTable
ALTER TABLE "Contact" ADD COLUMN "automationCheckedOut" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "automationPausedNodeKey" TEXT,
ADD COLUMN "automationCheckedOutAt" TIMESTAMP(3);

