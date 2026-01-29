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
  targetPersona?: string; // cfo, controller, arap, property_finance, treasury, accountant, small_biz, auditor
  landingPageUrl?: string; // URL to include in CTAs if provided
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

  // Build persona-specific guidance
  const personaGuidance = request.targetPersona ? getPersonaGuidance(request.targetPersona) : '';
  
  // Build landing page CTA guidance
  const landingPageGuidance = request.landingPageUrl 
    ? `\n\nLANDING PAGE CTA:
This campaign has a dedicated landing page at: ${request.landingPageUrl}
Include this URL in email CTAs and SMS messages as appropriate. Example CTAs:
- "Learn more: ${request.landingPageUrl}"
- "Schedule your demo: ${request.landingPageUrl}"
- "See how we can help: ${request.landingPageUrl}"`
    : '';

  const systemPrompt = `You are an expert marketing automation strategist specializing in multi-channel campaigns for B2B financial technology and payment processing platforms. 
You create highly effective, conversion-focused marketing sequences with intelligent workflow design.

CRITICAL WORKFLOW DESIGN PRINCIPLES:
You have full control over campaign workflow. The user selects communication channels (email, SMS, voicemail, LinkedIn), 
and YOU intelligently design the complete workflow including:
- WAIT nodes: Strategic timing between touchpoints (1-3 days typical, adjust based on urgency)
- DECISION nodes: Engagement-based routing (opened email → nurture path, no open → re-engage)
- STAGE nodes: Milestone markers for tracking (Initial Outreach, Follow-Up, Closing, etc.)
- TASK nodes: Manual intervention points (BDR review high-value prospects, etc.)

Your campaigns should:
- Have a clear narrative arc from awareness to conversion
- Use appropriate channels for each stage of the customer journey (email for detail, SMS for urgency, voicemail for personal touch)
- Include compelling, benefit-driven copy that speaks to financial decision-makers
- Intelligently sequence touches: Don't send SMS immediately after email - wait 2-3 days
- Build urgency and value progressively with quantifiable ROI metrics
- Include clear calls-to-action (demos, consultations, landing page visits)
- Add WAIT nodes between all major communication touchpoints
- Add DECISION nodes when engagement determines next step (e.g., after first email, route opened vs. not opened)
- Add STAGE nodes to mark campaign phases (Awareness, Consideration, Decision)
- Add TASK nodes when manual intervention makes sense (high-value prospect needs BDR call)
- Be personalized and conversational while maintaining professionalism
- Reference specific pain points and quantifiable benefits from the Paycile strategy
- Match the company's established tone and voice
- Use persona-specific messaging that resonates with their unique challenges${toneReference}${paycileContext}${personaGuidance}${landingPageGuidance}

WORKFLOW INTELLIGENCE EXAMPLES:
- Email → WAIT (2 days) → Email Follow-up (better than immediate email spam)
- Email → WAIT (1 day) → DECISION (opened?) → Yes: Nurture path | No: Re-engage path
- Email → WAIT (2 days) → SMS (multi-channel reinforcement)
- Email → WAIT (3 days) → Voicemail (escalation for non-responders)
- STAGE nodes at transitions: "Initial Outreach" → "Follow-Up" → "Closing Sequence"
- TASK node: "BDR Review - High Intent Prospect" (when prospect downloads content)

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

COMMUNICATION CHANNELS AVAILABLE:
${request.availableNodeTypes.filter(t => ['email_send', 'sms_send', 'voicemail_drop', 'linkedin_message', 'linkedin_post'].includes(t)).join(', ')}

WORKFLOW NODES YOU CONTROL:
- wait: Strategic delays (REQUIRED between major touches - use intelligently!)
- decision: Engagement-based routing (use for opened/clicked logic)
- stage: Milestone markers (use to organize campaign phases)
- task: Manual intervention (use when BDR/sales should engage)

NODE TYPE SPECIFICATIONS:
- email_send: Send email (requires subject and body with personalization)
- sms_send: Send SMS text (requires text, max 160 chars, urgent/timely only)
- voicemail_drop: Direct-to-voicemail (requires ttsScript, 30-45 seconds)
- linkedin_message: LinkedIn DM (requires text, professional tone)
- linkedin_post: LinkedIn post (requires text, thought leadership content)
- wait: Delay (requires waitDuration: number and waitUnit: 'hours' | 'days')
- decision: Conditional branch (requires description of condition)
- stage: Milestone (requires name and description)
- task: Manual task (requires description for team member)

INSTRUCTIONS:
1. Design a campaign with approximately ${request.numberOfSteps} communication touchpoints
2. Start with a "start" node (id: "N00")
3. Use sequential node IDs: N10, N20, N30, etc. (increment by 10)
4. INTELLIGENTLY design workflow:
   - Add WAIT nodes between ALL communication touches (don't spam!)
   - Add DECISION nodes when engagement affects routing
   - Add STAGE nodes to mark campaign phases
   - Add TASK nodes when manual intervention makes sense
5. Strategic timing:
   - Email → WAIT 2-3 days → Email (standard nurture)
   - Email → WAIT 1 day → SMS (urgent follow-up)
   - Email → WAIT 3 days → Voicemail (escalation)
6. Write compelling, specific content for each communication node
7. Position nodes vertically with 150px spacing (posY: 0, 150, 300, etc.)
8. All nodes should have posX: 400 (centered)
9. Create edges connecting each node to build the workflow
10. Make content specific to the campaign description, not generic
11. Reference Paycile's value propositions and quantifiable ROI metrics
12. Use personalization tokens: {{contact.first_name}}, {{contact.last_name}}, {{contact.email}}, {{contact.phone}}, {{contact.company}}, {{campaign.name}}
13. CRITICAL: Don't just create communication nodes - design an intelligent workflow with waits, decisions, stages

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

/**
 * Get persona-specific messaging guidance
 */
function getPersonaGuidance(persona: string): string {
  const personaMap: Record<string, string> = {
    cfo: `
