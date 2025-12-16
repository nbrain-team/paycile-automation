#!/bin/bash
#
# Script to update Render environment variables for stanley@paycile.com
# This will be executed once the Microsoft App Password is provided
#
# Usage: Replace YOUR_APP_PASSWORD_HERE with the actual app password
#

SERVICE_ID="srv-d4eco5rgk3sc73blqmug"
APP_PASSWORD="YOUR_APP_PASSWORD_HERE"

echo "================================================"
echo "Updating Paycile Backend Email Configuration"
echo "================================================"
echo ""
echo "Service: Paycile-Automation-Backend"
echo "Service ID: $SERVICE_ID"
echo "New Email: stanley@paycile.com"
echo ""

if [ "$APP_PASSWORD" = "YOUR_APP_PASSWORD_HERE" ]; then
  echo "❌ ERROR: Please replace YOUR_APP_PASSWORD_HERE with the actual Microsoft App Password"
  echo ""
  echo "To get your app password:"
  echo "1. Go to: https://mysignins.microsoft.com/security-info"
  echo "2. Sign in as: stanley@paycile.com"
  echo "3. Click: + Add sign-in method"
  echo "4. Select: App password"
  echo "5. Name it: Paycile Platform SMTP"
  echo "6. Copy the generated password and paste it in this script"
  exit 1
fi

echo "Setting environment variables..."
echo ""

# Note: These would be executed via Render Dashboard or API
# The actual Render CLI commands would be:

cat << EOF

To update via Render Dashboard:
1. Go to: https://dashboard.render.com/web/$SERVICE_ID
2. Click "Environment" in the left menu
3. Update or add these variables:

   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=stanley@paycile.com
   SMTP_PASS=$APP_PASSWORD

4. Click "Save Changes"
5. Service will automatically redeploy (takes ~2 minutes)

EOF

echo ""
echo "================================================"
echo "After updating, run the test:"
echo "================================================"
echo ""
echo "1. Go to Render Dashboard > Shell"
echo "2. Run: cd apps/server && node test-stanley-email.js stanley@paycile.com"
echo "3. Check stanley@paycile.com inbox for test email"
echo ""
echo "Or I can do this for you via the MCP Render tools!"
echo ""


