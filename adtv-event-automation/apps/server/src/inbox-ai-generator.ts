/**
 * Inbox AI Response Generator
 * Generates on-tone response suggestions for BDRs to send
 */

import OpenAI from 'openai';
import { getNewburySystemPrompt, getFewShotExamples, newburyVoiceTraining } from './newbury-voice-training';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface InboxMessage {
  id: string;
  from: string;
  fromEmail: string;
  fromCompany?: string;
  subject: string;
  body: string;
  timestamp: string;
  thread?: InboxMessage[]; // Previous messages in thread
}

export interface ResponseContext {
  incomingMessage: InboxMessage;
  contactInfo?: {
    name: string;
    company: string;
    title?: string;
    industry?: string;
    firmSize?: string;
    previousInteractions?: string[];
  };
  campaignContext?: {
    product: 'dealsheet' | 'kanban' | 'commissions';
    stage: 'awareness' | 'consideration' | 'decision' | 'retention';
  };
  bdrNotes?: string; // Optional notes from BDR about the response goal
}

export interface GeneratedResponse {
  subject: string;
  body: string;
  rationale: string;
  confidence: 'high' | 'medium' | 'low';
  suggestedNextSteps?: string[];
}

/**
 * Generate AI response for inbox message
 */
export async function generateInboxResponse(
  context: ResponseContext
): Promise<GeneratedResponse> {
  const { incomingMessage, contactInfo, campaignContext, bdrNotes } = context;

  // Build conversation history
  const conversationHistory = context.incomingMessage.thread || [];
  const threadSummary = conversationHistory.length > 0
    ? conversationHistory.map(m => `[${m.from}]: ${m.subject}\n${m.body.substring(0, 200)}...`).join('\n\n')
    : 'First interaction';

  // Detect intent/sentiment from incoming message
  const messageIntent = await detectMessageIntent(incomingMessage.body);

  // Build system prompt with Newbury voice
  const systemPrompt = getNewburySystemPrompt({
    product: campaignContext?.product,
    scenario: getScenarioFromIntent(messageIntent)
  });

  // Build user prompt with full context
  const userPrompt = `Generate a response to this incoming message.

INCOMING MESSAGE:
From: ${incomingMessage.from} (${incomingMessage.fromEmail})
${contactInfo ? `Company: ${contactInfo.company}
Title: ${contactInfo.title || 'Unknown'}
Industry: ${contactInfo.industry || 'Staffing'}
Firm Size: ${contactInfo.firmSize || 'Unknown'}` : ''}

Subject: ${incomingMessage.subject}

Body:
${incomingMessage.body}

CONVERSATION HISTORY:
${threadSummary}

MESSAGE INTENT: ${messageIntent.intent}
SENTIMENT: ${messageIntent.sentiment}

${bdrNotes ? `BDR NOTES: ${bdrNotes}` : ''}

${campaignContext ? `CAMPAIGN CONTEXT:
Product: ${campaignContext.product}
Stage: ${campaignContext.stage}` : ''}

INSTRUCTIONS:
1. Write a response in Katie's voice (Newbury Partners)
2. Be specific to their situation and intent
3. ${messageIntent.intent === 'question' ? 'Answer their question directly first, then add value' : ''}
4. ${messageIntent.intent === 'objection' ? 'Address the objection with specific data/examples' : ''}
5. ${messageIntent.intent === 'interest' ? 'Move them to next step (demo, case study, call)' : ''}
6. Keep it concise - under 150 words
7. Include clear next step/CTA
8. Use merge tags like {{contact.first_name}} where appropriate

Return ONLY valid JSON:
{
  "subject": "re: subject line here",
  "body": "response body here with Katie's voice",
  "rationale": "why this response works",
  "confidence": "high|medium|low",
  "suggestedNextSteps": ["action 1", "action 2"]
}`;

  try {
    // Get few-shot examples for better context
    const fewShotExamples = getFewShotExamples();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...fewShotExamples,
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 600,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return {
      subject: result.subject || `Re: ${incomingMessage.subject}`,
      body: result.body || '',
      rationale: result.rationale || 'AI-generated response',
      confidence: result.confidence || 'medium',
      suggestedNextSteps: result.suggestedNextSteps || []
    };

  } catch (error: any) {
    console.error('Inbox AI Generator Error:', error.message);

    // Fallback response
    return {
      subject: `Re: ${incomingMessage.subject}`,
      body: `Hi ${contactInfo?.name || incomingMessage.from},\n\nThanks for reaching out. Let me get you the information you need.\n\n-Katie`,
      rationale: 'Fallback response (AI unavailable)',
      confidence: 'low',
      suggestedNextSteps: ['Review message manually', 'Personalize response']
    };
  }
}