PERSONA: CFO / Financial Executive
TONE: Executive-level, strategic, ROI-focused
KEY PAIN POINTS:
- Data inconsistency across systems (emphasize "single source of truth")
- Delayed financial insights ("50% faster cash visibility")
- Audit exposure and compliance risk ("audit-ready automation")
- Limited real-time visibility ("real-time dashboard")

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 50% faster cash visibility
- Real-time financial dashboards
- Reduced audit risk with complete traceability
- Strategic time reallocation from reconciliation to growth initiatives

MESSAGING HOOKS:
- "Are you still waiting 10 days to know your true cash position?"
- "Strategic decisions require real-time data—manual reconciliation can't deliver"
- "The hidden cost of reconciliation chaos: delayed insights and missed opportunities"

CTA STYLE: "Schedule executive demo", "See CFO dashboard", "Get strategic insights"`,

    controller: `
PERSONA: Finance Manager / Controller
TONE: Operational efficiency, compliance-focused, team enablement
KEY PAIN POINTS:
- Manual workloads consuming 60-80% of time ("90% workload reduction")
- Cross-entity reconciliations ("consolidated reporting")
- Team morale from repetitive tasks ("focus on strategic analysis")
- Period-end pressure ("96 days saved annually")

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 96 days saved annually on period-end close
- 90% workload reduction on reconciliation
- Traceable audit trails built automatically
- Team efficiency and morale improvement

MESSAGING HOOKS:
- "Your team spends more time matching than analyzing—here's how to change that"
- "Month-end close shouldn't require all-hands overtime"
- "Audit-ready reconciliation: automated, traceable, compliant"

CTA STYLE: "Book efficiency demo", "See workflow automation", "Transform your close process"`,

    arap: `
PERSONA: AR/AP Specialist
TONE: Practical, efficiency-focused, results-oriented
KEY PAIN POINTS:
- Unapplied funds sitting in limbo ("automated recovery")
- Dispute handling delays ("exception-based workflow")
- Manual payment matching ("95% auto-match")
- High write-off rates ("62% reduction")

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 90% automation on payment posting
- 62% reduction in write-offs
- Unapplied funds recovery automation
- 95% auto-match accuracy

