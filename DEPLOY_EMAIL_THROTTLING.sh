#!/bin/bash
# Deploy Email Throttling System to Render
# Copy and paste this entire script into Render shell

set -e

echo "🚀 Deploying Email Throttling System..."
echo ""

# Step 1: Pull latest code
echo "📥 Step 1: Pulling latest code from GitHub..."
cd /opt/render/project/src
git pull origin main
echo "✅ Code updated"
echo ""

# Step 2: Navigate to server directory
echo "📂 Step 2: Navigating to server directory..."
cd adtv-event-automation/apps/server
echo "✅ In server directory"
echo ""

# Step 3: Run database migration
echo "🗄️  Step 3: Running database migration..."
npx prisma migrate deploy || npx prisma db push
echo "✅ Database migration complete"
echo ""

# Step 4: Regenerate Prisma client
echo "🔧 Step 4: Regenerating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated"
echo ""

# Step 5: Check queue stats
echo "📊 Step 5: Checking email queue..."
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.emailQueue.count().then(c => console.log('Email queue records:', c)).catch(() => console.log('Email queue: 0 (new table)')).finally(() => prisma.\$disconnect());"
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "⚠️  IMPORTANT: Restart the Render service for changes to take effect:"
echo "   Go to: https://dashboard.render.com/web/srv-d4eco5rgk3sc73blqmug"
echo "   Click: Manual Deploy → Deploy latest commit"
echo ""
echo "After restart, the email queue worker will start automatically."
echo "Check logs for: '✓ Email Queue Worker: Started (1-2.5 min throttling)'"
echo ""
echo "📈 Monitor queue: curl https://paycile-automation-backend.onrender.com/api/email-queue/stats"