/**
 * Detect message intent and sentiment
 */
async function detectMessageIntent(messageBody: string): Promise<{
  intent: 'question' | 'objection' | 'interest' | 'pricing' | 'demo_request' | 'general';
  sentiment: 'positive' | 'neutral' | 'negative';
  keyPoints: string[];
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: `Analyze this message and return JSON with intent, sentiment, and key points:

"${messageBody}"

Return: {"intent": "question|objection|interest|pricing|demo_request|general", "sentiment": "positive|neutral|negative", "keyPoints": ["point1", "point2"]}`
      }],
      temperature: 0.3,
      max_tokens: 200,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(completion.choices[0].message.content || '{"intent":"general","sentiment":"neutral","keyPoints":[]}');
  } catch (error) {
    return {
      intent: 'general',
      sentiment: 'neutral',
      keyPoints: []
    };
  }
}

/**
 * Map intent to scenario for voice training
 */
function getScenarioFromIntent(
  messageIntent: {intent: string}
): 'cold_outreach' | 'follow_up' | 'objection' | 'demo_request' | 'thank_you' {
  switch (messageIntent.intent) {
    case 'objection':
      return 'objection';
    case 'demo_request':
      return 'demo_request';
    case 'interest':
      return 'follow_up';
    default:
      return 'follow_up';
  }
}

/**
 * Generate multiple response options for BDR to choose from
 */
export async function generateResponseOptions(
  context: ResponseContext,
  count: number = 3
): Promise<GeneratedResponse[]> {
  const responses: GeneratedResponse[] = [];

  // Generate with different temperature settings for variety
  const temperatures = [0.6, 0.8, 1.0];

  for (let i = 0; i < Math.min(count, temperatures.length); i++) {
    try {
      const response = await generateInboxResponse(context);
      responses.push(response);

      // Wait 200ms between requests to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error generating response option ${i + 1}:`, error);
    }
  }

  return responses;
}

/**
 * Analyze thread and suggest best response strategy
 */
export async function suggestResponseStrategy(
  thread: InboxMessage[]
): Promise<{
  strategy: string;
  reasoning: string;
  urgency: 'high' | 'medium' | 'low';
  recommendedTone: string;
}> {
  const threadSummary = thread.map(m =>
    `[${m.from}]: ${m.subject}\n${m.body.substring(0, 150)}...`
  ).join('\n\n---\n\n');

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{
        role: 'system',
        content: 'You are a sales strategy advisor for Newbury Partners. Analyze email threads and suggest response strategies.'
      }, {
        role: 'user',
        content: `Analyze this email thread and suggest the best response strategy:

${threadSummary}

Return JSON with:
{
  "strategy": "brief description of recommended strategy",
  "reasoning": "why this strategy",
  "urgency": "high|medium|low",
  "recommendedTone": "description of tone to use"
}`
      }],
      temperature: 0.5,
      max_tokens: 300,
      response_format: { type: 'json_object' }
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    return {
      strategy: 'Standard follow-up',
      reasoning: 'Unable to analyze thread',
      urgency: 'medium',
      recommendedTone: 'Professional and helpful'
    };
  }
}

