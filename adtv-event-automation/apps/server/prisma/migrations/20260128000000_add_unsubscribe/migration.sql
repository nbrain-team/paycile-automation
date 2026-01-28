-- Add unsubscribed field to Contact table
ALTER TABLE "Contact" ADD COLUMN "unsubscribed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Contact" ADD COLUMN "unsubscribedAt" TIMESTAMP(3);
