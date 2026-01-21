# Fix CFO Insurance - Non SMS Funnel Connections

## Problem
The "CFO Insurance - Non SMS" funnel template (ID: `cmk4g9s1b0000cq0xsa507s23`) is not displaying content for email and voicemail nodes in the table view. The issue is that the original seed script stored nodes in a `nodesJson` field instead of creating proper `Node` records in the database.

## Solution
Run the fixed re-seed script that will:
1. Verify all content templates exist
2. Delete the existing template (if any)
3. Recreate the template with proper `Node` and `Edge` records
4. Verify all content node connections

## Steps to Fix

### Option 1: Run on Render Shell (Recommended)

1. Go to Render Dashboard: https://dashboard.render.com/
2. Navigate to your `paycile-automation-backend` service
3. Click "Shell" tab
4. Run the following command:

```bash
node scripts/reseed_cfo_no_sms_fixed.js
```

### Option 2: Deploy and Run Automatically

The fixed script is already in the repository. You can:

1. Commit the new script:
```bash
git add adtv-event-automation/apps/server/scripts/reseed_cfo_no_sms_fixed.js
git commit -m "Fix CFO No SMS funnel - proper Node/Edge structure"
git push
```

2. After deployment, run via Render Shell:
```bash
node scripts/reseed_cfo_no_sms_fixed.js
```

## What the Script Does

1. **Creates Content Templates** (8 templates):
   - 5 Email templates (intro, value prop, case study, demo follow-up, objection handler)
   - 3 Voicemail templates (intro, value prop, case study)

2. **Deletes Old Template**: Removes the incorrectly structured template

3. **Creates New Template**: 
   - Creates Template record
   - Creates 87 Node records (properly linked with `template_id` in config)
   - Creates 94 Edge records

4. **Verifies Connections**: Checks that all email/voicemail nodes are properly linked to content templates

## Expected Output

```
🚀 Re-seeding CFO Funnel (No SMS) with FIXED structure...

📧 Creating content templates (Email + Voicemail only)...
✅ Created 8 content templates

🗑️  Deleting existing template (if exists)...
   Found existing template with X nodes, Y edges
   ✅ Deleted

🎯 Creating CFO-Funnel-No-SMS with proper structure...
   Creating nodes...
   Creating edges...
✅ Created funnel: CFO Insurance - Non SMS
   - 87 nodes
   - 94 edges

🔍 Verifying content node connections...

   ✅ N005: cfo_ins_email_01_intro → "CFO Insurance - Initial Outreach"
   ✅ N028: cfo_ins_email_02_value → "CFO Insurance - Value Proposition"
   ✅ N036: cfo_ins_vm_01_intro → "CFO Insurance - VM Intro"
   ✅ N039: cfo_ins_email_03_case_study → "CFO Insurance - Case Study"
   ✅ N048: cfo_ins_email_04_demo_follow → "CFO Insurance - Demo Follow-up"
   ✅ N055: cfo_ins_vm_02_value → "CFO Insurance - VM Value Prop"
   ✅ N057: cfo_ins_email_05_objection → "CFO Insurance - Addressing Concerns"

🎉 CFO-Funnel-No-SMS re-seeding complete!

📊 Summary:
   - Funnel ID: cmk4g9s1b0000cq0xsa507s23
   - Funnel Name: CFO Insurance - Non SMS
   - Total Nodes: 87
   - Email Nodes: 7
   - Voicemail Nodes: 3
   - Content Templates: 8

✅ Template is now properly connected and ready to use!
   View at: https://paycile-automation.onrender.com/templates/cmk4g9s1b0000cq0xsa507s23
```

## Verification

After running the script, visit:
https://paycile-automation.onrender.com/templates/cmk4g9s1b0000cq0xsa507s23

The table view should now show:
- Email subject and body content for all email nodes
- Voicemail scripts for all voicemail nodes
- Proper content template connections

## Technical Details

### Root Cause
The original seed script (`seed_cfo_funnel_no_sms.js`) was using:
```javascript
await prisma.template.create({
  data: {
    nodesJson: JSON.stringify(funnel.nodes),  // ❌ Wrong - these fields don't exist
    edgesJson: JSON.stringify(funnel.edges),  // ❌ Wrong
  },
});
```

### Fix
The new script properly creates records:
```javascript
// Create template
await prisma.template.create({ data: { id, name, status, version } });

// Create nodes with proper relations
for (const node of funnel.nodes) {
  await prisma.node.create({
    data: {
      templateId: funnel.id,  // ✅ Proper foreign key
      key: node.key,
      type: node.type,
      name: node.name,
      configJson: JSON.stringify(node.config),  // ✅ Contains template_id
      posX: node.posX,
      posY: node.posY,
    },
  });
}
```

## Files Modified
- ✅ `adtv-event-automation/apps/server/scripts/reseed_cfo_no_sms_fixed.js` (NEW)
- ✅ `adtv-event-automation/apps/server/scripts/diagnose_template_render.js` (NEW - diagnostic tool)
- ✅ `adtv-event-automation/apps/server/scripts/fix_cfo_no_sms_connections.js` (NEW - diagnostic tool)

## Diagnostic Scripts

If you need to diagnose issues before or after the fix:

```bash
# Check current state of template
node scripts/diagnose_template_render.js

# Check and attempt to migrate old JSON format
node scripts/fix_cfo_no_sms_connections.js
```
