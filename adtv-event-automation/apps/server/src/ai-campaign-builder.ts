/**
 * AI Campaign Builder
 * 
 * Generates complete multi-step marketing campaigns with content
 * using OpenAI GPT-4, enhanced with Paycile-specific context
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Load Paycile knowledge base for context-aware content generation
let PAYCILE_CONTEXT = '';
try {
  const contextPath = path.join(__dirname, '../../../PAYCILE_KNOWLEDGE_BASE.md');
  if (fs.existsSync(contextPath)) {
    PAYCILE_CONTEXT = fs.readFileSync(contextPath, 'utf-8');
  }
} catch (error) {
  console.warn('[AI Campaign Builder] Could not load Paycile knowledge base:', error);
}

export interface CampaignBuilderRequest {
  campaignDescription: string;
  numberOfSteps: number;
  availableNodeTypes: string[]; // e.g., ['email_send', 'sms_send', 'wait', 'voicemail_drop']
  targetAudience?: string;
  campaignGoal?: string;
  tone?: string; // professional, casual, urgent, friendly
  industry?: string; // real estate, insurance, property management, etc.
}

export interface GeneratedCampaignNode {
  id: string;
  type: string;
  name: string;
  config: {
    subject?: string;
    body?: string;
    text?: string;
    ttsScript?: string;
    waitDuration?: number;
    waitUnit?: 'hours' | 'days';
    description?: string;
  };
  posX: number;
  posY: number;
}

export interface GeneratedCampaignEdge {
  from: string;
  to: string;
  condition?: any;
}

export interface GeneratedCampaign {
  name: string;
  description: string;
  nodes: GeneratedCampaignNode[];
  edges: GeneratedCampaignEdge[];
  estimatedDuration: string;
  recommendedAudience: string;
}

/**
 * Generate a complete campaign with AI
 */
