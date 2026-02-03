# Fix Template IDs in Production

## Problem
Some content templates have string IDs (like `demo_confirmation`) instead of proper CUIDs (like `cmkss0sy40000ukv98ovep0az`), causing PATCH requests to fail with 400 errors.

## Solution
Run this script in Render shell to regenerate proper CUIDs for all templates:

```bash
node << 'EOF'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixTemplateIds() {
  console.log('🔍 Checking content templates...\n');
  
  const templates = await prisma.contentTemplate.findMany();
  console.log(`Found ${templates.length} templates\n`);
  
  const needsFix = templates.filter(t => {
    // CUIDs are 25 characters long, custom IDs are usually shorter
    return t.id.length < 20;
  });
  
  if (needsFix.length === 0) {
    console.log('✅ All templates have proper CUIDs!');
    await prisma.$disconnect();
    return;
  }
  
  console.log(`Found ${needsFix.length} templates with custom IDs:\n`);
  needsFix.forEach(t => {
    console.log(`  ❌ ${t.id} - ${t.name}`);
  });
  
  console.log('\n⚠️  These templates need to be recreated with proper CUIDs');
  console.log('    Run the recreation script below to fix them.\n');
  
  await prisma.$disconnect();
}

fixTemplateIds().catch(console.error);
EOF
```

## If Templates Need Fixing

Run this script to recreate them with proper CUIDs:

```bash
node << 'EOF'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function recreateTemplates() {
  console.log('🔄 Recreating templates with proper CUIDs...\n');
  
  const templates = await prisma.contentTemplate.findMany();
  const needsFix = templates.filter(t => t.id.length < 20);
  
  for (const old of needsFix) {
    console.log(`\n📝 Recreating: ${old.name}`);
    console.log(`   Old ID: ${old.id}`);
    
    // Create new template with proper CUID
    const newTemplate = await prisma.contentTemplate.create({
      data: {
        type: old.type,
        name: old.name,
        subject: old.subject,
        body: old.body,
        text: old.text,
        ttsScript: old.ttsScript
      }
    });
    
    console.log(`   New ID: ${newTemplate.id}`);
    
    // Delete old template
    await prisma.contentTemplate.delete({
      where: { id: old.id }
    });
    
    console.log(`   ✅ Recreated`);
  }
  
  console.log(`\n✨ Complete! Recreated ${needsFix.length} templates with proper CUIDs`);
  await prisma.$disconnect();
}

recreateTemplates().catch(console.error);
EOF
```

## After Running the Fix

1. Refresh the Templates page in the UI
2. Templates will reload with proper CUIDs
3. Save should work without errors

## Prevention

When seeding templates in the future, don't specify custom IDs. Let Prisma generate CUIDs:

**❌ Don't do this:**
```javascript
await prisma.contentTemplate.create({
  data: {
    id: 'demo_confirmation',  // Custom ID
    type: 'email',
    name: 'Demo Confirmation'
  }
});
```

**✅ Do this instead:**
```javascript
await prisma.contentTemplate.create({
  data: {
    // No ID specified - Prisma generates CUID
    type: 'email',
    name: 'Demo Confirmation'
  }
});
```