MESSAGING HOOKS:
- "Unapplied funds are lost revenue—recover them automatically"
- "Stop manually matching payments: 95% auto-match accuracy"
- "Reduce write-offs by 62% with intelligent payment reconciliation"

CTA STYLE: "See automation demo", "Recover lost revenue", "Eliminate manual matching"`,

    treasury: `
PERSONA: Treasury / Cash Manager
TONE: Data-driven, forecasting-focused, risk-aware
KEY PAIN POINTS:
- Multi-bank data lag (2-5 day delays)
- Currency mismatch issues
- Fraud detection gaps
- Forecasting inaccuracy

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 50% faster cash visibility
- Real-time multi-bank dashboard
- Fraud detection and mitigation
- Improved forecasting accuracy

MESSAGING HOOKS:
- "Multi-bank reconciliation in real-time, not next week"
- "Cash flow surprises kill growth—eliminate them"
- "Forecasting accuracy starts with reconciliation accuracy"

CTA STYLE: "See treasury dashboard", "Improve forecasting", "Get real-time visibility"`,

    property_finance: `
PERSONA: Property Finance Manager (Yardi-Integrated)
TONE: Operations-focused, property-specific, efficiency-driven
KEY PAIN POINTS:
- Tenant payment matching across multiple properties
- Trust account reconciliation complexity
- Yardi data sync issues
- Security deposit tracking

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 90% less manual work on tenant payments
- 0.8-1.8% error rates (down from 5-8%)
- Yardi native integration
- Trust account compliance automation

MESSAGING HOOKS:
- "Yardi + Paycile: The perfect reconciliation match"
- "Trust account reconciliation in minutes, not days"
- "Multi-property rollup with zero manual work"

CTA STYLE: "See Yardi integration", "Book property demo", "Automate trust accounts"`,

    accountant: `
PERSONA: Accountant / GL Specialist
TONE: Detail-oriented, accuracy-focused, practical
KEY PAIN POINTS:
- Spreadsheet dependency
- High error rates (5-8%)
- Manual data entry consuming entire day
- Bank reconciliation backlogs

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 95% auto-matching of transactions
- Error rates drop to <2%
- Full ERP integration (no double entry)
- Real-time bank reconciliation

MESSAGING HOOKS:
- "Spreadsheets are error-prone and unscalable"
- "Manual reconciliation creates bottlenecks"
- "Your accuracy shouldn't depend on caffeine levels"

CTA STYLE: "Eliminate manual work", "See accuracy improvements", "Automate reconciliation"`,

    small_biz: `
PERSONA: Small Business Owner / CEO
TONE: Growth-focused, accessible, empowering, ROI-driven
KEY PAIN POINTS:
- Lack of automation
- Scalability limitations
- Cash flow uncertainty
- Limited finance resources

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- ROI in 8-12 months
- Centralized financial visibility
- Scalable without hiring more staff
- Enterprise-grade tools at SMB pricing

MESSAGING HOOKS:
- "You can't scale on spreadsheets—here's what works"
- "Enterprise-grade reconciliation at small business prices"
- "Free your team from manual work and focus on growth"

CTA STYLE: "Start free trial", "See ROI calculator", "Schedule consultation"`,

    auditor: `
PERSONA: Auditor / Compliance Officer
TONE: Risk-focused, compliance-oriented, evidence-based
KEY PAIN POINTS:
- Limited traceability in manual processes
- Manual audit sampling
- Fraud detection delays
- Compliance documentation burden

QUANTIFIABLE BENEFITS TO EMPHASIZE:
- 25% audit cost reduction
- 70% faster fraud detection
- Complete audit trail automation
- Real-time compliance monitoring

MESSAGING HOOKS:
- "Manual audits miss patterns"
- "Fraud detection shouldn't be reactive"
- "Compliance documentation is mission-critical"

CTA STYLE: "See compliance features", "Schedule audit demo", "Review security"`,
  };

  return personaMap[persona] || '';
}