export async function generateCampaign(
  request: CampaignBuilderRequest,
  existingTemplates?: Array<{ type: string; subject?: string; body?: string; text?: string; ttsScript?: string }>
): Promise<GeneratedCampaign> {
  
  // Build tone reference from existing templates
  let toneReference = '';
  if (existingTemplates && existingTemplates.length > 0) {
    toneReference = `\n\nIMPORTANT - TONE AND STYLE REFERENCE:
The following are examples of existing company content that represents the desired tone, style, and voice. 
Study these carefully and match this exact tone in your generated content:

`;
    existingTemplates.slice(0, 5).forEach((template, index) => {
      toneReference += `\nEXAMPLE ${index + 1} (${template.type}):\n`;
      if (template.subject) toneReference += `Subject: ${template.subject}\n`;
      if (template.body) toneReference += `Body: ${template.body.substring(0, 500)}...\n`;
      if (template.text) toneReference += `Text: ${template.text}\n`;
      if (template.ttsScript) toneReference += `Script: ${template.ttsScript.substring(0, 300)}...\n`;
    });
    toneReference += `\nYour generated content MUST match the tone, style, formality level, and voice of these examples.`;
  }

  // Add Paycile context if available
  let paycileContext = '';
  if (PAYCILE_CONTEXT) {
    paycileContext = `\n\nPAYCILE PLATFORM CONTEXT:
You are creating campaigns for Paycile, a payment reconciliation and automation platform.
Use the following information to ensure your content is accurate, on-brand, and valuable:

${PAYCILE_CONTEXT.substring(0, 4000)}

Key points to remember:
- Paycile focuses on automated payment reconciliation for businesses
- Target audiences include CFOs, Controllers, Finance Managers, AR/AP specialists
- Key industries: Insurance, Property Management, Multi-Entity Businesses
- Value props: Cost savings, time efficiency, automated reconciliation, real-time visibility
- Tone: Professional yet approachable, benefit-driven, data-informed
- Leadership: Jim Fitzgerald (CEO), Paul Huntley (CFO), Steve Leighty (CTO)
- Partnership with Deluxe for enterprise payment processing

Use this context to make content specific, credible, and compelling for Paycile's target audience.
`;
  }

  const systemPrompt = `You are an expert marketing automation strategist specializing in multi-channel campaigns for B2B financial technology and payment processing platforms. 
You create highly effective, conversion-focused marketing sequences that combine emails, SMS, voicemails, and strategic timing.

Your campaigns should:
- Have a clear narrative arc from awareness to conversion
- Use appropriate channels for each stage of the customer journey
- Include compelling, benefit-driven copy that speaks to financial decision-makers
- Have strategic wait times between touchpoints (typically 1-3 days)
- Build urgency and value progressively
- Include clear calls-to-action (demos, consultations, downloads)
- Be personalized and conversational while maintaining professionalism
- Reference specific pain points and quantifiable benefits
- Match the company's established tone and voice${toneReference}${paycileContext}

IMPORTANT: You must return ONLY valid JSON with no additional text, markdown formatting, or code blocks.`;

  const userPrompt = `Create a ${request.numberOfSteps}-step marketing campaign with the following details:

CAMPAIGN DESCRIPTION:
${request.campaignDescription}

TARGET AUDIENCE:
${request.targetAudience || 'Financial decision-makers (CFOs, Controllers, Finance Managers)'}

CAMPAIGN GOAL:
${request.campaignGoal || 'Schedule product demonstrations and drive qualified leads'}

TONE:
${request.tone || 'Professional and benefit-focused'}

INDUSTRY:
${request.industry || 'Financial Services / Payment Processing'}

AVAILABLE NODE TYPES:
${request.availableNodeTypes.join(', ')}

NODE TYPE DESCRIPTIONS:
- email_send: Send an email (requires subject and body)
- sms_send: Send SMS text message (requires text, max 160 chars)
- voicemail_drop: Direct-to-voicemail drop (requires ttsScript for text-to-speech)
- wait: Delay before next action (requires waitDuration and waitUnit)
- stage: Milestone marker (requires name and description)
- decision: Conditional branching (requires description)
- task: Manual task for team member (requires description)

INSTRUCTIONS:
1. Create exactly ${request.numberOfSteps} meaningful steps
2. Start with a "start" node (id: "N00")
3. Use sequential node IDs: N10, N20, N30, etc. (increment by 10)
4. Mix different node types strategically
5. Include wait nodes between major touchpoints (typically 1-3 days)
6. Write compelling, specific content for each communication node
7. Position nodes vertically with 150px spacing (posY: 0, 150, 300, etc.)
8. All nodes should have posX: 400 (centered)
9. Create edges connecting each node sequentially
10. Make content specific to the campaign description, not generic
11. Reference Paycile's value propositions and services when relevant
12. Use personalization tokens: {{contact.first_name}}, {{contact.last_name}}, {{contact.email}}, {{contact.phone}}, {{contact.company}}, {{campaign.name}}

CONTENT GUIDELINES FOR PAYCILE:
- Email subjects: Compelling, benefit-driven, under 60 characters, speak to ROI/efficiency
- Email bodies: 150-250 words, clear CTA (schedule demo), personalized tone, reference specific pain points (reconciliation, cost recovery, automation)
- SMS messages: Under 160 characters, urgent value prop, clear action
- Voicemail scripts: 30-45 seconds when read, conversational, mention Paycile and key benefit, include callback with name
- Focus on business outcomes: time saved, costs recovered, errors eliminated
- Reference industry-specific challenges when applicable

Return ONLY this JSON structure (no markdown, no code blocks, just raw JSON):
{
  "name": "Campaign Name",
  "description": "Brief campaign description",
  "nodes": [
    {
      "id": "N00",
      "type": "start",
      "name": "Campaign Start",
      "config": {
        "description": "Starting point"
      },
      "posX": 400,
      "posY": 0
    },
    {
      "id": "N10",
      "type": "email_send",
      "name": "Email 1: Introduction",
      "config": {
        "subject": "Email subject here",
        "body": "Full email body here with personalization tokens"
      },
      "posX": 400,
      "posY": 150
    }
  ],
  "edges": [
    { "from": "N00", "to": "N10" }
  ],
  "estimatedDuration": "7 days",
  "recommendedAudience": "Target audience description"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or "gpt-4o" for latest
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" } // Forces JSON response
    });
    
    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }
    
    // Parse the JSON
    const campaign: GeneratedCampaign = JSON.parse(content);
    
    // Validate the structure
    if (!campaign.nodes || !Array.isArray(campaign.nodes) || campaign.nodes.length === 0) {
      throw new Error('Generated campaign has no nodes');
    }
    
    if (!campaign.edges || !Array.isArray(campaign.edges)) {
      throw new Error('Generated campaign has no edges');
    }
    
    // Ensure all nodes have required fields
    campaign.nodes = campaign.nodes.map((node, index) => ({
      ...node,
      id: node.id || `N${index * 10}`,
      posX: node.posX || 400,
      posY: node.posY || (index * 150),
      config: node.config || {}
    }));
    
    return campaign;
    
  } catch (error: any) {
    console.error('[AI Campaign Builder] Error:', error);
    throw new Error(`Failed to generate campaign: ${error.message}`);
  }
}

/**
 * Refine or regenerate specific campaign content
 */
export async function refineContent(
  nodeType: string,
  currentContent: any,
  refinementRequest: string,
  campaignContext?: string
): Promise<any> {
  
  const prompt = `You are refining content for a Paycile marketing campaign node.

NODE TYPE: ${nodeType}
CAMPAIGN CONTEXT: ${campaignContext || 'Paycile payment reconciliation platform marketing campaign'}

CURRENT CONTENT:
${JSON.stringify(currentContent, null, 2)}

REFINEMENT REQUEST:
${refinementRequest}

PAYCILE CONTEXT:
- Platform: Automated payment reconciliation for businesses
- Target: CFOs, Controllers, Finance Managers
- Value: Cost savings, time efficiency, automated reconciliation
- Tone: Professional, benefit-driven, data-informed

Please provide improved content that addresses the refinement request while maintaining the campaign's tone and goals.
Use personalization tokens where appropriate: {{contact.first_name}}, {{contact.last_name}}, {{contact.company}}

Return ONLY valid JSON with the updated content fields (subject, body, text, or ttsScript as appropriate).
No markdown, no code blocks, just raw JSON.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content generated');
    
    return JSON.parse(content);
    
  } catch (error: any) {
    console.error('[AI Campaign Builder] Refine error:', error);
    throw new Error(`Failed to refine content: ${error.message}`);
  }
}

