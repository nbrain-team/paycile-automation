-- Add tracking and metadata columns to EmailQueue that were added to schema
-- but missing from tracked migrations. Uses IF NOT EXISTS for idempotency.

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'EmailQueue' AND column_name = 'nodeKey'
  ) THEN
    ALTER TABLE "EmailQueue" ADD COLUMN "nodeKey" TEXT;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'EmailQueue' AND column_name = 'openedAt'
  ) THEN
    ALTER TABLE "EmailQueue" ADD COLUMN "openedAt" TIMESTAMP(3);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'EmailQueue' AND column_name = 'openCount'
  ) THEN
    ALTER TABLE "EmailQueue" ADD COLUMN "openCount" INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'EmailQueue' AND column_name = 'clickedAt'
  ) THEN
    ALTER TABLE "EmailQueue" ADD COLUMN "clickedAt" TIMESTAMP(3);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'EmailQueue' AND column_name = 'clickCount'
  ) THEN
    ALTER TABLE "EmailQueue" ADD COLUMN "clickCount" INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Add contactId index if missing
CREATE INDEX IF NOT EXISTS "EmailQueue_contactId_idx" ON "EmailQueue"("contactId");
