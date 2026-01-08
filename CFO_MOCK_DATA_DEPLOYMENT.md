# CFO Insurance Campaign Mock Data - Render Deployment Guide

## 🎯 Objective
Populate mock data for campaign `live_qe1v81z2ye` (CFO Insurance) using the 296 email addresses from `sent-emails.csv` to show realistic campaign metrics in the dashboard.

## ✅ What's Been Completed

### 1. Files Created
- ✅ **populate_cfo_insurance_mock_data.js** - Main Node.js script using Prisma
- ✅ **populate_mock_data_simple.js** - SQL generator (backup method)
- ✅ **populate_cfo_mock_data.sql** - Generated SQL file (7,161 lines)
- ✅ **run_mock_data_population.sh** - Bash script to call API endpoint
- ✅ **Admin API endpoint** - Added to `src/index.ts` at `/api/admin/populate-cfo-mock-data`

### 2. Code Changes
- ✅ Added admin endpoint in `adtv-event-automation/apps/server/src/index.ts`
- ✅ Committed to Azure DevOps (main branch)
- ✅ Ready to push to GitHub for Render deployment

### 3. Mock Data Specifications
- **Total Contacts**: 296 (from sent-emails.csv)
- **Status Distribution**:
  - Email Sent: ~50% (148 contacts)
  - Email Opened: ~25% (74 contacts)
  - Link Clicked: ~10% (30 contacts)
  - Needs BDR: ~8% (24 contacts)
  - Received RSVP: ~5% (15 contacts)
  - No Activity: ~2% (5 contacts)
- **Timestamps**: Spread over past 7 days
- **Conversations**: Email conversations for each contact
- **Messages**: Outbound emails + inbound responses for engaged contacts

## 🚀 Deployment Steps

### Step 1: Push to GitHub (Trigger Render Auto-Deploy)

The code is committed to Azure DevOps but needs to be pushed to GitHub to trigger Render's auto-deployment.

**Option A: Manual GitHub Push (if you have access)**
```bash
cd "/Users/dannydemichele/Paycile Automation"

# Check current remotes
git remote -v

# If github remote exists but needs authentication, update it with a token
git remote set-url github https://YOUR_GITHUB_TOKEN@github.com/nbrain-team/paycile-automation.git

# Push to GitHub
git push github main
```

**Option B: Push via Render Dashboard**
1. Go to: https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug
2. Click "Manual Deploy" → "Deploy latest commit"
3. Wait for deployment to complete (~3-5 minutes)

**Option C: Merge Azure DevOps to GitHub**
If you have a sync setup between Azure DevOps and GitHub, trigger that sync.

### Step 2: Wait for Deployment

Monitor deployment at: https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug

The deployment will:
1. Pull latest code from GitHub
2. Run `pnpm install`
3. Run `pnpm build` (includes Prisma generate)
4. Start the server with the new admin endpoint

### Step 3: Run Mock Data Population

Once deployment is complete, run the script:

```bash
cd "/Users/dannydemichele/Paycile Automation"
./run_mock_data_population.sh
```

Or manually:
```bash
curl -X POST https://opticwise-backend-uq3o.onrender.com/api/admin/populate-cfo-mock-data
```

### Step 4: Verify Results

1. **Check API Response**: Should return success message with output
2. **View Campaign**: https://paycile-automation.onrender.com/campaigns/live_qe1v81z2ye
3. **Verify Tabs**:
   - Overview: Should show 296 total contacts
   - Analytics: Should show email metrics and status distribution
   - Contacts: Should list all 296 contacts with various statuses

## 📊 Expected Results

### Campaign Overview Tab
- Total Contacts: 296
- Enriched Contacts: 296
- Emails Generated: 296
- Status: Active
- Recent activity showing email sends and responses

### Analytics Tab
- Email delivery metrics
- Open rates (~25%)
- Click rates (~10%)
- Response rates (~8%)
- Time-series graph showing activity over past 7 days

### Contacts Tab
- 296 contacts with names from sent-emails.csv
- Various statuses (Email Sent, Opened, Clicked, etc.)
- Email conversations visible when clicking on contacts
- Some contacts with inbound responses

## 🔧 Alternative Methods (If API Fails)

### Method 1: Run Script via Render Shell
1. Go to: https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug
2. Click "Shell" tab
3. Run:
```bash
cd /opt/render/project/src/adtv-event-automation/apps/server
node scripts/populate_cfo_insurance_mock_data.js
```

### Method 2: Execute SQL Directly
If you have database console access:
1. Go to: https://dashboard.render.com/d/dpg-d30s9oodl3ps73ebuhpg-a
2. Open SQL console
3. Copy contents of `populate_cfo_mock_data.sql`
4. Execute

## 🗑️ Cleanup (If Needed)

To remove all mock data:
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

UPDATE "Campaign" 
SET "totalContacts" = 0, "enrichedContacts" = 0, "emailsGenerated" = 0 
WHERE "id" = 'live_qe1v81z2ye';
```

## 📝 Technical Details

### Render Services
- **Backend Service**: srv-d4eco5rgk3sc73blqmug
  - URL: https://opticwise-backend-uq3o.onrender.com
  - Repo: https://github.com/nbrain-team/paycile-automation
  - Branch: main
  - Auto-deploy: Enabled

- **Frontend Service**: srv-d4ecouur433s738kuiqg
  - URL: https://paycile-automation.onrender.com
  - Same repo, different build path

- **Database**: dpg-d30s9oodl3ps73ebuhpg-a
  - Name: adtv-events-db
  - Type: PostgreSQL 16
  - Plan: basic_256mb
  - Connection: Internal only (no external IP access)

### Environment Variables
All set in Render dashboard, including:
- DATABASE_URL
- SMTP credentials
- API keys
- Other service configurations

## 🎬 Quick Start (TL;DR)

1. Push code to GitHub (or trigger manual deploy on Render)
2. Wait for deployment to complete
3. Run: `./run_mock_data_population.sh`
4. Visit: https://paycile-automation.onrender.com/campaigns/live_qe1v81z2ye
5. Verify data is showing in all tabs

## ❓ Troubleshooting

### "Campaign not found" error
- Verify campaign ID `live_qe1v81z2ye` exists in database
- Check database connection in Render logs

### "Script not found" error
- Ensure deployment completed successfully
- Check that files were pushed to GitHub
- Verify build logs show successful compilation

### No data showing in dashboard
- Check API response for errors
- Verify database has records: Query `SELECT COUNT(*) FROM "Contact" WHERE "campaignId" = 'live_qe1v81z2ye'`
- Clear browser cache and refresh

### Deployment fails
- Check Render build logs
- Verify package.json scripts are correct
- Ensure Prisma schema is up to date

## 📞 Support

- Render Dashboard: https://dashboard.render.com
- Campaign URL: https://paycile-automation.onrender.com/campaigns/live_qe1v81z2ye
- Backend Health: https://opticwise-backend-uq3o.onrender.com/health

---

**Status**: ✅ Ready for deployment
**Last Updated**: January 6, 2026
**Campaign ID**: live_qe1v81z2ye
**Total Mock Contacts**: 296



