# Deployment Instructions - January 28, 2026

## Changes Made

### 1. Email Template Editing Fix
**Problem:** "Save failed" errors when editing email/voicemail templates  
**Solution:** Added proper PATCH endpoint for template updates instead of delete-and-recreate

**Files Changed:**
- `adtv-event-automation/apps/server/src/index.ts` - Added PATCH endpoint
- `adtv-event-automation/apps/web/src/lib/api.ts` - Added update method to API client
- `adtv-event-automation/apps/web/src/pages/TemplatesFunnel.tsx` - Updated to use update instead of delete+create

### 2. Unsubscribe Compliance System
**Problem:** No unsubscribe links in emails (CAN-SPAM compliance issue)  
**Solution:** Complete unsubscribe infrastructure with automatic footer injection

**Files Changed:**
- `adtv-event-automation/apps/server/prisma/schema.prisma` - Added unsubscribed fields to Contact model
- `adtv-event-automation/apps/server/prisma/migrations/20260128000000_add_unsubscribe/migration.sql` - Database migration
- `adtv-event-automation/apps/server/src/index.ts` - Added unsubscribe endpoint and helper function
- `adtv-event-automation/apps/server/src/services/emailQueue.ts` - Updated to add unsubscribe links and check status

### 3. Documentation Updates
- Updated `WEEKLY-CLIENT-UPDATES.md` with new features
- Created `CLIENT_RESPONSE_EMAIL.md` with client communication

---

## Deployment Steps

### Step 1: Run Database Migration & Regenerate Prisma Client
```bash
cd adtv-event-automation/apps/server

# Run the migration
npx prisma migrate deploy

# Regenerate Prisma client with new types
npx prisma generate
```

This adds the `unsubscribed` and `unsubscribedAt` fields to the Contact table and updates TypeScript types.

**Note:** The TypeScript linter errors you see are expected until Prisma regenerates. They will automatically resolve after running `npx prisma generate`.

### Step 2: Set Environment Variables in Render

Add these to your Render environment variables:

```bash
# Company physical address for email footer (CAN-SPAM compliance)
COMPANY_ADDRESS="123 Main Street, Suite 100, City, ST 12345"

# Base URL for unsubscribe links (should be your Render backend URL)
BASE_URL="https://adtv-events-server.onrender.com"
```

**Replace the COMPANY_ADDRESS with your actual business address!**

### Step 3: Deploy to Render

Push changes to GitHub:
```bash
git add .
git commit -m "Fix template editing and add unsubscribe compliance"
git push origin main
```

Render will automatically deploy the changes.

### Step 4: Verify Deployment

1. **Test Template Editing:**
   - Go to Templates/Funnel view
   - Edit an email template
   - Click Save
   - Should save without errors

2. **Test Unsubscribe Link:**
   - Send a test email to yourself
   - Check that footer includes company address and unsubscribe link
   - Click unsubscribe link
   - Should see confirmation page

3. **Verify Database Migration:**
   ```bash
   # In Render shell
   npx prisma studio
   # Check that Contact model has unsubscribed and unsubscribedAt fields
   ```

---

## What Each Change Does

### Template Update Fix
- **Before:** System deleted template and created new one (failed if template in use)
- **After:** System updates template in place (atomic operation, always works)

### Unsubscribe System
- **Automatic Footer:** Every email gets footer with address + unsubscribe link
- **Contact Tracking:** Database tracks which contacts have unsubscribed
- **Send Prevention:** System automatically skips sending to unsubscribed contacts
- **Landing Page:** Professional unsubscribe confirmation page

---

## Rollback Plan (if needed)

If issues occur:

1. **Revert code changes:**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Rollback database migration:**
   ```bash
   # In Render shell
   cd adtv-event-automation/apps/server
   npx prisma migrate resolve --rolled-back 20260128000000_add_unsubscribe
   ```

---

## Testing Checklist

- [ ] Database migration completed successfully
- [ ] Environment variables set in Render
- [ ] Template editing saves without errors
- [ ] Test email includes unsubscribe footer
- [ ] Unsubscribe link works and shows confirmation
- [ ] Unsubscribed contacts don't receive emails
- [ ] Company address displays correctly in footer

---

## Support Notes

**For "templates showing code" question:**
The `{{contact.first_name}}` text is **merge tags** (not errors). These are placeholders that get replaced with real data when emails send. This is standard email marketing functionality.

**Common merge tags:**
- `{{contact.first_name}}` - Contact's first name
- `{{contact.last_name}}` - Contact's last name
- `{{contact.company}}` - Company name
- `{{contact.email}}` - Email address
- `{{campaign.owner_name}}` - Campaign owner name
- `{{campaign.owner_email}}` - Campaign owner email
