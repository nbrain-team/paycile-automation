# 🚀 Quick Fix Guide - CFO Insurance Funnel

## Problem
Email and voicemail content not showing in the funnel table view.

## Solution
Run one command on Render to fix it.

---

## Steps (5 minutes)

### 1. Open Render Shell
1. Go to: https://dashboard.render.com/
2. Click on: **paycile-automation-backend** service
3. Click the **"Shell"** tab at the top

### 2. Run Fix Command
Copy and paste this command into the shell:

```bash
node scripts/reseed_cfo_no_sms_fixed.js
```

Press Enter.

### 3. Wait for Success Message
You should see:
```
🎉 CFO-Funnel-No-SMS re-seeding complete!

✅ Template is now properly connected and ready to use!
   View at: https://paycile-automation.onrender.com/templates/cmk4g9s1b0000cq0xsa507s23
```

### 4. Verify Fix
Open this link in your browser:
https://paycile-automation.onrender.com/templates/cmk4g9s1b0000cq0xsa507s23

Click the "Table View" tab.

You should now see:
- ✅ Email subjects in the table
- ✅ Email body content
- ✅ Voicemail scripts

---

## What This Does

The script:
1. Creates 8 content templates (5 emails, 3 voicemails)
2. Deletes the broken funnel structure
3. Recreates the funnel with 87 nodes properly linked
4. Connects all content to the correct templates

**Total time**: ~10 seconds to run

---

## If Something Goes Wrong

### Diagnostic Command
If you want to check the current state first:
```bash
node scripts/diagnose_template_render.js
```

### Get Help
- Full instructions: See `FIX_CFO_NO_SMS_INSTRUCTIONS.md`
- Technical details: See `CFO_FUNNEL_FIX_SUMMARY.md`

---

## Files Included in This Fix

All scripts are already in the repository:
- ✅ `scripts/reseed_cfo_no_sms_fixed.js` - Main fix script
- ✅ `scripts/diagnose_template_render.js` - Diagnostic tool
- ✅ `scripts/fix_cfo_no_sms_connections.js` - Alternative fix method

**No code changes needed** - just run the script!
