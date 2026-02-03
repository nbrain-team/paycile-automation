const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSignatures() {
  const templates = await prisma.contentTemplate.findMany();
  
  console.log(`\n=== Found ${templates.length} Content Templates ===\n`);
  
  const signaturePatterns = [
    /Jim Fitzgerald/gi,
    /Stanley/gi,
    /Best regards/gi,
    /Sincerely/gi,
    /Thanks,\s*\n\s*[A-Z]/gi,
    /Regards,\s*\n\s*[A-Z]/gi,
    /\n\n[A-Z][a-z]+ [A-Z][a-z]+\s*$/gi
  ];
  
  templates.forEach(t => {
    let hasSignature = false;
    const content = [t.subject, t.body, t.text, t.ttsScript].filter(Boolean).join('\n');
    
    signaturePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        hasSignature = true;
      }
    });
    
    if (hasSignature) {
      console.log(`\n📧 ${t.type.toUpperCase()}: ${t.name}`);
      console.log(`ID: ${t.id}`);
      if (t.subject) console.log(`Subject: ${t.subject.substring(0, 80)}...`);
      if (t.body) console.log(`Body preview: ${t.body.substring(0, 150)}...`);
      if (t.text) console.log(`Text preview: ${t.text.substring(0, 150)}...`);
      if (t.ttsScript) console.log(`TTS preview: ${t.ttsScript.substring(0, 150)}...`);
    }
  });
  
  await prisma.$disconnect();
}

checkSignatures().catch(console.error);
