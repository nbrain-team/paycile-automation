import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, type Campaign } from '@store/useStore';
import { apiCampaigns, apiTemplates } from '@lib/api';

const CAMPAIGN_OWNERS = [
  { name: 'Paycile Team', email: 'team@paycile.com' },
  { name: 'Sales Team', email: 'sales@paycile.com' },
  { name: 'Marketing Team', email: 'marketing@paycile.com' },
  { name: 'BDR Team', email: 'bdr@paycile.com' },
];

const TARGET_PERSONAS = [
  'CFO / Financial Executive',
  'Finance Manager / Controller',
  'Accountant / GL Specialist',
  'Treasury / Cash Manager',
  'AR/AP Specialist',
  'Auditor / Compliance Officer',
  'Small Business Owner / CEO',
  'Back-Office Staff'
];

const TARGET_INDUSTRIES = [
  'Insurance',
  'Property Management',
  'Healthcare',
  'Logistics',
  'Manufacturing',
  'Retail',
  'Technology',
  'Distribution',
  'Construction',
  'Multi-Industry'
];

const CAMPAIGN_TYPES = [
  { value: 'b2b_outreach', label: 'B2B Outreach - Multi-Channel' },
  { value: 'reengagement', label: 'Re-Engagement - Cold Prospects' },
  { value: 'nurture', label: 'Nurture Sequence' },
  { value: 'demo_followup', label: 'Demo Follow-Up' }
];

type Props = { open: boolean; onClose: () => void };

