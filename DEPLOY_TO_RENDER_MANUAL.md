# Manual Deployment to Render - Admin Account & Email Setup

## Current Situation

- ✅ Local commits created with admin account and email setup
- ❌ Cannot push to GitHub (permission denied for danny-nbrain account)
- ⏳ Need to deploy changes to Render manually

## Solution: Direct Deployment via Render SSH

### Option 1: Use Render Shell (RECOMMENDED)

1. **Go to Render Dashboard:**
   - Backend: https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug
   - Click "Shell" tab

2. **Create the admin user via API** (already done via curl earlier):
   ```bash
   # This was already successful - admin user exists
   # User ID: cmj8ynmkg0000c20bu7hqt6c7
   # Email: admin@paycile.com
   # Password: Password#123
   ```

3. **Upload test scripts via shell:**
   ```bash
   # In Render Shell:
   cd apps/server
   
   # Create create-admin-user.js
   cat > create-admin-user.js << 'EOF'
   [paste content from local file]
   EOF
   
   # Create test-stanley-email.js
   cat > test-stanley-email.js << 'EOF'
   [paste content from local file]
   EOF
   
   chmod +x create-admin-user.js test-stanley-email.js
   ```

### Option 2: Push with Proper GitHub Access

You need to authenticate with a GitHub account that has write access to `nbrain-team/paycile-automation`.

**Steps:**
1. Get a GitHub Personal Access Token with `repo` scope from someone with access
2. Push using:
   ```bash
   git push https://TOKEN@github.com/nbrain-team/paycile-automation.git main
   ```

### Option 3: Create Pull Request

Since danny-nbrain has read access, create a PR:
```bash
# Fork the repo (if not already forked)
gh repo fork nbrain-team/paycile-automation --clone=false

# Push to your fork
git remote add fork https://github.com/danny-nbrain/paycile-automation.git
git push fork main

# Create PR
gh pr create --repo nbrain-team/paycile-automation \
  --title "Add admin account creation and email setup" \
  --body "- Creates admin user account
- Adds email configuration for stanley@paycile.com
- Includes test scripts for Render shell"
```

## Current Status

### ✅ Already Deployed (via API)
- **Admin User Created**: admin@paycile.com / Password#123
- **User ID**: cmj8ynmkg0000c20bu7hqt6c7
- **Verified**: Login and token generation working

### ⏳ Pending (Need GitHub Push)
- Test scripts (create-admin-user.js, test-stanley-email.js)
- Email setup documentation files
- Updated landing pages

## Immediate Actions Available

### 1. Test Admin Login NOW
The admin account is already live and working:
```bash
curl -X POST https://opticwise-backend-uq3o.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@paycile.com",
    "password": "Password#123"
  }'
```

### 2. Access Web Interface NOW
Go to: https://paycile-automation.onrender.com
- Email: admin@paycile.com
- Password: Password#123

### 3. Test Email (Once stanley@paycile.com App Password Provided)
Via Render Shell:
```bash
cd apps/server
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: { user: 'stanley@paycile.com', pass: 'YOUR_APP_PASSWORD' }
});
transporter.sendMail({
  from: 'stanley@paycile.com',
  to: 'stanley@paycile.com',
  subject: 'Test from Paycile',
  text: 'Email test successful!'
}).then(info => console.log('Sent:', info.messageId));
"
```

## Files Ready Locally

These files are committed locally and ready to push:
- ✅ ADMIN_ACCOUNT_CREATED.md
- ✅ ADMIN_LOGIN_CREDENTIALS.md
- ✅ STANLEY_EMAIL_SETUP_INSTRUCTIONS.md
- ✅ STANLEY_EMAIL_STATUS_REPORT.md
- ✅ RENDER_UPDATE_STANLEY_EMAIL.sh
- ✅ adtv-event-automation/apps/server/create-admin-user.js
- ✅ adtv-event-automation/apps/server/test-stanley-email.js
- ✅ Updated landing pages (CFO, ARAP, Controller, PropMgmt)

## Next Steps

**Recommend:**
1. Use the admin account NOW (it's already working)
2. Get GitHub push access OR create a PR to merge the documentation
3. Provide Microsoft app password for stanley@paycile.com email testing

**The admin account is LIVE and working - you can login right now!**