/**
 * Generate variations of campaign content for A/B testing
 */
export async function generateVariations(
  nodeType: string,
  originalContent: any,
  numberOfVariations: number = 3
): Promise<any[]> {
  
  const prompt = `Create ${numberOfVariations} variations of this Paycile marketing content for A/B testing.

NODE TYPE: ${nodeType}

ORIGINAL CONTENT:
${JSON.stringify(originalContent, null, 2)}

Create ${numberOfVariations} distinct variations that:
1. Test different value propositions (cost savings vs. time efficiency vs. automation benefits)
2. Use different emotional appeals (urgency vs. opportunity vs. pain point)
3. Vary the call-to-action approach (demo scheduling vs. consultation vs. learning more)
4. Maintain similar length and structure
5. Stay true to Paycile's professional, benefit-driven tone
6. Reference different pain points (reconciliation errors, manual processes, cost recovery, compliance)

Return ONLY a JSON array of ${numberOfVariations} objects, each with the same structure as the original.
No markdown, no code blocks, just raw JSON array.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.8, // Higher temperature for more variety
      response_format: { type: "json_object" }
    });
    
    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No content generated');
    
    const parsed = JSON.parse(content);
    // Handle both array and object with variations key
    return Array.isArray(parsed) ? parsed : (parsed.variations || []);
    
  } catch (error: any) {
    console.error('[AI Campaign Builder] Variations error:', error);
    throw new Error(`Failed to generate variations: ${error.message}`);
  }
}