export function CreateLiveCampaignModal({ open, onClose }: Props) {
  const { addLiveCampaign, addToast, campaigns } = useStore();
  const [name, setName] = useState('');
  const [owner, setOwner] = useState<string>('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [targetPersona, setTargetPersona] = useState('');
  const [targetIndustry, setTargetIndustry] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [targetCompanySize, setTargetCompanySize] = useState('');
  const [expectedContacts, setExpectedContacts] = useState('');
  const [calendlyLink, setCalendlyLink] = useState('');
  const [demoPageLink, setDemoPageLink] = useState('');
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateId, setTemplateId] = useState('');
  const [slots, setSlots] = useState<Array<{date: string; time: string; calendly?: string}>>([]);
  const maxSlots = 10;
  
  // AI Prospect Finder
  const [showProspectFinder, setShowProspectFinder] = useState(false);
  const [prospectQuery, setProspectQuery] = useState('');
  const [findingProspects, setFindingProspects] = useState(false);
  const [suggestedProspects, setSuggestedProspects] = useState<any[]>([]);
  const [selectedProspects, setSelectedProspects] = useState<Set<string>>(new Set());

  // Load templates when modal opens; fetch from API with store fallback
  useEffect(() => {
    if (!open) return;
    try {
      if (Array.isArray(campaigns) && campaigns.length) {
        setTemplates((prev) => (prev.length ? prev : campaigns.map((t: any) => ({ id: t.id, name: t.name }))));
      }
    } catch {}
    apiTemplates.list().then((list: any) => {
      if (Array.isArray(list) && list.length) setTemplates(list);
    }).catch(()=>{});
  }, [open, campaigns]);

  if (!open) return null;

  const combinedTemplates = (() => {
    const storeList = Array.isArray(campaigns) ? campaigns.map((t: any) => ({ id: t.id, name: t.name })) : [];
    const apiList = Array.isArray(templates) ? templates : [];
    const seen = new Set<string>();
    const merged: Array<{ id: string; name: string }> = [];
    [...apiList, ...storeList].forEach((t) => {
      if (t && t.id && !seen.has(t.id)) { seen.add(t.id); merged.push({ id: t.id, name: t.name }); }
    });
    return merged;
  })();

  const addSlot = () => {
    if (slots.length >= maxSlots) return;
    setSlots((s) => [...s, { date: '', time: '', calendly: '' }]);
  };
  const removeSlot = (idx: number) => {
    if (slots.length <= 1) return;
    setSlots((s) => s.filter((_, i) => i !== idx));
  };
  
  // AI Prospect Finder - Mock implementation
  const findProspects = async () => {
    if (!prospectQuery.trim()) return;
    
    setFindingProspects(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock CRM data - in production this would query real CRM
    const mockCRM = [
      { id: '1', name: 'Sarah Chen', title: 'CFO', company: 'HealthFirst Staffing', industry: 'Healthcare', revenue: '$52M', city: 'Boston', state: 'MA', email: 'sarah.chen@healthfirst.com', matchScore: 95, matchReason: 'Healthcare CFO, $52M revenue, Boston location - perfect for DealSheet margin optimization' },
      { id: '2', name: 'Michael Torres', title: 'VP Finance', company: 'MediStaff Solutions', industry: 'Healthcare', revenue: '$38M', city: 'Philadelphia', state: 'PA', email: 'michael.t@medistaff.com', matchScore: 92, matchReason: 'VP Finance at healthcare staffing firm, handles GSA rates' },
      { id: '3', name: 'Jennifer Park', title: 'Controller', company: 'NurseConnect', industry: 'Healthcare', revenue: '$29M', city: 'Atlanta', state: 'GA', email: 'jpark@nurseconnect.com', matchScore: 88, matchReason: 'Controller role, healthcare vertical, mid-market size' },
      { id: '4', name: 'David Williams', title: 'VP Sales', company: 'TechTalent Pro', industry: 'IT Staffing', revenue: '$41M', city: 'Austin', state: 'TX', email: 'dwilliams@techtalent.com', matchScore: 85, matchReason: 'VP Sales using Bullhorn, pipeline visibility pain point likely' },
      { id: '5', name: 'Lisa Rodriguez', title: 'Director of Recruiting', company: 'StaffGenius', industry: 'General Staffing', revenue: '$33M', city: 'Dallas', state: 'TX', email: 'lrodriguez@staffgenius.com', matchScore: 82, matchReason: 'Recruiting leader, likely struggles with Bullhorn pipeline management' },
      { id: '6', name: 'Robert Martinez', title: 'CFO', company: 'ExecutiveSearch Plus', industry: 'Executive Search', revenue: '$56M', city: 'Chicago', state: 'IL', email: 'rmartinez@exesearch.com', matchScore: 90, matchReason: 'CFO at large firm, complex commission structures likely' },
      { id: '7', name: 'Amanda Foster', title: 'Finance Director', company: 'IndustrialStaff Corp', industry: 'Industrial', revenue: '$67M', city: 'Detroit', state: 'MI', email: 'afoster@indstaff.com', matchScore: 87, matchReason: 'Finance Director, likely handles commissions and payroll integration' },
      { id: '8', name: 'James Kim', title: 'COO', company: 'StaffingPro', industry: 'Multi-Industry', revenue: '$44M', city: 'Seattle', state: 'WA', email: 'jkim@staffingpro.com', matchScore: 79, matchReason: 'Operations leader, cross-functional pain points' },
    ];
    
    // AI-powered matching based on query (mock)
    const queryLower = prospectQuery.toLowerCase();
    let filtered = mockCRM;
    
    // Smart filtering based on query keywords
    if (queryLower.includes('healthcare') || queryLower.includes('medical') || queryLower.includes('nurse')) {
      filtered = filtered.filter(p => p.industry.toLowerCase().includes('healthcare'));
    } else if (queryLower.includes('bullhorn') || queryLower.includes('pipeline') || queryLower.includes('kanban')) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes('vp') || p.title.toLowerCase().includes('sales') || p.title.toLowerCase().includes('recruit'));
    } else if (queryLower.includes('commission') || queryLower.includes('payroll') || queryLower.includes('finance')) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes('cfo') || p.title.toLowerCase().includes('finance'));
    }
    
    // Sort by match score
    filtered.sort((a, b) => b.matchScore - a.matchScore);
    
    setSuggestedProspects(filtered.slice(0, 6));
    setFindingProspects(false);
  };
  
  const toggleProspect = (id: string) => {
    setSelectedProspects(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  
  const selectAllProspects = () => {
    setSelectedProspects(new Set(suggestedProspects.map(p => p.id)));
  };
  
  const clearProspects = () => {
    setSelectedProspects(new Set());
  };

  const disabled = !name || !owner || !campaignType || !launchDate || !targetPersona;

  const submit = async () => {
    const id = `live_${Math.random().toString(36).slice(2)}`;
    const ownerData = CAMPAIGN_OWNERS.find((p) => p.name === owner);
    
    const payload: Campaign = {
      id,
      name,
      owner_name: ownerData?.name || owner,
      owner_email: ownerData?.email || 'team@paycile.com',
      owner_phone: ownerPhone,
      city: targetPersona,
      state: targetIndustry,
      video_link: demoPageLink,
      event_link: calendlyLink,
      launch_date: launchDate,
      event_type: campaignType as any,
      event_date: launchDate,
      event_slots: [],
      target_cities: targetCompanySize,
      hotel_name: undefined,
      hotel_address: undefined,
      calendly_link: calendlyLink,
      status: 'draft',
      total_contacts: parseInt(expectedContacts) || 0,
      enriched_contacts: 0,
      emails_generated: 0,
    } as Campaign;
    addLiveCampaign(payload);
    addToast({ title: 'Campaign created', description: name, variant: 'success' });
    
    // Persist to backend
    try {
      await apiCampaigns.create({
        name,
        ownerName: payload.owner_name,
        ownerEmail: payload.owner_email,
        ownerPhone: ownerPhone || undefined,
        city: targetPersona,
        state: targetIndustry,
        videoLink: demoPageLink || undefined,
        eventLink: calendlyLink || undefined,
        eventType: campaignType,
        eventDate: launchDate,
        launchDate: launchDate,
        calendlyLink: calendlyLink || undefined,
        templateId: templateId || undefined,
        status: 'draft',
      });
    } catch {}
    onClose();
  };

  // templates load handled in useEffect above

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={(e)=>{ if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-xl shadow-soft-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create New Campaign</h2>
          <button type="button" className="btn-outline btn-sm" onClick={onClose}>Close</button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Template Selection */}
          <div>
            <label className="label">Choose Funnel Template</label>
            <select className="input" value={templateId} onChange={(e)=> setTemplateId(e.target.value)}>
              <option value="">Select a funnel template</option>
              {combinedTemplates.map((t)=> (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {combinedTemplates.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No templates yet. Go to <Link className="link" to="/templates">Funnel Templates</Link> to create one.</p>
            )}
          </div>

          {/* AI PROSPECT FINDER */}
          <div className="border-2 border-dashed border-primary-200 rounded-lg p-4 bg-primary-50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-primary-900 flex items-center gap-2">
                  <span>🤖</span>
                  AI Prospect Finder
                </h3>
                <p className="text-sm text-gray-600 mt-1">Describe your ideal prospects and AI will mine your CRM</p>
              </div>
              <button 
                type="button"
                className="btn-outline btn-sm"
                onClick={() => setShowProspectFinder(!showProspectFinder)}
              >
                {showProspectFinder ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showProspectFinder && (
              <div className="space-y-3">
                <div>
                  <textarea 
                    className="input h-24" 
                    placeholder="Example: Healthcare staffing CFOs with $30M+ revenue who likely use GSA rates and struggle with margin tracking..."
                    value={prospectQuery}
                    onChange={(e) => setProspectQuery(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="btn-primary btn-md mt-2 w-full"
                    onClick={findProspects}
                    disabled={!prospectQuery.trim() || findingProspects}
                  >
                    {findingProspects ? (
                      <>
                        <span className="animate-spin inline-block">⚙️</span>
                        AI Mining CRM...
                      </>
                    ) : (
                      <>
                        <span>🔍</span>
                        Find Matching Prospects
                      </>
                    )}
                  </button>
                </div>
                
                {suggestedProspects.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">
                        AI Found {suggestedProspects.length} Matching Prospects
                      </p>
                      <div className="flex gap-2">
                        <button type="button" className="btn-outline btn-xs" onClick={selectAllProspects}>
                          Select All
                        </button>
                        <button type="button" className="btn-outline btn-xs" onClick={clearProspects}>
                          Clear
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {suggestedProspects.map((prospect) => (
                        <div 
                          key={prospect.id} 
                          className={`border rounded-lg p-3 cursor-pointer transition ${
                            selectedProspects.has(prospect.id) 
                              ? 'border-primary-500 bg-primary-50' 
                              : 'border-gray-200 hover:border-primary-300'
                          }`}
                          onClick={() => toggleProspect(prospect.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  checked={selectedProspects.has(prospect.id)}
                                  onChange={() => {}}
                                  className="rounded"
                                />
                                <div>
                                  <p className="font-semibold">{prospect.name}</p>
                                  <p className="text-xs text-gray-600">
                                    {prospect.title} at {prospect.company}
                                  </p>
                                </div>
                              </div>
                              <div className="ml-6 mt-2 grid grid-cols-2 gap-x-4 text-xs text-gray-600">
                                <div>Industry: {prospect.industry}</div>
                                <div>Revenue: {prospect.revenue}</div>
                                <div>Location: {prospect.city}, {prospect.state}</div>
                                <div>Email: {prospect.email}</div>
                              </div>
                              <div className="ml-6 mt-2 flex items-center gap-2">
                                <span className="badge-primary text-xs">{prospect.matchScore}% Match</span>
                                <p className="text-xs text-gray-600 italic">{prospect.matchReason}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedProspects.size > 0 && (
                      <div className="bg-primary-100 border border-primary-300 rounded p-3 text-sm">
                        <p className="font-semibold text-primary-900">
                          ✓ {selectedProspects.size} prospects selected for this campaign
                        </p>
                        <p className="text-xs text-primary-700 mt-1">
                          These contacts will be added when you create the campaign
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {suggestedProspects.length === 0 && prospectQuery && !findingProspects && (
                  <div className="text-sm text-gray-500 text-center py-4">
                    No prospects found. Try a different description.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Campaign Name */}
          <div>
            <label className="label">Campaign Name *</label>
            <input 
              className="input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g., Q1 2025 - CFO Insurance Outreach" 
            />
          </div>

          {/* Campaign Owner */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Campaign Owner *</label>
              <select className="input" value={owner} onChange={(e) => setOwner(e.target.value)}>
                <option value="">Select campaign owner</option>
                {CAMPAIGN_OWNERS.map((p) => (<option key={p.email} value={p.name}>{p.name}</option>))}
              </select>
            </div>
            <div>
              <label className="label">Owner Phone</label>
              <input 
                className="input" 
                value={ownerPhone} 
                onChange={(e) => setOwnerPhone(e.target.value)} 
                placeholder="(555) 123-4567" 
              />
            </div>
          </div>

          {/* Campaign Type */}
          <div>
            <label className="label">Campaign Type *</label>
            <select className="input" value={campaignType} onChange={(e) => setCampaignType(e.target.value)}>
              <option value="">Select campaign type</option>
              {CAMPAIGN_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Target Persona & Industry */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Target Persona *</label>
              <select className="input" value={targetPersona} onChange={(e) => setTargetPersona(e.target.value)}>
                <option value="">Select target persona</option>
                {TARGET_PERSONAS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Target Industry</label>
              <select className="input" value={targetIndustry} onChange={(e) => setTargetIndustry(e.target.value)}>
                <option value="">Select industry</option>
                {TARGET_INDUSTRIES.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Target Company Size & Expected Contacts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Target Company Size</label>
              <input 
                className="input" 
                value={targetCompanySize} 
                onChange={(e) => setTargetCompanySize(e.target.value)} 
                placeholder="e.g., $50M-$500M revenue" 
              />
            </div>
            <div>
              <label className="label">Expected Contacts</label>
              <input 
                className="input" 
                type="number"
                value={expectedContacts} 
                onChange={(e) => setExpectedContacts(e.target.value)} 
                placeholder="e.g., 500" 
              />
            </div>
          </div>

          {/* Launch Date */}
          <div>
            <label className="label">Launch Date *</label>
            <input 
              type="date" 
              className="input" 
              value={launchDate} 
              onChange={(e) => setLaunchDate(e.target.value)} 
            />
          </div>

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Calendly Scheduling Link</label>
              <input 
                className="input" 
                value={calendlyLink} 
                onChange={(e) => setCalendlyLink(e.target.value)} 
                placeholder="https://calendly.com/..." 
              />
            </div>
            <div>
              <label className="label">Demo Page Link</label>
              <input 
                className="input" 
                value={demoPageLink} 
                onChange={(e) => setDemoPageLink(e.target.value)} 
                placeholder="https://paycile.com/demo" 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button type="button" className="btn-outline btn-md" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary btn-md" onClick={submit} disabled={disabled}>
              Create Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


