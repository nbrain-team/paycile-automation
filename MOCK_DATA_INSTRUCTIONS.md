# CFO Insurance Campaign Mock Data Population

## Overview
This guide explains how to populate mock data for the CFO Insurance campaign (`live_qe1v81z2ye`) using the email addresses from `sent-emails.csv`.

## Files Created
1. **populate_cfo_insurance_mock_data.js** - Node.js script that uses Prisma to insert mock data
2. **populate_mock_data_simple.js** - SQL generator script
3. **populate_cfo_mock_data.sql** - Generated SQL file with all INSERT statements
4. **Admin API endpoint** - `/api/admin/populate-cfo-mock-data` (added to index.ts)

## Option 1: Use the Admin API Endpoint (Recommended - Once Deployed)

Once the code is deployed to Render, you can trigger the mock data population via HTTP:

```bash
curl -X POST https://opticwise-backend-uq3o.onrender.com/api/admin/populate-cfo-mock-data
```

This will:
- Create 296 contacts from the sent-emails.csv file
- Generate realistic status distribution (Email Sent, Email Opened, Link Clicked, Needs BDR, Received RSVP, No Activity)
- Create email conversations for each contact
- Add outbound email messages with CFO Insurance campaign content
- Add inbound responses for contacts with "Needs BDR" or "Received RSVP" status
- Update campaign totals

## Option 2: Run via Render Shell

1. Go to Render Dashboard: https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug
2. Click on "Shell" tab
3. Run the following commands:

```bash
cd /opt/render/project/src/adtv-event-automation/apps/server
node scripts/populate_cfo_insurance_mock_data.js
```

## Option 3: Execute SQL Directly

If you have access to the Render database console:

1. Go to the database dashboard
2. Open the SQL console
3. Copy and paste the contents of `populate_cfo_mock_data.sql`
4. Execute the SQL

## What Gets Created

### Contacts (296 total)
- **Name**: From sent-emails.csv (First Name + Last Name)
- **Email**: From sent-emails.csv
- **Phone**: From sent-emails.csv (if available)
- **Company**: Generated as "{LastName} Enterprises"
- **City/State**: Rotated through: New York, San Francisco, Chicago, Boston, Austin
- **Status Distribution**:
  - Email Sent: ~50%
  - Email Opened: ~25%
  - Link Clicked: ~10%
  - Needs BDR: ~8%
  - Received RSVP: ~5%
  - No Activity: ~2%

### Email Messages
- **Outbound emails**: One per contact with CFO Insurance campaign content
- **Inbound responses**: For contacts with "Needs BDR" or "Received RSVP" status
- **Timestamps**: Spread over the past 7 days for realistic demo data

### Campaign Updates
- Total Contacts: 296
- Enriched Contacts: 296
- Emails Generated: 296
- Status: Active

## Verification

After running the script, verify the data by:

1. Opening the campaign: https://paycile-automation.onrender.com/campaigns/live_qe1v81z2ye
2. Check the Overview tab - should show 296 contacts
3. Check the Analytics tab - should show email metrics and status distribution
4. Check individual contacts - should have email conversations

## Troubleshooting

### Script fails with "Campaign not found"
- Verify the campaign ID exists in the database
- Update the `CAMPAIGN_ID` constant in the script if needed

### Database connection errors
- Ensure the DATABASE_URL environment variable is set correctly
- Verify the database is accessible from the execution environment

### Duplicate data errors
- The script uses `ON CONFLICT DO NOTHING` to prevent duplicates
- Safe to run multiple times

## Cleanup

To remove the mock data:

```sql
DELETE FROM "Message" WHERE "conversationId" IN (
  SELECT "id" FROM "Conversation" WHERE "contactId" IN (
    SELECT "id" FROM "Contact" WHERE "campaignId" = 'live_qe1v81z2ye'
  )
);

DELETE FROM "Conversation" WHERE "contactId" IN (
  SELECT "id" FROM "Contact" WHERE "campaignId" = 'live_qe1v81z2ye'
);

DELETE FROM "Contact" WHERE "campaignId" = 'live_qe1v81z2ye';

UPDATE "Campaign" SET "totalContacts" = 0, "enrichedContacts" = 0, "emailsGenerated" = 0 
WHERE "id" = 'live_qe1v81z2ye';
```

## Next Steps

1. Commit and push the code to GitHub (if you have access)
2. Wait for Render auto-deployment to complete
3. Call the admin API endpoint to populate the data
4. Refresh the campaign page to see the mock data

## Contact

For issues or questions, contact the development team.




