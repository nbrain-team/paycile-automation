#!/bin/bash
#
# Script to push local changes to GitHub and trigger Render deployment
#
# This script will:
# 1. Push all committed changes to GitHub
# 2. Verify the push was successful
# 3. Monitor Render deployments
#

cd "/Users/dannydemichele/Paycile Automation"

echo "================================================"
echo "Pushing Changes to GitHub"
echo "================================================"
echo ""

# Show current status
echo "Current local commits:"
git log --oneline -3
echo ""

# Show what needs to be pushed
echo "Commits to push:"
git log origin/main..HEAD --oneline 2>/dev/null || git log github/main..HEAD --oneline 2>/dev/null || git log --oneline -3
echo ""

# Try to push with gh CLI authentication
echo "Attempting to push to GitHub..."
echo ""

# Method 1: Try gh CLI
if command -v gh &> /dev/null; then
    echo "Using GitHub CLI authentication..."
    GIT_ASKPASS=/opt/homebrew/bin/gh git push https://github.com/nbrain-team/paycile-automation.git main
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
        exit 0
    fi
fi

# Method 2: Interactive push (will prompt for credentials if needed)
echo "Attempting interactive push..."
git push github main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "✅ SUCCESS - Changes Pushed to GitHub!"
    echo "================================================"
    echo ""
    echo "Render will automatically deploy in 2-3 minutes"
    echo ""
    echo "Monitor deployments:"
    echo "  Backend:  https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug"
    echo "  Frontend: https://dashboard.render.com/static/srv-d4ecouur433s738kuiqg"
    echo ""
else
    echo ""
    echo "================================================"
    echo "❌ Push Failed"
    echo "================================================"
    echo ""
    echo "Please try one of these methods:"
    echo ""
    echo "1. Push via GitHub CLI (if you have access):"
    echo "   gh auth login"
    echo "   git push github main"
    echo ""
    echo "2. Push via SSH (if you have SSH key set up):"
    echo "   git remote set-url github git@github.com:nbrain-team/paycile-automation.git"
    echo "   git push github main"
    echo ""
    echo "3. Push via HTTPS with token:"
    echo "   git push https://YOUR_GITHUB_TOKEN@github.com/nbrain-team/paycile-automation.git main"
    echo ""
    exit 1
fi

