# Stanley@Paycile.com Email Setup - Action Required

## Current Status ❌

Your Render backend is currently configured with:
- **Current Email:** ivy@adtvmedia.com (Gmail)
- **Target Email:** stanley@paycile.com (Microsoft/Outlook)
- **Status:** NOT CONFIGURED - App Password Required

---

## What You Need To Do (2 Minutes)

### Option 1: Generate Microsoft App Password (RECOMMENDED)

1. **Go to:** https://mysignins.microsoft.com/security-info

2. **Sign in as:** stanley@paycile.com

3. **Click:** "+ Add sign-in method"

4. **Select:** "App password"

5. **Name it:** "Paycile Platform SMTP"

6. **Copy the generated password** (format: `xxxx-xxxx-xxxx-xxxx`)

7. **Send me the app password** so I can update Render

---

## Alternative: If App Password Option Not Available

If you don't see the "App password" option, Microsoft Security Defaults may be blocking it.

### Solution A: Disable Security Defaults (Admin Required)
1. Go to: https://admin.microsoft.com
2. Navigate to: Azure Active Directory > Properties
3. Click "Manage security defaults"
4. Set "Security defaults" to "Disabled"
5. Save changes
6. Return to Step 1 above to generate app password

### Solution B: Use OAuth (More Complex, More Secure)
- Requires Azure AD App Registration
- Full instructions in: `MICROSOFT_OAUTH_SETUP_INSTRUCTIONS.txt`
- Takes 10-15 minutes to set up

---

## What Happens After You Provide the App Password

Once you give me the app password, I will:

1. ✅ Update Render environment variables (30 seconds)
   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=stanley@paycile.com
   SMTP_PASS=[YOUR APP PASSWORD]
   ```

2. ✅ Deploy changes to Render (2 minutes)

3. ✅ Run automated test via Render shell (30 seconds)
   - Test SMTP connection
   - Send test email from stanley@paycile.com
   - Verify delivery

4. ✅ Confirm sending AND receiving works

---

## Test Commands Ready

I've created a test script at:
```
apps/server/test-stanley-email.js
```

This will be run via Render Shell to verify:
- ✅ SMTP connection to Microsoft servers
- ✅ Authentication with app password
- ✅ Email sending capability
- ✅ Email delivery

---

## Your Render Service Details

- **Service:** Paycile-Automation-Backend
- **Service ID:** srv-d4eco5rgk3sc73blqmug
- **URL:** https://opticwise-backend-uq3o.onrender.com
- **SSH:** srv-d4eco5rgk3sc73blqmug@ssh.oregon.render.com
- **Database:** paycile_automation_db

---

## Quick Summary

**What I need from you:**
1. Go to https://mysignins.microsoft.com/security-info
2. Generate an app password for "Paycile Platform SMTP"
3. Give me the 16-character app password (format: xxxx-xxxx-xxxx-xxxx)

**What I'll do:**
1. Update Render environment variables
2. Deploy to production
3. Test email sending via Render shell
4. Confirm stanley@paycile.com is working for both send and receive

---

## Questions?

- **Can't find app password option?** → Security Defaults is blocking it, see "Alternative" above
- **Need OAuth instead?** → See `MICROSOFT_OAUTH_SETUP_INSTRUCTIONS.txt`
- **Want to test locally first?** → I can help you test in local environment

---

**Ready to proceed when you provide the app password!**


