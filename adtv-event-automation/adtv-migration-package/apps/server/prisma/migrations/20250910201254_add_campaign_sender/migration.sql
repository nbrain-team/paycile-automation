-- Add senderUserId column to Campaign table
ALTER TABLE "Campaign" ADD COLUMN "senderUserId" TEXT;

-- Update eventDate and launchDate to use TIMESTAMP if they're not already
-- (This handles the DATETIME -> TIMESTAMP conversion)
DO $$ 
BEGIN 
    -- Add foreign key constraint
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'Campaign_senderUserId_fkey') THEN
        ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
EXCEPTION 
    WHEN others THEN NULL;
END $$;
