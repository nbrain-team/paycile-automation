#!/bin/bash
#
# Push authentication changes to GitHub to trigger Render deployment
#
# Run this with a GitHub account that has write access to:
# https://github.com/nbrain-team/paycile-automation
#

cd "/Users/dannydemichele/Paycile Automation"

echo "================================================"
echo "Push to GitHub - Paycile Authentication Update"
echo "================================================"
echo ""
echo "This will push 3 commits to GitHub:"
echo "  1. Admin account creation + email setup"
echo "  2. Landing page updates"
echo "  3. Login page + authentication protection (NEW!)"
echo ""
echo "After push, Render will auto-deploy in ~5 minutes"
echo ""

# Show what we're pushing
echo "Commits to push:"
git log --oneline origin/main..HEAD 2>/dev/null || git log --oneline -3
echo ""

# Confirm
read -p "Push to GitHub? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 1
fi

echo ""
echo "Attempting push..."
echo ""

# Try to push
git push https://github.com/nbrain-team/paycile-automation.git main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "✅ SUCCESS!"
    echo "================================================"
    echo ""
    echo "Changes pushed to GitHub!"
    echo ""
    echo "Render will now auto-deploy:"
    echo "  Backend:  https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug"
    echo "  Frontend: https://dashboard.render.com/static/srv-d4ecouur433s738kuiqg"
    echo ""
    echo "Wait ~5 minutes, then test:"
    echo "  https://paycile-automation.onrender.com"
    echo ""
    echo "Login with:"
    echo "  Email: admin@paycile.com"
    echo "  Password: Password#123"
    echo ""
else
    echo ""
    echo "================================================"
    echo "❌ PUSH FAILED"
    echo "================================================"
    echo ""
    echo "You need write access to push to GitHub."
    echo ""
    echo "Options:"
    echo ""
    echo "1. Login with GitHub account that has access:"
    echo "   gh auth login"
    echo "   Then run this script again"
    echo ""
    echo "2. Use a Personal Access Token:"
    echo "   git push https://YOUR_TOKEN@github.com/nbrain-team/paycile-automation.git main"
    echo ""
    echo "3. Ask repository admin to:"
    echo "   - Add your GitHub account as collaborator"
    echo "   - Or pull and push these changes manually"
    echo ""
    exit 1
fi

