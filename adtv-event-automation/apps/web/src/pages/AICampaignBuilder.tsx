import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl, apiAuth, apiCampaigns, apiSenderEmails } from '@lib/api';
import { useStore } from '@store/useStore';

const AVAILABLE_CHANNELS = [
  { value: 'email_send', label: 'Email', description: 'Send email to contacts', icon: '📧' },
  { value: 'sms_send', label: 'SMS', description: 'Send text message', icon: '💬' },
  { value: 'voicemail_drop', label: 'Voicemail', description: 'Direct-to-voicemail drop', icon: '🎙️' },
  { value: 'linkedin_connect', label: 'LinkedIn Connect', description: 'Send connection request with note', icon: '🔗' },
  { value: 'linkedin_message', label: 'LinkedIn Message', description: 'Send LinkedIn direct message', icon: '💼' },
  { value: 'linkedin_post', label: 'LinkedIn Post', description: 'Post to LinkedIn feed', icon: '📱' },
];

// AI will automatically add these workflow nodes as needed
const AI_WORKFLOW_NODES = [
  'wait',      // Strategic delays between touches
  'decision',  // Conditional branching based on engagement
  'stage',     // Milestone tracking
  'task',      // Manual intervention points
];

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'casual', label: 'Casual' },
  { value: 'empathetic', label: 'Empathetic' },
];

const INDUSTRY_OPTIONS = [
  { value: 'insurance', label: 'Insurance' },
  { value: 'property_management', label: 'Property Management' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'technology', label: 'Technology' },
  { value: 'other', label: 'Other' },
];

const PERSONA_OPTIONS = [
  { value: 'cfo', label: 'CFO / Financial Executive', industry: 'insurance' },
  { value: 'controller', label: 'Finance Manager / Controller', industry: 'multi_entity' },
  { value: 'arap', label: 'AR/AP Specialist', industry: 'general' },
  { value: 'property_finance', label: 'Property Finance Manager', industry: 'property_management' },
  { value: 'treasury', label: 'Treasury / Cash Manager', industry: 'finance' },
  { value: 'accountant', label: 'Accountant / GL Specialist', industry: 'general' },
  { value: 'small_biz', label: 'Small Business Owner / CEO', industry: 'general' },
  { value: 'auditor', label: 'Auditor / Compliance Officer', industry: 'general' },
];

const LANDING_PAGE_TEMPLATES = [
  { 
    value: 'none', 
    label: 'No Landing Page', 
    description: 'Campaign only (no landing page link)' 
  },
  { 
    value: 'cfo_insurance', 
    label: 'CFO Insurance Landing', 
    description: 'For CFOs at insurance companies',
    url: '/landing/cfo-insurance',
    persona: 'cfo',
    industry: 'insurance'
  },
  { 
    value: 'controller', 
    label: 'Controller Multi-Entity Landing', 
    description: 'For Controllers managing multiple entities',
    url: '/landing/controller',
    persona: 'controller',
    industry: 'multi_entity'
  },
  { 
    value: 'arap', 
    label: 'AR/AP Unapplied Funds Landing', 
    description: 'For AR/AP specialists focused on fund recovery',
    url: '/landing/arap',
    persona: 'arap',
    industry: 'general'
  },
  { 
    value: 'property_mgmt', 
    label: 'Property Management Landing', 
    description: 'For property management finance teams',
    url: '/landing/property-management',
    persona: 'property_finance',
    industry: 'property_management'
  },
  { 
    value: 'other', 
    label: 'Other (Custom URL)', 
    description: 'Use any landing page URL' 
  },
];

interface GeneratedCampaign {
  name: string;
  description: string;
  nodes: Array<{
    id: string;
    type: string;
    name: string;
    config: any;
    posX: number;
    posY: number;
  }>;
  edges: Array<{ from: string; to: string }>;
  estimatedDuration: string;
  recommendedAudience: string;
}

