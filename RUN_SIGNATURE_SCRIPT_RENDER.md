# Run Signature Removal Script on Render

## Current Directory Structure

Based on the error, you're currently in: `/opt/render/project/src`

The script is located at: `adtv-event-automation/apps/server/scripts/remove_signatures.js`

## Correct Commands for Render

### Option 1: Navigate from current directory

```bash
# You're in: /opt/render/project/src
cd adtv-event-automation/apps/server
node scripts/remove_signatures.js
```

### Option 2: Run from current directory with full path

```bash
# From: /opt/render/project/src
node adtv-event-automation/apps/server/scripts/remove_signatures.js
```

### Option 3: Find the script first

```bash
# Find where the script is
find . -name "remove_signatures.js"

# Then run it with the path shown
node <path-from-find-command>
```

## If Script Still Not Found

The script might not have been deployed yet. Check if it exists:

```bash
# Check if file exists
ls -la adtv-event-automation/apps/server/scripts/remove_signatures.js

# If not found, list what's in scripts directory
ls -la adtv-event-automation/apps/server/scripts/
```

## Alternative: Run Inline Script

If the script file isn't deployed, you can run this inline version:

```bash
node << 'EOF'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signaturePatterns = [
  { pattern: /\n\nBest regards,\s*\n\s*Jim Fitzgerald\s*\n\s*CFO Solutions - Paycile\s*\n\s*jim@paycile\.com/gi, replacement: '\n\n{{sender.signature}}' },
  { pattern: /\n\nBest regards,\s*\n\s*Jim Fitzgerald/gi, replacement: '\n\n{{sender.signature}}' },
  { pattern: /\n\nSincerely,\s*\n\s*Jim Fitzgerald/gi, replacement: '\n\n{{sender.signature}}' },
  { pattern: /\n\nThanks,\s*\n\s*Jim Fitzgerald/gi, replacement: '\n\n{{sender.signature}}' },
  { pattern: /Jim Fitzgerald with Paycile/gi, replacement: '{{sender.name}} with Paycile' },
  { pattern: /Jim Fitzgerald from Paycile/gi, replacement: '{{sender.name}} from Paycile' },
  { pattern: /this is Jim Fitzgerald/gi, replacement: 'this is {{sender.name}}' },
  { pattern: /call me at 555-0123/gi, replacement: 'call me at {{sender.phone}}' },
  { pattern: /call me back at 555-0123/gi, replacement: 'call me back at {{sender.phone}}' }
];

async function removeSignatures() {
  console.log('🔍 Scanning content templates...\n');
  const templates = await prisma.contentTemplate.findMany();
  console.log(`Found ${templates.length} templates\n`);
  
  let updatedCount = 0;
  
  for (const template of templates) {
    let updated = false;
    let newSubject = template.subject;
    let newBody = template.body;
    let newText = template.text;
    let newTtsScript = template.ttsScript;
    
    if (template.body) {
      for (const { pattern, replacement } of signaturePatterns) {
        const before = newBody;
        newBody = newBody.replace(pattern, replacement);
        if (newBody !== before) updated = true;
      }
    }
    
    if (template.text) {
      for (const { pattern, replacement } of signaturePatterns) {
        const before = newText;
        newText = newText.replace(pattern, replacement);
        if (newText !== before) updated = true;
      }
    }
    
    if (template.ttsScript) {
      for (const { pattern, replacement } of signaturePatterns) {
        const before = newTtsScript;
        newTtsScript = newTtsScript.replace(pattern, replacement);
        if (newTtsScript !== before) updated = true;
      }
    }
    
    if (updated) {
      console.log(`✏️  Updating: ${template.type} - ${template.name}`);
      await prisma.contentTemplate.update({
        where: { id: template.id },
        data: { subject: newSubject, body: newBody, text: newText, ttsScript: newTtsScript }
      });
      updatedCount++;
      console.log(`   ✅ Updated\n`);
    }
  }
  
  console.log(`\n✨ Complete! Updated ${updatedCount} of ${templates.length} templates`);
  await prisma.$disconnect();
}

removeSignatures().catch(console.error);
EOF
```

## Check Database Directly

To see if signatures need updating:

```bash
node << 'EOF'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const templates = await prisma.contentTemplate.findMany();
  console.log(`\nTotal templates: ${templates.length}\n`);
  
  templates.forEach(t => {
    const content = [t.body, t.text, t.ttsScript].filter(Boolean).join(' ');
    if (content.includes('Jim Fitzgerald') || content.includes('Stanley') || content.includes('555-0123')) {
      console.log(`❌ Needs update: ${t.type} - ${t.name}`);
    } else if (content.includes('{{sender.')) {
      console.log(`✅ Already updated: ${t.type} - ${t.name}`);
    }
  });
  
  await prisma.$disconnect();
}

check().catch(console.error);
EOF
```

## Important Notes

1. **The script might not be deployed yet** because it was just pushed to GitHub
2. **Render needs to redeploy** the backend service to include the new script
3. **Check if backend redeployed** after the git push

## Alternative: Wait for Redeploy

The CSV files with updated signatures will be loaded when you:
1. Reload the funnel templates from CSV
2. Or create new campaigns from the updated funnels

The database templates will get the new signatures automatically when funnels are reloaded.

## Quick Check

```bash
# Check current directory
pwd

# List available scripts
ls -la scripts/ 2>/dev/null || ls -la adtv-event-automation/apps/server/scripts/ 2>/dev/null

# Show directory structure
ls -la
```

Run these commands and share the output, then I can give you the exact path to use.
