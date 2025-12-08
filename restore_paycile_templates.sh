#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Paycile Template Restoration Script for Render
# ═══════════════════════════════════════════════════════════════
# Run this in your Render shell to restore funnel + content templates
# 
# Usage:
#   1. Go to Render Dashboard → paycile-automation-server → Shell
#   2. Copy and paste this entire script
#   3. Press Enter
# ═══════════════════════════════════════════════════════════════

set -e  # Exit on error

echo "═══════════════════════════════════════════════════════════════"
echo "🔧 Paycile Template Restoration"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Navigate to server directory (Render deploys to /opt/render/project/src)
cd /opt/render/project/src/apps/server || {
    echo "❌ Error: Could not find apps/server directory"
    echo "Current directory: $(pwd)"
    echo "Available directories:"
    ls -la
    exit 1
}

echo "✓ Located server directory: $(pwd)"
echo ""

# Ensure Prisma client is generated
echo "📦 Generating Prisma client..."
npx prisma generate || {
    echo "❌ Prisma generate failed"
    exit 1
}
echo "✓ Prisma client ready"
echo ""

# Check if seed script exists
if [ ! -f "scripts/seed_paycile_templates.js" ]; then
    echo "❌ Error: seed_paycile_templates.js not found"
    echo "Available scripts:"
    ls -la scripts/ 2>/dev/null || echo "No scripts directory found"
    exit 1
fi

echo "✓ Found seed script"
echo ""

# Run the seed script
echo "🌱 Seeding Paycile templates..."
echo "   - Funnel templates (4 templates)"
echo "   - Content templates (12 templates)"
echo ""

node scripts/seed_paycile_templates.js || {
    echo "❌ Seeding failed"
    exit 1
}

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ Template restoration complete!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  1. Refresh your browser at your Paycile web URL"
echo "  2. Navigate to 'Funnel Templates' in the top menu"
echo "  3. You should see 4 funnel templates and 12 content templates"
echo ""
echo "Templates restored:"
echo "  📊 Funnel Templates:"
echo "     • CFO Outreach - Insurance Vertical"
echo "     • Controller Campaign - Multi-Entity"
echo "     • AR/AP - Unapplied Funds Recovery"
echo "     • Property Management - Yardi Integration"
echo ""
echo "  📧 Content Templates:"
echo "     • CFO Email/SMS/Voicemail (3)"
echo "     • Controller Email/SMS/Voicemail (3)"
echo "     • AR/AP Email/SMS/Voicemail (3)"
echo "     • Property Management Email/SMS/Voicemail (3)"
echo ""






