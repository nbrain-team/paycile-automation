/**
 * AI 1-to-1 Personalization Service
 * Uses OpenAI to generate personalized email/SMS/VM content based on contact data
 */

import OpenAI from 'openai';

// Initialize OpenAI client (will use OPENAI_API_KEY from env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

interface PersonalizationContext {
  contact: {
    first_name: string;
    last_name: string;
    company: string;
    title?: string;
    industry?: string;
    firm_revenue?: string;
    city?: string;
    state?: string;
    email?: string;
    phone?: string;
  };
  campaign?: {
    name: string;
    type: string;
  };
  templateContent: {
    type: 'email' | 'sms' | 'voicemail';
    subject?: string;
    body?: string;
    text?: string;
    ttsScript?: string;
  };
  personalizationGoal: string; // e.g., "emphasize ROI for CFO", "focus on time savings", etc.
}

interface PersonalizedContent {
  subject?: string;
  body?: string;
  text?: string;
  ttsScript?: string;
  personaliz_rationale: string; // Why these changes were made
}

/**
 * Main AI Personalization Function
 */
export async function personalizeContent(
  context: PersonalizationContext
): Promise<PersonalizedContent> {
  const { contact, templateContent, personalizationGoal } = context;

  // Build system prompt based on Newbury Partners voice
  const systemPrompt = `You are Katie from Newbury Partners, a staffing technology consultancy. 

VOICE & TONE:
- Direct, no-fluff communication
- Lead with empathy and passion ("I live for helping...")
- Use specific, quantifiable results ($84K saved, 80 hours/month, etc.)
- Full transparency approach
- Conversational but professional
- Problem → Clarity → Action → Profit structure

WRITING STYLE:
- Short paragraphs (2-3 sentences max)
- Specific numbers over vague claims
- Questions that provoke thought
- Clear calls-to-action
- P.S. for urgency or transparency

NEVER:
- Use corporate jargon
- Make unsubstantiated claims
- Be pushy or salesy
- Write long paragraphs
- Use emojis

Your job is to personalize marketing content to make it feel 1-to-1 while maintaining the Newbury Partners voice.`;

  const userPrompt = `Personalize this ${templateContent.type} for ${contact.first_name} ${contact.last_name}.

CONTACT INFO:
- Name: ${contact.first_name} ${contact.last_name}
- Company: ${contact.company}
- Title: ${contact.title || 'Unknown'}
- Industry: ${contact.industry || 'Staffing'}
- Firm Revenue: ${contact.firm_revenue || 'Unknown'}
- Location: ${contact.city}, ${contact.state}

PERSONALIZATION GOAL:
${personalizationGoal}

ORIGINAL CONTENT:
${templateContent.type === 'email' ? `Subject: ${templateContent.subject}\n\nBody:\n${templateContent.body}` : ''}
${templateContent.type === 'sms' ? `SMS:\n${templateContent.text}` : ''}
${templateContent.type === 'voicemail' ? `Voicemail Script:\n${templateContent.ttsScript}` : ''}

INSTRUCTIONS:
1. Keep the core message and structure
2. Add personalized elements based on their role, industry, firm size
3. Include specific numbers relevant to their situation
4. Maintain Katie's voice (direct, empathetic, results-driven)
5. Keep it concise - email under 150 words, SMS under 160 characters
6. Use merge tags like {{contact.first_name}} where appropriate
7. Make it feel like Katie personally researched them

Return ONLY valid JSON in this exact format:
{
  "subject": "personalized subject line here (email only)",
  "body": "personalized email body here (email only)",
  "text": "personalized SMS text here (SMS only)",
  "ttsScript": "personalized voicemail script here (voicemail only)",
  "personalization_rationale": "brief explanation of personalization choices"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    return {
      subject: result.subject,
      body: result.body,
      text: result.text,
      ttsScript: result.ttsScript,
      personaliz_rationale: result.personalization_rationale || 'AI personalization applied'
    };
  } catch (error: any) {
    console.error('AI Personalization Error:', error.message);
    
    // Fallback: Return original content with basic template variable replacement
    return {
      subject: templateContent.subject?.replace(/{{contact\.(\w+)}}/g, (_, key) => contact[key as keyof typeof contact] || ''),
      body: templateContent.body?.replace(/{{contact\.(\w+)}}/g, (_, key) => contact[key as keyof typeof contact] || ''),
      text: templateContent.text?.replace(/{{contact\.(\w+)}}/g, (_, key) => contact[key as keyof typeof contact] || ''),
      ttsScript: templateContent.ttsScript?.replace(/{{contact\.(\w+)}}/g, (_, key) => contact[key as keyof typeof contact] || ''),
      personaliz_rationale: 'Fallback: Basic template variable replacement (AI unavailable)'
    };
  }
}

/**
 * Batch personalization for multiple contacts
 */
export async function batchPersonalize(
  contacts: PersonalizationContext[]
): Promise<PersonalizedContent[]> {
  const results: PersonalizedContent[] = [];
  
  for (const context of contacts) {
    const personalized = await personalizeContent(context);
    results.push(personalized);
    
    // Rate limiting: wait 100ms between requests to avoid API limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}

/**
 * Generate dynamic follow-up based on engagement
 */
export async function generateDynamicFollowUp(
  contact: PersonalizationContext['contact'],
  engagementData: {
    email_opened: boolean;
    link_clicked: boolean;
    page_visited?: string;
    time_on_site?: number;
  }
): Promise<PersonalizedContent> {
  const systemPrompt = `You are Katie from Newbury Partners writing a personalized follow-up based on prospect behavior.`;

  const behaviorContext = `
ENGAGEMENT BEHAVIOR:
- Email opened: ${engagementData.email_opened ? 'Yes' : 'No'}
- Link clicked: ${engagementData.link_clicked ? 'Yes' : 'No'}
- Page visited: ${engagementData.page_visited || 'None'}
- Time on site: ${engagementData.time_on_site || 0} seconds

Write a SHORT follow-up email (under 100 words) that:
1. References their specific engagement (e.g., "noticed you checked out the pricing page")
2. Provides relevant next step based on what they viewed
3. Maintains Katie's direct, helpful voice
4. Includes clear CTA

Return JSON with subject and body.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: behaviorContext }
      ],
      temperature: 0.8,
      max_tokens: 400,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      subject: result.subject,
      body: result.body,
      personaliz_rationale: 'AI-generated dynamic follow-up based on engagement'
    };
  } catch (error: any) {
    console.error('Dynamic follow-up generation error:', error.message);
    return {
      subject: `Re: ${contact.company} - Quick follow-up`,
      body: `Hi ${contact.first_name},\n\nSaw you checked out our info. Questions?\n\n-Katie`,
      personaliz_rationale: 'Fallback follow-up'
    };
  }
}

/**
 * Test function to verify OpenAI connection
 */
export async function testAIConnection(): Promise<boolean> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Test' }],
      max_tokens: 5
    });
    
    console.log('✅ OpenAI API connection successful');
    return true;
  } catch (error: any) {
    console.error('❌ OpenAI API connection failed:', error.message);
    return false;
  }
}