export function AICampaignBuilder() {
  const navigate = useNavigate();
  const { addToast } = useStore();
  
  // Form state
  const [campaignDescription, setCampaignDescription] = useState('');
  const [numberOfSteps, setNumberOfSteps] = useState(5);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'email_send',
    'sms_send',
  ]);
  const [targetAudience, setTargetAudience] = useState('');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [tone, setTone] = useState('professional');
  const [industry, setIndustry] = useState('insurance');
  const [targetPersona, setTargetPersona] = useState('cfo');
  const [landingPageTemplate, setLandingPageTemplate] = useState('none');
  const [customLandingPageUrl, setCustomLandingPageUrl] = useState('');
  
  // Fetch logged-in user's profile (name, email, phone, Calendly) and sender emails
  const [userProfile, setUserProfile] = useState<{ id?: string; name?: string; email?: string; phone?: string; calendlyLink?: string; microsoftEmail?: string }>({});
  const [userCalendarLink, setUserCalendarLink] = useState('');
  const [senderEmails, setSenderEmails] = useState<Array<{ email: string; name: string; source: string; userId?: string; phone?: string; calendlyLink?: string }>>([]);
  const [selectedSenderEmail, setSelectedSenderEmail] = useState('');

  useEffect(() => {
    apiAuth.me().then((u: any) => {
      if (u) {
        setUserProfile(u);
        if (u.calendlyLink) setUserCalendarLink(u.calendlyLink);
      }
    }).catch(() => {});

    apiSenderEmails.list().then((list) => {
      if (Array.isArray(list) && list.length > 0) {
        setSenderEmails(list);
        const first = list[0];
        if (first) setSelectedSenderEmail(first.email);
      }
    }).catch(() => {});
  }, []);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<GeneratedCampaign | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [refinementRequest, setRefinementRequest] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const handleChannelToggle = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter((t) => t !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleGenerate = async () => {
    if (!campaignDescription.trim()) {
      addToast({ title: 'Please describe your campaign', variant: 'error' });
      return;
    }

    if (selectedChannels.length === 0) {
      addToast({ title: 'Please select at least one communication channel', variant: 'error' });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`${getApiUrl()}/api/ai/campaign/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignDescription,
          numberOfSteps,
          availableNodeTypes: [
            ...selectedChannels,
            ...AI_WORKFLOW_NODES  // AI can use these automatically
          ],
          selectedChannels: selectedChannels, // Just the communication channels
          targetAudience: targetAudience || undefined,
          campaignGoal: campaignGoal || undefined,
          tone,
          industry: industry || undefined,
          targetPersona: targetPersona || undefined,
          landingPageUrl: landingPageTemplate === 'other'
            ? (customLandingPageUrl.trim() || undefined)
            : landingPageTemplate !== 'none' 
              ? LANDING_PAGE_TEMPLATES.find(t => t.value === landingPageTemplate)?.url 
              : undefined,
          calendarLink: userCalendarLink || undefined,
          includeExistingTemplates: true,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate campaign');
      }

      setGeneratedCampaign(data.campaign);
      addToast({ title: 'Campaign generated successfully! ✨', variant: 'success' });
    } catch (error: any) {
      console.error('Generation error:', error);
      addToast({ title: error.message || 'Failed to generate campaign', variant: 'error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefineContent = async () => {
    if (!selectedNodeId || !generatedCampaign || !refinementRequest.trim()) {
      return;
    }

    const node = generatedCampaign.nodes.find((n) => n.id === selectedNodeId);
    if (!node) return;

    setIsRefining(true);
    try {
      const response = await fetch(`${getApiUrl()}/api/ai/campaign/refine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeType: node.type,
          currentContent: node.config,
          refinementRequest,
          campaignContext: campaignDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to refine content');
      }

      // Update the node with refined content
      setGeneratedCampaign({
        ...generatedCampaign,
        nodes: generatedCampaign.nodes.map((n) =>
          n.id === selectedNodeId ? { ...n, config: { ...n.config, ...data.content } } : n
        ),
      });

      setRefinementRequest('');
      addToast({ title: 'Content refined successfully! ✨', variant: 'success' });
    } catch (error: any) {
      console.error('Refine error:', error);
      addToast({ title: error.message || 'Failed to refine content', variant: 'error' });
    } finally {
      setIsRefining(false);
    }
  };

  const handleSaveAsTemplate = async () => {
    if (!generatedCampaign) return;

    try {
      // Transform generated campaign into template format
      const templateData = {
        name: generatedCampaign.name,
        status: 'draft',
        nodes: generatedCampaign.nodes.map((node, index) => ({
          key: node.id,
          type: node.type,
          name: node.name,
          configJson: JSON.stringify(node.config),
          posX: node.posX,
          posY: node.posY,
          order: index,
        })),
        edges: generatedCampaign.edges.map((edge, index) => ({
          fromKey: edge.from,
          toKey: edge.to,
          conditionJson: JSON.stringify(null),
          order: index,
        })),
      };

      // Save as funnel template
      const response = await fetch(`${getApiUrl()}/api/ai/campaign/save-as-template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        console.error('Backend error:', errorData);
        throw new Error(errorData.error || 'Failed to save template');
      }

      const savedTemplate = await response.json();

      // Also create a campaign from the template with the user's profile data
      const senderData = senderEmails.find((s) => s.email === selectedSenderEmail);
      const senderName = senderData?.name || userProfile.name || '';
      const senderEmail = selectedSenderEmail || userProfile.microsoftEmail || userProfile.email || '';
      const phone = senderData?.phone || userProfile.phone || '';
      const calendly = senderData?.calendlyLink || userCalendarLink || '';

      const campaign = await apiCampaigns.create({
        name: generatedCampaign.name,
        ownerName: senderName,
        ownerEmail: senderEmail,
        ownerPhone: phone || undefined,
        eventType: 'outreach',
        eventDate: new Date().toISOString().split('T')[0],
        calendlyLink: calendly || undefined,
        templateId: savedTemplate.id,
        senderUserId: senderData?.userId || userProfile.id || undefined,
        status: 'draft',
      });

      addToast({ title: 'Campaign created successfully!', variant: 'success' });
      navigate(`/campaigns/${campaign.id}`);
    } catch (error: any) {
      console.error('Save error:', error);
      addToast({ title: error.message || 'Failed to save campaign', variant: 'error' });
    }
  };

  const selectedNode = selectedNodeId 
    ? generatedCampaign?.nodes.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Campaign Builder</h1>
        <p className="text-gray-600 mt-1">
          Describe your campaign and let AI generate a complete multi-step workflow with content
        </p>
      </div>

      {!generatedCampaign ? (
        // Generation Form
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Campaign Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Description *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="e.g., 'A 5-step email sequence to invite CFOs in the insurance industry to schedule a demo of our automated payment reconciliation platform. Include follow-ups and RSVP tracking.'"
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Be specific! Describe your goal, target audience, and key messages.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Persona *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={targetPersona}
                    onChange={(e) => setTargetPersona(e.target.value)}
                  >
                    {PERSONA_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    AI will tailor messaging to this persona's pain points and goals
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience Details (Optional)
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Companies with 100+ employees, $50M-$500M revenue"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Goal (Optional)
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Schedule 20+ product demonstrations"
                    value={campaignGoal}
                    onChange={(e) => setCampaignGoal(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      {TONE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Steps
                    </label>
                    <input
                      type="range"
                      className="w-full"
                      min={2}
                      max={15}
                      value={numberOfSteps}
                      onChange={(e) => setNumberOfSteps(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>2 steps</span>
                      <span className="font-medium text-blue-600">{numberOfSteps}</span>
                      <span>15 steps</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landing Page Template (Optional)
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={landingPageTemplate}
                    onChange={(e) => setLandingPageTemplate(e.target.value)}
                  >
                    {LANDING_PAGE_TEMPLATES.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {landingPageTemplate === 'other' && (
                    <div className="mt-2">
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://paycile.com/your-landing-page"
                        value={customLandingPageUrl}
                        onChange={(e) => setCustomLandingPageUrl(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter any URL. You can generate the campaign now and update this later in the funnel editor.
                      </p>
                    </div>
                  )}
                  {landingPageTemplate !== 'none' && landingPageTemplate !== 'other' && (
                    <p className="text-xs text-gray-500 mt-1">
                      {LANDING_PAGE_TEMPLATES.find(t => t.value === landingPageTemplate)?.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Communication Channels *</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select channels for the AI to use in the campaign. The AI will automatically add waits, decisions, and workflow logic.
              </p>
              
              <div className="space-y-2">
                {AVAILABLE_CHANNELS.map((channel) => (
                  <label
                    key={channel.value}
                    className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedChannels.includes(channel.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes(channel.value)}
                      onChange={() => handleChannelToggle(channel.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        <span>{channel.icon}</span>
                        {channel.label}
                      </div>
                      <div className="text-sm text-gray-600">{channel.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-xs font-medium text-gray-700 mb-1">✨ AI Will Automatically Add:</div>
                <div className="text-xs text-gray-600">
                  • Strategic Wait times between touches<br/>
                  • Decision points for engagement-based routing<br/>
                  • Stage markers for campaign tracking<br/>
                  • Task reminders for manual follow-up
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                {isGenerating ? (
                  <div className="animate-spin text-3xl">⏳</div>
                ) : (
                  <span className="text-3xl">✨</span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">Ready to Build</h3>
              <p className="text-gray-600 mb-6">
                Configure your campaign on the left and click Generate to create your funnel
              </p>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !campaignDescription.trim()}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isGenerating || !campaignDescription.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-pulse">Generating Campaign...</span>
                  </>
                ) : (
                  <>✨ Generate Campaign</>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Generated Campaign View
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{generatedCampaign.name}</h2>
                <p className="text-gray-600 mt-1">{generatedCampaign.description}</p>
                <div className="flex gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    📅 {generatedCampaign.estimatedDuration}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    👥 {generatedCampaign.recommendedAudience}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    📊 {generatedCampaign.nodes.length} steps
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {senderEmails.length > 0 && (
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                    value={selectedSenderEmail}
                    onChange={(e) => setSelectedSenderEmail(e.target.value)}
                  >
                    {senderEmails.map((s) => (
                      <option key={s.email} value={s.email}>
                        {s.name && s.name !== s.email ? `${s.name} (${s.email})` : s.email}
                      </option>
                    ))}
                  </select>
                )}
                <button
                  onClick={() => setGeneratedCampaign(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ← Start Over
                </button>
                <button
                  onClick={handleSaveAsTemplate}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md"
                >
                  Save & Create Campaign
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Campaign Flow */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Campaign Flow</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {generatedCampaign.nodes.map((node, index) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedNodeId === node.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{node.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{node.type.replace('_', ' ')}</div>
                      </div>
                      {selectedNodeId === node.id && (
                        <div className="text-blue-600">→</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Preview & Refinement */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                {selectedNode ? selectedNode.name : 'Select a step to view content'}
              </h3>
              
              {selectedNode ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {/* Display content based on node type - check both nested and top-level formats */}
                  {(selectedNode.config.content?.subject || selectedNode.config.subject) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                        {selectedNode.config.content?.subject || selectedNode.config.subject}
                      </div>
                    </div>
                  )}
                  
                  {(selectedNode.config.content?.body || selectedNode.config.body) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Body</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
                        {selectedNode.config.content?.body || selectedNode.config.body}
                      </div>
                    </div>
                  )}
                  
                  {(selectedNode.config.content?.text || selectedNode.config.text) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {selectedNode.type === 'linkedin_message' ? 'LinkedIn Message' :
                         selectedNode.type === 'linkedin_post' ? 'LinkedIn Post' : 'SMS Text'}
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {selectedNode.config.content?.text || selectedNode.config.text}
                      </div>
                    </div>
                  )}
                  
                  {(selectedNode.config.tts?.custom_script || selectedNode.config.ttsScript) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Voicemail Script</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {selectedNode.config.tts?.custom_script || selectedNode.config.ttsScript}
                      </div>
                    </div>
                  )}

                  {selectedNode.config.waitDuration && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Wait Duration</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                        {selectedNode.config.waitDuration} {selectedNode.config.waitUnit}
                      </div>
                    </div>
                  )}

                  {selectedNode.config.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                        {selectedNode.config.description}
                      </div>
                    </div>
                  )}

                  {/* Refinement Section */}
                  <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ✨ Refine this content
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      rows={3}
                      placeholder="e.g., 'Make it more urgent', 'Add a deadline', 'Emphasize cost savings'..."
                      value={refinementRequest}
                      onChange={(e) => setRefinementRequest(e.target.value)}
                    />
                    <button
                      onClick={handleRefineContent}
                      disabled={isRefining || !refinementRequest.trim()}
                      className={`mt-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isRefining || !refinementRequest.trim()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md'
                      }`}
                    >
                      {isRefining ? '✨ Refining...' : '✨ Refine with AI'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-4xl mb-2">👈</div>
                  <p>Click on a step in the campaign flow to view and refine its content</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
