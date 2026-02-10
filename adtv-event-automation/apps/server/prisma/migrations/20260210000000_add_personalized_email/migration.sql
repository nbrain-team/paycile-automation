-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN "aiPersonalization" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PersonalizedEmail" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "nodeKey" TEXT NOT NULL,
    "originalSubject" TEXT NOT NULL,
    "originalBody" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "rationale" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "editedSubject" TEXT,
    "editedBody" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalizedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PersonalizedEmail_campaignId_idx" ON "PersonalizedEmail"("campaignId");

-- CreateIndex
CREATE INDEX "PersonalizedEmail_contactId_idx" ON "PersonalizedEmail"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalizedEmail_campaignId_contactId_nodeKey_key" ON "PersonalizedEmail"("campaignId", "contactId", "nodeKey");

-- AddForeignKey
ALTER TABLE "PersonalizedEmail" ADD CONSTRAINT "PersonalizedEmail_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalizedEmail" ADD CONSTRAINT "PersonalizedEmail_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
