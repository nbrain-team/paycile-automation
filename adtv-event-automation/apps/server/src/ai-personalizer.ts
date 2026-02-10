/**
 * AI 1-to-1 Email Personalization Service
 * Uses OpenAI to generate personalized email content based on contact data
 * while preserving the original template's structure and intent.
 */

import OpenAI from 'openai';

// Initialize OpenAI client (will use OPENAI_API_KEY from env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface PersonalizationContact {
  first_name: string;
  last_name: string;
  company: string;
  title?: string;
  industry?: string;
  city?: string;
  state?: string;
  email?: string;
  phone?: string;
  // Extended data from rawJson
  revenue?: string;
  employees?: string | number;
  technologies?: string;
  linkedin_url?: string;
  [key: string]: any; // allow extra fields from rawJson
}

export interface PersonalizationCampaign {
  name: string;
  ownerName: string;
  eventType?: string;
}

export interface PersonalizationTemplate {
  type: 'email' | 'sms' | 'voicemail';
  subject?: string;
  body?: string;
  text?: string;
  ttsScript?: string;
}

export interface PersonalizedContent {
  subject?: string;
  body?: string;
  text?: string;
  ttsScript?: string;
  rationale: string;
}

/**
 * Build a contact context block from contact data + rawJson
 */
function buildContactContext(contact: PersonalizationContact): string {
  const lines: string[] = [
    `- Name: ${contact.first_name} ${contact.last_name}`,
    `- Company: ${contact.company}`,
  ];
  if (contact.title) lines.push(`- Title: ${contact.title}`);
  if (contact.industry) lines.push(`- Industry: ${contact.industry}`);
  if (contact.revenue) lines.push(`- Company Revenue: ${contact.revenue}`);
  if (contact.employees) lines.push(`- Company Size: ${contact.employees} employees`);
  if (contact.city && contact.state) lines.push(`- Location: ${contact.city}, ${contact.state}`);
  if (contact.technologies) lines.push(`- Technologies: ${contact.technologies}`);
  return lines.join('\n');
}

/**
 * Main AI Personalization Function
 * Personalizes email content while preserving the template's structure and intent.
 */
export async function personalizeContent(
  contact: PersonalizationContact,
  template: PersonalizationTemplate,
  campaign?: PersonalizationCampaign
): Promise<PersonalizedContent> {
  const contactContext = buildContactContext(contact);

  const systemPrompt = `You are an expert B2B email copywriter working for Paycile. Your job is to take a base email template and make subtle, tasteful personalizations for each recipient.

CRITICAL RULES:
1. PRESERVE the original email's structure, key messages, calls-to-action, and links exactly
2. DO NOT rewrite the email or change its fundamental meaning
3. DO NOT add new paragraphs, sections, or significantly alter the length
4. DO NOT invent claims, statistics, or facts not in the original
5. DO NOT remove any links, CTAs, or core content from the original
6. Keep the same professional tone and voice as the original template

WHAT YOU SHOULD DO:
- Add 1-3 subtle personal touches that reference the contact's role, company, or industry
- Slightly adjust opening lines to feel more personal (e.g., referencing their industry challenge)
- If the template uses generic language, make it more specific to their situation
- Keep all merge tags like {{contact.first_name}} intact — do not replace them
- The result should feel like a thoughtful human slightly customized the email, not like it was rewritten by AI

Return ONLY valid JSON with these fields:
{
  "subject": "the personalized subject line",
  "body": "the personalized email body",
  "rationale": "1-2 sentences explaining what you personalized and why"
}`;

  const userPrompt = `Personalize this email for the following contact.

CONTACT:
${contactContext}

${campaign ? `CAMPAIGN: ${campaign.name} (sent by ${campaign.ownerName})` : ''}

ORIGINAL EMAIL:
Subject: ${template.subject || '(no subject)'}

Body:
${template.body || template.text || '(empty)'}

Remember: Make subtle personalizations only. Do NOT rewrite the email. Preserve all structure, links, and CTAs.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5, // Lower temp for more consistent, subtle changes
      max_tokens: 1200,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return {
      subject: result.subject || template.subject || '',
      body: result.body || template.body || '',
      rationale: result.rationale || 'AI personalization applied',
    };
  } catch (error: any) {
    console.error('AI Personalization Error:', error.message);

    // Fallback: Return original content unchanged
    return {
      subject: template.subject || '',
      body: template.body || '',
      rationale: 'Fallback: AI unavailable, original template used',
    };
  }
}

/**
 * Batch personalization for multiple contacts against the same template.
 * Processes sequentially with rate limiting to avoid API limits.
 * Calls onProgress after each contact is processed.
 */
export async function batchPersonalize(
  contacts: PersonalizationContact[],
  template: PersonalizationTemplate,
  campaign?: PersonalizationCampaign,
  onProgress?: (completed: number, total: number, result: PersonalizedContent) => void
): Promise<PersonalizedContent[]> {
  const results: PersonalizedContent[] = [];

  for (let i = 0; i < contacts.length; i++) {
    const personalized = await personalizeContent(contacts[i], template, campaign);
    results.push(personalized);

    if (onProgress) onProgress(i + 1, contacts.length, personalized);

    // Rate limiting: wait 150ms between requests to avoid API limits
    if (i < contacts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }

  return results;
}

/**
 * Test function to verify OpenAI connection
 */
export async function testAIConnection(): Promise<boolean> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Test' }],
      max_tokens: 5
    });

    console.log('OpenAI API connection successful');
    return true;
  } catch (error: any) {
    console.error('OpenAI API connection failed:', error.message);
    return false;
  }
}
