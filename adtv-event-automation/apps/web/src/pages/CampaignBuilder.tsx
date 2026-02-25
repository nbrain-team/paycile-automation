import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@store/useStore';
import Papa from 'papaparse';
import { seedCampaigns } from '@seed/campaignSeed';
import { apiCampaigns, apiInbox, apiEmail, apiSms, apiTemplates, apiPersonalization, getApiUrl } from '@lib/api';

const ALL_TABS = ['Overview','Contacts','Funnel','Personalized Emails','Analytics','Map View'] as const;
type TabName = (typeof ALL_TABS)[number];

const CONTACT_STATUSES = ['No Activity','Needs BDR','Received RSVP','Showed Up To Event','Post Event #1','Post Event #2','Post Event #3','Received Agreement','Signed Agreement'] as const;

export function CampaignBuilder() {
  const params = useParams();
  const navigate = useNavigate();
  const { liveCampaigns, contactsByCampaignId, setContactsForCampaign, addToast, campaigns, updateLiveCampaign, upsertCampaign } = useStore();
  const campaign = useMemo(() => liveCampaigns.find((c) => c.id === params.id), [liveCampaigns, params.id]);
  const [tab, setTab] = useState<TabName>('Overview');
  const [serverTemplates, setServerTemplates] = useState<Array<{ id: string; name: string }>>([]);
  const [templateVersions, setTemplateVersions] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [showVersionSelector, setShowVersionSelector] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string | undefined>(undefined);

  // AI Personalization state
  const [aiPersonalization, setAiPersonalization] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState<{ total: number; completed: number; failed: number; running: boolean } | null>(null);
  const [personalizedEmails, setPersonalizedEmails] = useState<any[]>([]);
  const [peLoaded, setPeLoaded] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        const list = await apiTemplates.list();
        const mapped = (Array.isArray(list) ? list : []).map((t: any) => ({ id: t.id, name: t.name }));
        setServerTemplates(mapped);
      } catch {}
    })();
  }, []);
  
  // Load versions when template changes
  useEffect(() => {
    (async () => {
      if (!campaign?.template_id) return;
      try {
        const versions = await apiTemplates.listVersions(campaign.template_id);
        setTemplateVersions(Array.isArray(versions) ? versions : []);
      } catch {
        setTemplateVersions([]);
      }
    })();
  }, [campaign?.template_id]);
  
  // Load AI personalization state from server campaign data
  useEffect(() => {
    if (!params.id) return;
    // Fetch from campaigns list since there's no single-campaign GET endpoint
    fetch(`${getApiUrl()}/api/campaigns`)
      .then(r => r.json())
      .then((list: any[]) => {
        const c = (Array.isArray(list) ? list : []).find((x: any) => x.id === params.id);
        if (c && typeof c.aiPersonalization === 'boolean') setAiPersonalization(c.aiPersonalization);
      })
      .catch(() => {});
  }, [params.id]);

  // Load personalized emails when tab shown or after generation
  useEffect(() => {
    if (!params.id || !aiPersonalization) return;
    apiPersonalization.list(params.id).then((list: any[]) => {
      setPersonalizedEmails(Array.isArray(list) ? list : []);
      setPeLoaded(true);
    }).catch(() => setPeLoaded(true));
  }, [params.id, aiPersonalization, generating]);

  // Determine visible tabs (show "Personalized Emails" only when AI is on and emails exist)
  const tabs = ALL_TABS.filter(t => {
    if (t === 'Personalized Emails') return aiPersonalization && personalizedEmails.length > 0;
    return true;
  });

  if (!campaign) return <div className="text-gray-500">Campaign not found.</div>;

  const contacts = contactsByCampaignId[campaign.id] || [];

  useEffect(() => {
    if (!campaign) return;
    // Always load from API to ensure we have latest contacts
    fetch(`${getApiUrl()}/api/campaigns/${campaign.id}/contacts`).then((r)=> r.json()).then((list)=> {
      if (Array.isArray(list) && list.length>0) {
        const mapped = list.map((c: any) => ({ id: c.id, name: c.name, company: c.company, email: c.email, phone: c.phone, city: c.city, state: c.state, url: c.url, status: c.status, stageId: c.stageKey, raw: c.rawJson?JSON.parse(c.rawJson):{} }));
        setContactsForCampaign(campaign.id, mapped as any);
      }
    }).catch(() => {});
  }, [campaign?.id]);

  // Derive stages from campaign graph when available
  const [stages, setStages] = useState<Array<{ id: string; name: string }>>([]);
  useEffect(() => {
    if (!campaign) return;
    apiCampaigns.graph(campaign.id).then((g) => {
      if (g?.nodes) setStages(g.nodes.map((n: any) => ({ id: n.id, name: n.name })));
    }).catch(()=>{});
  }, [campaign?.id]);

  const setStatus = async (status: any) => {
    updateLiveCampaign(campaign.id, { status });
    try { await apiCampaigns.patch(campaign.id, { status }); } catch {}
    addToast({ title: 'Campaign updated', description: `Status: ${status}`, variant: 'success' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <p className="text-sm text-gray-600">{campaign.owner_email || campaign.owner_name}</p>
        </div>
        <a className="btn-outline btn-sm" href="/campaigns">Back</a>
      </div>

      <div className="subtabs">
        {tabs.map((t) => (
          <button key={t} className={`subtab ${tab===t?'subtab-active':''}`} onClick={() => setTab(t as TabName)}>
            {t}
            {t === 'Personalized Emails' && personalizedEmails.length > 0 && (
              <span className="ml-1.5 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                {personalizedEmails.filter(pe => pe.status === 'approved' || pe.status === 'edited').length}/{personalizedEmails.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab==='Overview' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card md:col-span-2">
            <h2 className="text-lg font-semibold mb-3">Campaign Details</h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="md:col-span-2">
                <label className="label">Send From Email</label>
                <input className="input" defaultValue={campaign.owner_email} onBlur={(e)=> { updateLiveCampaign(campaign.id, { owner_email: e.target.value }); apiCampaigns.patch(campaign.id, { ownerEmail: e.target.value }).catch(()=>{}); }} />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input" defaultValue={campaign.owner_phone||''} onBlur={(e)=> updateLiveCampaign(campaign.id, { owner_phone: e.target.value })} />
              </div>
              <div>
                <label className="label">Launch Date</label>
                <input className="input" defaultValue={campaign.launch_date||''} onBlur={(e)=> { updateLiveCampaign(campaign.id, { launch_date: e.target.value }); apiCampaigns.patch(campaign.id, { launchDate: e.target.value }).catch(()=>{}); }} />
              </div>
              <div>
                <label className="label">Video Link</label>
                <input className="input" defaultValue={(campaign as any).video_link||''} onBlur={(e)=> { updateLiveCampaign(campaign.id, { videoLink: e.target.value }); apiCampaigns.patch(campaign.id, { videoLink: e.target.value }).catch(()=>{}); }} />
              </div>
              <div>
                <label className="label">Calendly / Scheduling Link</label>
                <input className="input" defaultValue={(campaign as any).event_link||''} onBlur={(e)=> { updateLiveCampaign(campaign.id, { eventLink: e.target.value }); apiCampaigns.patch(campaign.id, { eventLink: e.target.value }).catch(()=>{}); }} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Funnel Template</label>
                <div className="flex gap-2">
                  <select 
                    className="input flex-1" 
                    value={campaign.template_id||''} 
                    onChange={async (e)=> { 
                      const newTemplateId = e.target.value;
                      updateLiveCampaign(campaign.id, { template_id: newTemplateId });
                      setSelectedTemplateId(newTemplateId);
                      
                      // Load versions for this template
                      if (newTemplateId) {
                        try {
                          const versions = await apiTemplates.listVersions(newTemplateId);
                          setTemplateVersions(Array.isArray(versions) ? versions : []);
                        } catch {
                          setTemplateVersions([]);
                        }
                      } else {
                        setTemplateVersions([]);
                      }
                    }}
                  >
                    <option value="">None</option>
                    {serverTemplates.map((t)=> (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  {campaign.template_id && templateVersions.length > 0 && (
                    <button 
                      className="btn-outline btn-sm" 
                      onClick={() => setShowVersionSelector(true)}
                    >
                      Choose Version ({templateVersions.length})
                    </button>
                  )}
                  {campaign.template_id && (
                    <button 
                      className="btn-outline btn-sm"
                      onClick={async () => {
                        try {
                          // Create a new version automatically named after the campaign
                          const versionName = `${campaign.name} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
                          
                          // First, get the current template data
                          const template = await apiTemplates.get(campaign.template_id!);
                          const nodes = Array.isArray(template.nodes) 
                            ? template.nodes.map((n: any) => ({ 
                                id: n.key, 
                                type: n.type, 
                                name: n.name, 
                                config: n.configJson ? JSON.parse(n.configJson) : {},
                                pos: (n.posX != null && n.posY != null) ? { x: n.posX, y: n.posY } : undefined 
                              }))
                            : [];
                          const edges = Array.isArray(template.edges)
                            ? template.edges.map((e: any) => ({ 
                                from: e.fromKey, 
                                to: e.toKey, 
                                condition: e.conditionJson ? JSON.parse(e.conditionJson) : {} 
                              }))
                            : [];
                          
                          // Create the version
                          const version = await apiTemplates.createVersion(campaign.template_id!, {
                            versionName,
                            description: `Campaign-specific version for ${campaign.name}`,
                            campaignId: campaign.id,
                            nodes,
                            edges,
                          });
                          
                          addToast({ 
                            title: 'Version created', 
                            description: versionName, 
                            variant: 'success' 
                          });
                          
                          // Navigate to template builder with the version
                          navigate(`/templates/${campaign.template_id}?versionId=${version.id}`);
                        } catch (e: any) {
                          addToast({ 
                            title: 'Failed to create version', 
                            description: e.message, 
                            variant: 'error' 
                          });
                        }
                      }}
                    >
                      Edit Funnel
                    </button>
                  )}
                  <button className="btn-primary btn-sm" onClick={async ()=> {
                    try {
                      let effectiveTemplateId = campaign.template_id || '';
                      // If selected template is local-only (tpl_*), create it on the server first
                      if (effectiveTemplateId && /^tpl_/i.test(effectiveTemplateId)) {
                        const localTpl = (Array.isArray(campaigns) ? campaigns : []).find((t: any) => t && t.id === effectiveTemplateId);
                        if (localTpl && localTpl.graph && Array.isArray(localTpl.graph.nodes) && Array.isArray(localTpl.graph.edges)) {
                          const created = await apiTemplates.create(localTpl.name || 'Template', { nodes: localTpl.graph.nodes, edges: localTpl.graph.edges });
                          if (created && created.id) {
                            effectiveTemplateId = created.id;
                            // Update local store entries: selected campaign's template_id and campaigns list (replace tpl_* with server id)
                            updateLiveCampaign(campaign.id, { template_id: created.id });
                            try {
                              upsertCampaign({ ...localTpl, id: created.id });
                            } catch {}
                          }
                        }
                      }
                      // If a version is selected, use that version's nodes and edges
                      if (selectedVersionId) {
                        try {
                          const version = await apiTemplates.getVersion(effectiveTemplateId, selectedVersionId);
                          if (version) {
                            // Create a temporary version for this campaign if needed
                            const versionName = `${campaign.name} - ${new Date().toLocaleDateString()}`;
                            await apiTemplates.createVersion(effectiveTemplateId, {
                              versionName,
                              description: `Campaign-specific version based on ${version.versionName}`,
                              campaignId: campaign.id,
                              nodes: version.nodes,
                              edges: version.edges,
                            });
                          }
                        } catch {}
                      }
                      
                      await apiCampaigns.patch(campaign.id, { templateId: effectiveTemplateId, importGraph: true });
                      addToast({ title: 'Funnel saved', description: 'Template attached and graph imported', variant: 'success' });
                    } catch (e) {
                      addToast({ title: 'Failed to save funnel', description: String((e as any)?.message||'error'), variant: 'error' });
                    }
                  }}>Save</button>
                </div>
                {selectedVersionId && (
                  <p className="text-xs text-gray-600 mt-1">
                    Selected version: <span className="font-medium">
                      {templateVersions.find(v => v.id === selectedVersionId)?.versionName || selectedVersionId}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {/* Event slots and hotel fields removed - not applicable for outreach campaigns */}
          </div>
          <div className="card h-max">
            <h3 className="font-semibold mb-3">Campaign Controls</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="badge-primary text-xs">{campaign.status}</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {campaign.status !== 'active' && (
                  <button className="btn-primary btn-md" onClick={async ()=> {
                    // Warn if AI personalization is on but emails are not all approved
                    if (aiPersonalization && personalizedEmails.length > 0) {
                      const pendingCount = personalizedEmails.filter((pe: any) => pe.status === 'pending').length;
                      if (pendingCount > 0) {
                        const proceed = window.confirm(
                          `${pendingCount} personalized email(s) are still pending review. ` +
                          `Pending emails will fall back to the standard template. Continue?`
                        );
                        if (!proceed) return;
                      }
                    }
                    await setStatus('active');
                    try {
                      await fetch(`${getApiUrl()}/api/campaigns/${campaign.id}/execute`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
                      addToast({ title: 'Campaign activated', description: 'Funnel execution started', variant: 'success' });
                    } catch {}
                  }}>{campaign.status==='paused' ? 'Resume Campaign' : 'Send / Activate Campaign'}</button>
                )}
                {campaign.status === 'active' && (
                  <button className="btn-outline btn-md" onClick={()=> setStatus('paused')}>Pause Campaign</button>
                )}
                {campaign.status !== 'stopped' && (
                  <button className="btn-outline btn-md" onClick={()=> setStatus('stopped')}>Stop Campaign</button>
                )}
                {/* Removed SMS-only button; unified activation triggers combined executor */}
              </div>
              <p className="text-xs text-gray-500">Activation begins executing the attached funnel for all contacts on schedule. Pause will temporarily halt sends. Stop ends the campaign.</p>
            </div>

            {/* AI Personalization Section */}
            <div className="border-t pt-3 mt-3">
              <h4 className="font-semibold mb-2 text-sm">AI Email Personalization</h4>
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={aiPersonalization}
                  onChange={async (e) => {
                    const val = e.target.checked;
                    setAiPersonalization(val);
                    try {
                      await apiCampaigns.patch(campaign.id, { aiPersonalization: val });
                    } catch {}
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">Enable AI personalization</span>
              </label>
              {aiPersonalization && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">AI will personalize each email in your funnel for every contact, adding subtle touches based on their role, company, and industry while preserving your template's structure.</p>
                  {genProgress && genProgress.running ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Generating...</span>
                        <span>{genProgress.completed}/{genProgress.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${genProgress.total > 0 ? (genProgress.completed / genProgress.total) * 100 : 0}%` }}
                        />
                      </div>
                      {genProgress.failed > 0 && (
                        <p className="text-xs text-red-500">{genProgress.failed} failed</p>
                      )}
                    </div>
                  ) : (
                    <button
                      className="btn-primary btn-sm w-full"
                      disabled={generating}
                      onClick={async () => {
                        setGenerating(true);
                        setGenProgress(null);
                        try {
                          const result = await apiPersonalization.generate(campaign.id);
                          if (result.success) {
                            addToast({ title: 'Personalization started', description: `Processing ${result.total} email(s)...`, variant: 'success' });
                            // Poll for progress
                            const poll = setInterval(async () => {
                              try {
                                const status = await apiPersonalization.status(campaign.id);
                                setGenProgress(status);
                                if (!status.running) {
                                  clearInterval(poll);
                                  setGenerating(false);
                                  // Reload personalized emails
                                  const list = await apiPersonalization.list(campaign.id);
                                  setPersonalizedEmails(Array.isArray(list) ? list : []);
                                  addToast({ title: 'Personalization complete', description: `${status.completed} emails personalized`, variant: 'success' });
                                }
                              } catch {
                                clearInterval(poll);
                                setGenerating(false);
                              }
                            }, 2000);
                          }
                        } catch (err: any) {
                          addToast({ title: 'Generation failed', description: err?.message || 'Error', variant: 'error' });
                          setGenerating(false);
                        }
                      }}
                    >
                      {personalizedEmails.length > 0 ? 'Re-generate Personalized Emails' : 'Generate Personalized Emails'}
                    </button>
                  )}
                  {personalizedEmails.length > 0 && !generating && (
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <p>{personalizedEmails.length} personalized emails generated</p>
                      <p className="text-green-600">{personalizedEmails.filter((pe: any) => pe.status === 'approved' || pe.status === 'edited').length} approved</p>
                      <p className="text-amber-600">{personalizedEmails.filter((pe: any) => pe.status === 'pending').length} pending review</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab==='Contacts' && (
        <ContactsTab contacts={contacts} />
      )}

      {tab==='Funnel' && (
        <FunnelTab campaignId={campaign.id} campaignName={campaign.name} totalContacts={contacts.length} />
      )}

      {tab==='Personalized Emails' && (
        <PersonalizedEmailsTab
          campaignId={campaign.id}
          emails={personalizedEmails}
          onUpdate={async () => {
            const list = await apiPersonalization.list(campaign.id);
            setPersonalizedEmails(Array.isArray(list) ? list : []);
          }}
        />
      )}

      {tab==='Analytics' && (
        <div className="card">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="card"><p className="font-semibold">Enrichment %</p><p className="text-3xl mt-2">62%</p></div>
            <div className="card"><p className="font-semibold">Email Generation %</p><p className="text-3xl mt-2">78%</p></div>
            <div className="card"><p className="font-semibold">Data Capture (Email/Phone)</p><p className="text-3xl mt-2">71% / 54%</p></div>
          </div>
        </div>
      )}

      {tab==='Map View' && (
        <div className="card text-sm text-gray-500">Map mock placeholder. Clustered markers, hotel marker when applicable.</div>
      )}
      
      {showVersionSelector && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 space-y-4 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Template Version</h3>
              <button className="btn-outline btn-sm" onClick={() => setShowVersionSelector(false)}>Close</button>
            </div>
            
            <div className="space-y-2">
              <button
                className={`w-full text-left p-4 border rounded hover:bg-gray-50 ${!selectedVersionId ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => {
                  setSelectedVersionId(undefined);
                  setShowVersionSelector(false);
                }}
              >
                <h4 className="font-semibold">Base Template (Latest)</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Use the original template without any campaign-specific modifications
                </p>
              </button>
              
              {templateVersions.map((v) => (
                <button
                  key={v.id}
                  className={`w-full text-left p-4 border rounded hover:bg-gray-50 ${selectedVersionId === v.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => {
                    setSelectedVersionId(v.id);
                    setShowVersionSelector(false);
                    addToast({ title: 'Version selected', description: v.versionName, variant: 'success' });
                  }}
                >
                  <h4 className="font-semibold">{v.versionName}</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {v.description} · {v.nodesCount} nodes, {v.edgesCount} edges
                  </p>
                  {v.campaign && (
                    <p className="text-xs text-gray-500 mt-1">
                      Previously used in: <span className="font-medium">{v.campaign.name}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {new Date(v.createdAt).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
            
            {templateVersions.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                No versions available for this template. Load the template and make changes to create a version.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type ContactsTabProps = { contacts: ReturnType<typeof useStore.getState>['contactsByCampaignId'][string] };

function ContactsTab({ contacts }: ContactsTabProps) {
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | typeof CONTACT_STATUSES[number]>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { addToast, liveCampaigns, setContactsForCampaign, contactsByCampaignId } = useStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showSms, setShowSms] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [smsText, setSmsText] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [showImportFromCampaign, setShowImportFromCampaign] = useState(false);
  const [sourceCampaignId, setSourceCampaignId] = useState('');
  const [availableCampaigns, setAvailableCampaigns] = useState<any[]>([]);
  const [syncToHubSpot, setSyncToHubSpot] = useState(true);
  const [hubSpotSyncing, setHubSpotSyncing] = useState(false);
  
  // Load all campaigns when import modal opens
  useEffect(() => {
    if (showImportFromCampaign) {
      fetch(`${getApiUrl()}/api/campaigns`)
        .then(r => r.json())
        .then(campaigns => {
          setAvailableCampaigns(Array.isArray(campaigns) ? campaigns : []);
        })
        .catch(() => setAvailableCampaigns([]));
    }
  }, [showImportFromCampaign]);
  const params = useParams();
  const campaignId = params.id as string;
  const [stagesLocal, setStagesLocal] = useState<Array<{ id: string; name: string }>>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [editContactId, setEditContactId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({ name: '', email: '', phone: '', company: '', city: '', state: '', url: '', status: 'No Activity', stageId: '' });
  const buildRawFromForm = () => {
    const name = `${firstName} ${lastName}`.trim();
    const raw: Record<string, any> = {
      timestamp: '',
      url: website || '',
      city: '',
      state: '',
      name,
      Email: email || '',
      Phone: phone || '',
      company: '',
      closed_sales: '',
      total_value: '',
      price_range: '',
      agent_website: website || '',
      facebook_profile: facebook || '',
      col_1yr_seller_total_deals: '',
      col_1yr_seller_total_value: '',
      col_1yr_seller_price_range: '',
      col_1y_buyer_total_deals: '',
      col_1y_buyer_total_value: '',
      col_1y_buyer_price_range: '',
      col_1y_buyer_avg_sale_price: '',
      neighborhood_1: '',
      neighborhood_2: '',
      neighborhood_3: '',
      neighborhood_4: '',
      neighborhood_5: '',
      neighborhood_6: '',
      error: '',
    };
    return raw;
  };
  useEffect(() => {
    // derive stages locally for modal default
    (async () => {
      try {
        const g = await apiCampaigns.graph(campaignId);
        if (g?.nodes) setStagesLocal(g.nodes.map((n: any) => ({ id: n.id, name: n.name })));
      } catch {}
    })();
  }, [campaignId]);

  const STATUS_CLASS: Record<typeof CONTACT_STATUSES[number], string> = {
    'No Activity': 'bg-gray-100 text-gray-700 border-gray-200',
    'Needs BDR': 'bg-amber-100 text-amber-800 border-amber-200',
    'Received RSVP': 'bg-blue-100 text-blue-800 border-blue-200',
    'Showed Up To Event': 'bg-green-100 text-green-800 border-green-200',
    'Post Event #1': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Post Event #2': 'bg-purple-100 text-purple-800 border-purple-200',
    'Post Event #3': 'bg-pink-100 text-pink-800 border-pink-200',
    'Received Agreement': 'bg-teal-100 text-teal-800 border-teal-200',
    'Signed Agreement': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return contacts.filter((c) =>
      [c.name, c.company, c.email, c.phone, c.city, c.state, (c as any).stageId].some((v) => (v || '').toLowerCase().includes(q)) &&
      (selectedStatus === 'All' || c.status === selectedStatus)
    );
  }, [contacts, query, selectedStatus]);

  const allChecked = filtered.length>0 && filtered.every((c)=> selectedIds.has(c.id));
  const someChecked = filtered.some((c)=> selectedIds.has(c.id));
  const toggleAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allChecked) { filtered.forEach((c)=> next.delete(c.id)); } else { filtered.forEach((c)=> next.add(c.id)); }
      return next;
    });
  };
  const toggleOne = (id: string) => setSelectedIds((prev)=> { const next = new Set(prev); next.has(id)?next.delete(id):next.add(id); return next; });

  const openSms = () => { if (selectedIds.size===0) return; setSmsText(''); setShowSms(true); };
  const openEmail = () => { if (selectedIds.size===0) return; setEmailSubject(''); setEmailBody(''); setShowEmail(true); };
  
  const importFromCampaign = async () => {
    if (!sourceCampaignId) {
      addToast({ title: 'Select a campaign', description: 'Please select a source campaign', variant: 'error' });
      return;
    }
    
    try {
      const currentCampaignId = window.location.pathname.split('/').pop() || '';
      
      // Fetch contacts from source campaign
      const response = await fetch(`${getApiUrl()}/api/campaigns/${sourceCampaignId}/contacts`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      
      const sourceContacts = await response.json();
      
      if (!Array.isArray(sourceContacts) || sourceContacts.length === 0) {
        addToast({ title: 'No contacts', description: 'Source campaign has no contacts', variant: 'error' });
        return;
      }
      
      // Copy contacts to current campaign
      const copyResponse = await fetch(`${getApiUrl()}/api/campaigns/${currentCampaignId}/contacts/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contacts: sourceContacts.map((c: any) => ({
            name: c.name,
            company: c.company,
            email: c.email,
            phone: c.phone,
            city: c.city,
            state: c.state,
            url: c.url,
            status: 'No Activity',
            stageId: null,
            raw: null
          })),
          syncToHubSpot,
        })
      });
      
      if (!copyResponse.ok) throw new Error('Failed to copy contacts');
      
      const result = await copyResponse.json();
      
      // Reload contacts
      const reloadResponse = await fetch(`${getApiUrl()}/api/campaigns/${currentCampaignId}/contacts`);
      const reloadedContacts = await reloadResponse.json();
      const mapped = reloadedContacts.map((c: any) => ({ 
        id: c.id, name: c.name, company: c.company, email: c.email, phone: c.phone, 
        city: c.city, state: c.state, url: c.url, status: c.status, stageId: c.stageKey, 
        raw: c.rawJson ? JSON.parse(c.rawJson) : {} 
      }));
      setContactsForCampaign(currentCampaignId, mapped as any);
      
      addToast({ 
        title: 'Contacts imported', 
        description: `${sourceContacts.length} contacts copied from source campaign`, 
        variant: 'success' 
      });
      
      if (syncToHubSpot && result.hubspot) {
        const hs = result.hubspot;
        if (hs.failed > 0) {
          addToast({ title: 'HubSpot sync partial', description: `${hs.created} created, ${hs.updated} updated, ${hs.failed} failed`, variant: 'warning' });
        } else {
          addToast({ title: 'HubSpot synced', description: `${hs.created} created, ${hs.updated} updated as non-marketing contacts`, variant: 'success' });
        }
      }
      
      setShowImportFromCampaign(false);
      setSourceCampaignId('');
      
    } catch (error: any) {
      addToast({ title: 'Import failed', description: error.message, variant: 'error' });
    }
  };
  
  const bulkDelete = async () => {
    if (selectedIds.size===0) return;
    const confirm = window.confirm(`Delete ${selectedIds.size} selected contact(s)?`);
    if (!confirm) return;
    const cid = window.location.pathname.split('/').pop() || '';
    const remaining = contacts.filter((c)=> !selectedIds.has(c.id));
    setContactsForCampaign(cid, remaining as any);
    try {
      await fetch(`${getApiUrl()}/api/campaigns/${cid}/contacts/bulk-delete`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: Array.from(selectedIds) })
      });
    } catch {}
    setSelectedIds(new Set());
    addToast({ title: 'Contacts deleted', description: `${contacts.length - remaining.length} removed`, variant: 'success' });
  };

  const sendBulkSms = async () => {
    const ids = Array.from(selectedIds);
    await Promise.all(ids.map(async (id) => {
      const c = contacts.find((x)=> x.id===id);
      if (!c || !c.phone) return;
      try { await apiSms.send({ to: c.phone, text: smsText, contactId: c.id }); }
      catch { try { await apiInbox.sendMessage({ contactId: c.id, text: smsText, direction: 'out' }); } catch {} }
    }));
    setShowSms(false);
    addToast({ title: 'SMS sent', description: `${selectedIds.size} selected`, variant: 'success' });
  };

  const sendBulkEmail = async () => {
    const ids = Array.from(selectedIds);
    await Promise.all(ids.map(async (id) => {
      const c = contacts.find((x)=> x.id===id);
      if (!c || !c.email) return;
      try { await apiEmail.send({ to: c.email, subject: emailSubject, body: emailBody, contactId: c.id }); } catch {}
    }));
    setShowEmail(false);
    addToast({ title: 'Email queued', description: `${selectedIds.size} selected`, variant: 'success' });
  };

  return (
    <>
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <input className="input w-64" placeholder="Search contacts" value={query} onChange={(e)=> setQuery(e.target.value)} />
          <select className="input w-60" value={selectedStatus} onChange={(e)=> setSelectedStatus(e.target.value as any)}>
            <option value="All">All Statuses</option>
            {CONTACT_STATUSES.map((s)=> (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <label className="btn-outline btn-sm cursor-pointer text-center">
            <input type="file" accept=".csv" className="hidden" onChange={(ev)=> {
              const file = ev.target.files?.[0]; if (!file) return;
              const reader = new FileReader();
              reader.onload = async () => {
                const text = String(reader.result || '');
                const parsed = Papa.parse(text, { header: true });
                const rows = (parsed.data as any[]).filter(Boolean);
                const cid = window.location.pathname.split('/').pop() || '';
                const mapped = rows.map((r) => ({
                  id: Math.random().toString(36).slice(2),
                  name: (r.firstName || r['First Name'] || r.Name || r.name || '') + ' ' + (r.lastName || r['Last Name'] || ''),
                  company: r.company || r.Company || '',
                  email: r.Email || r.email || '',
                  phone: r.Phone || r.phone || '',
                  city: r.city || r.City || '',
                  state: r.state || r.State || '',
                  url: r.url,
                  status: 'No Activity' as const,
                  stageId: '',
                  raw: r,
                })).slice(0, 1000);
                setContactsForCampaign(cid, mapped as any);
                try {
                  const res = await fetch(`${getApiUrl()}/api/campaigns/${cid}/contacts/bulk`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contacts: mapped, syncToHubSpot }),
                  });
                  const result = await res.json();
                  addToast({ title: 'Contacts imported', description: `${mapped.length} records`, variant: 'success' });
                  if (syncToHubSpot && result.hubspot) {
                    const hs = result.hubspot;
                    if (hs.failed > 0) {
                      addToast({ title: 'HubSpot sync partial', description: `${hs.created} created, ${hs.updated} updated, ${hs.failed} failed (non-marketing)`, variant: 'warning' });
                    } else {
                      addToast({ title: 'HubSpot synced', description: `${hs.created} created, ${hs.updated} updated as non-marketing contacts`, variant: 'success' });
                    }
                  }
                } catch {
                  addToast({ title: 'Contacts imported', description: `${mapped.length} records (HubSpot sync may have failed)`, variant: 'success' });
                }
              };
              reader.readAsText(file);
            }} />
            📤 Import CSV
          </label>
          <button className="btn-outline btn-sm" onClick={() => setShowImportFromCampaign(true)}>
            📋 Copy from Campaign
          </button>
          <button className="btn-outline btn-sm" onClick={()=> {
            const cid = window.location.pathname.split('/').pop() || '';
            const list = (contactsByCampaignId as any)[cid] || [];
            const csv = ['First Name,Last Name,Company,Email,Phone,City,State,Status,StageId', ...list.map((c:any)=> {
              const parts = String(c.name||'').trim().split(/\s+/); const first = parts.shift()||''; const last = parts.join(' ');
              return [first,last,c.company,c.email,c.phone,c.city,c.state,c.status,c.stageId||''].map((v:string)=>`"${String(v??'').replace(/"/g,'\"')}"`).join(',');
            })].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = `contacts_${cid}.csv`; a.click(); URL.revokeObjectURL(url);
          }}>📥 Export CSV</button>
          <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none" title="Sync imported contacts to HubSpot as non-marketing contacts">
            <input
              type="checkbox"
              checked={syncToHubSpot}
              onChange={(e) => setSyncToHubSpot(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 h-3.5 w-3.5"
            />
            <span className="text-gray-600 whitespace-nowrap">HubSpot Sync</span>
          </label>
          <button className="btn-outline btn-sm" onClick={openSms} disabled={selectedIds.size===0}>Create SMS</button>
          <button className="btn-outline btn-sm" onClick={openEmail} disabled={selectedIds.size===0}>Create Email</button>
          <button className="btn-outline btn-sm" onClick={bulkDelete} disabled={selectedIds.size===0}>Delete Selected</button>
          <button className="btn-primary btn-sm" onClick={()=> setShowAddContact(true)}>Add Contact</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="py-2 w-10">
                <input type="checkbox" checked={allChecked} ref={(el)=> { if (el) el.indeterminate = !allChecked && someChecked; }} onChange={toggleAll} />
              </th>
              <th className="py-2">First Name</th>
              <th className="py-2">Last Name</th>
              <th className="py-2">Company</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">City</th>
              <th className="py-2">Status</th>
              <th className="py-2">Stage</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <React.Fragment key={c.id}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={()=> setExpandedId(expandedId===c.id?null:c.id)}>
                  <td className="py-2" onClick={(e)=> e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.has(c.id)} onChange={()=> toggleOne(c.id)} />
                  </td>
                  <td className="py-2 font-medium">{(() => { const p=(c.name||'').trim().split(/\s+/); return p.shift()||''; })()}</td>
                  <td className="py-2">{(() => { const p=(c.name||'').trim().split(/\s+/); p.shift(); return p.join(' '); })()}</td>
                  <td className="py-2">{c.company}</td>
                  <td className="py-2">{c.email}</td>
                  <td className="py-2">{c.phone}</td>
                  <td className="py-2">{c.city}</td>
                  <td className="py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${STATUS_CLASS[c.status as keyof typeof STATUS_CLASS]}`}>{c.status}</span>
                  </td>
                  <td className="py-2 text-xs flex items-center gap-2" onClick={(e)=> e.stopPropagation()}>
                    <span>{(c as any).stageId || '-'}</span>
                    <button className="btn-outline btn-xs" onClick={()=> { setEditContactId(c.id); setEditForm({ firstName: ((c.name||'').trim().split(/\s+/)[0]||''), lastName: (()=>{ const p=(c.name||'').trim().split(/\s+/); p.shift(); return p.join(' '); })(), email: c.email||'', phone: c.phone||'', company: c.company||'', city: c.city||'', state: c.state||'', url: c.url||'', status: c.status, stageId: (c as any).stageId||'' }); }}>Edit</button>
                  </td>
                </tr>
                {expandedId===c.id && (
                  <tr className="bg-gray-50/50">
                    <td colSpan={8} className="py-3">
                      <div className="grid md:grid-cols-3 gap-3 text-xs">
                        {Object.entries(c.raw).map(([k, v]) => {
                          const label = String(k).replace(/_/g,' ').replace(/\s+/g,' ').replace(/\b\w/g, (m) => m.toUpperCase());
                          return (
                            <div key={k}><span className="font-semibold text-black">{label}:</span> <span className="text-black font-normal">{String(v ?? '')}</span></div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    {showSms && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create SMS ({selectedIds.size} selected)</h3>
            <button className="btn-outline btn-sm" onClick={()=> setShowSms(false)}>Close</button>
          </div>
          <textarea className="input h-40" placeholder="Write your text message…" value={smsText} onChange={(e)=> setSmsText(e.target.value)} />
          <div className="flex items-center justify-end gap-2">
            <button className="btn-outline btn-sm" onClick={()=> setShowSms(false)}>Cancel</button>
            <button className="btn-primary btn-sm" disabled={!smsText.trim()} onClick={sendBulkSms}>Send SMS</button>
          </div>
        </div>
      </div>
    )}

    {showEmail && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create Email ({selectedIds.size} selected)</h3>
            <button className="btn-outline btn-sm" onClick={()=> setShowEmail(false)}>Close</button>
          </div>
          <input className="input" placeholder="Subject" value={emailSubject} onChange={(e)=> setEmailSubject(e.target.value)} />
          <textarea className="input h-48" placeholder="Email body…" value={emailBody} onChange={(e)=> setEmailBody(e.target.value)} />
          <div className="flex items-center justify-end gap-2">
            <button className="btn-outline btn-sm" onClick={()=> setShowEmail(false)}>Cancel</button>
            <button className="btn-primary btn-sm" disabled={!emailSubject.trim() && !emailBody.trim()} onClick={sendBulkEmail}>Send Email</button>
          </div>
        </div>
      </div>
    )}

    {showImportFromCampaign && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Copy Contacts from Campaign</h3>
            <button className="btn-outline btn-sm" onClick={() => { setShowImportFromCampaign(false); setSourceCampaignId(''); }}>Close</button>
          </div>
          
          <p className="text-sm text-gray-600">
            Select a source campaign to copy all contacts from. This will add contacts to the current campaign without removing existing ones.
          </p>
          
          <div>
            <label className="label">Source Campaign</label>
            <select 
              className="input" 
              value={sourceCampaignId} 
              onChange={(e) => setSourceCampaignId(e.target.value)}
            >
              <option value="">Select a source campaign...</option>
              {availableCampaigns
                .filter(c => c.id !== window.location.pathname.split('/').pop())
                .sort((a, b) => {
                  // Show archived (contact lists) first, then others
                  if (a.status === 'archived' && b.status !== 'archived') return -1;
                  if (a.status !== 'archived' && b.status === 'archived') return 1;
                  return a.name.localeCompare(b.name);
                })
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {c.status === 'archived' ? '📋 ' : ''}{c.name} ({c.totalContacts || c.contacts?.length || 0} contacts)
                  </option>
                ))}
            </select>
            {availableCampaigns.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">Loading campaigns...</p>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none py-1">
            <input
              type="checkbox"
              checked={syncToHubSpot}
              onChange={(e) => setSyncToHubSpot(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 h-4 w-4"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Sync to HubSpot</span>
              <p className="text-xs text-gray-500">Contacts will be added as non-marketing contacts (no billing impact)</p>
            </div>
          </label>
          
          <div className="flex gap-2 justify-end">
            <button 
              className="btn-outline btn-sm" 
              onClick={() => { setShowImportFromCampaign(false); setSourceCampaignId(''); }}
            >
              Cancel
            </button>
            <button 
              className="btn-primary btn-sm" 
              onClick={importFromCampaign}
              disabled={!sourceCampaignId}
            >
              Import Contacts
            </button>
          </div>
        </div>
      </div>
    )}

    {editContactId && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50" onClick={(e)=>{ if (e.target===e.currentTarget) setEditContactId(null); }}>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Edit Contact</h3>
            <button className="btn-outline btn-sm" onClick={()=> setEditContactId(null)}>Close</button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="label">First Name</label>
              <input className="input" value={editForm.firstName||''} onChange={(e)=> setEditForm((f:any)=> ({ ...f, firstName: e.target.value }))} />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input className="input" value={editForm.lastName||''} onChange={(e)=> setEditForm((f:any)=> ({ ...f, lastName: e.target.value }))} />
            </div>
            {['email','phone','company','city','state','url'].map((k)=> (
              <div key={k} className={k==='url'?'md:col-span-2':''}>
                <label className="label">{k.replace(/_/g,' ').replace(/\b\w/g, (m)=> m.toUpperCase())}</label>
                <input className="input" value={editForm[k]||''} onChange={(e)=> setEditForm((f:any)=> ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
            <div>
              <label className="label">Status</label>
              <select className="input" value={editForm.status} onChange={(e)=> setEditForm((f:any)=> ({ ...f, status: e.target.value }))}>
                {(CONTACT_STATUSES as any).map((s: string)=> (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="label">Stage</label>
              <input className="input" value={editForm.stageId||''} onChange={(e)=> setEditForm((f:any)=> ({ ...f, stageId: e.target.value }))} />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="btn-outline btn-sm" onClick={()=> setEditContactId(null)}>Cancel</button>
            <button className="btn-primary btn-sm" onClick={async ()=> {
              try {
                await fetch(`${getApiUrl()}/api/contacts/${editContactId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) });
              } catch {}
              const updated = (contactsByCampaignId as any)[campaignId]?.map((c:any)=> c.id===editContactId ? { ...c, name: `${editForm.firstName||''} ${editForm.lastName||''}`.trim(), email: editForm.email, phone: editForm.phone, company: editForm.company, city: editForm.city, state: editForm.state, url: editForm.url, status: editForm.status, stageId: editForm.stageId } : c) || [];
              setContactsForCampaign(campaignId, updated);
              setEditContactId(null);
              addToast({ title: 'Contact updated', description: `${editForm.firstName||''} ${editForm.lastName||''}`.trim(), variant: 'success' });
            }}>Save</button>
          </div>
        </div>
      </div>
    )}

    {showAddContact && (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50" onClick={(e)=>{ if (e.target===e.currentTarget) setShowAddContact(false); }}>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Add Contact</h3>
            <button className="btn-outline btn-sm" onClick={()=> setShowAddContact(false)}>Close</button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="label">First Name</label>
              <input className="input" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input className="input" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" value={phone} onChange={(e)=> setPhone(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Website</label>
              <input className="input" value={website} onChange={(e)=> setWebsite(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Facebook</label>
              <input className="input" value={facebook} onChange={(e)=> setFacebook(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="btn-outline btn-sm" onClick={()=> setShowAddContact(false)}>Cancel</button>
            <button className="btn-primary btn-sm" onClick={async ()=> {
              const cid = window.location.pathname.split('/').pop() || '';
              const name = `${firstName} ${lastName}`.trim() || (email || phone || 'Contact');
              const payload: any = { name, email: email||undefined, phone: phone||undefined, status: 'No Activity', raw: buildRawFromForm() };
              try {
                const res = await fetch(`${getApiUrl()}/api/campaigns/${cid}/contacts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const created = await res.json();
                const next = [
                  { id: created.id, name: created.name, company: '', email: created.email, phone: created.phone, city: '', state: '', url: website||'', status: created.status||'No Activity', stageId: '', raw: payload.raw },
                  ...((contactsByCampaignId as any)[cid] || [])
                ];
                setContactsForCampaign(cid, next);
                setShowAddContact(false);
              } catch (e) {
                addToast({ title: 'Failed to add contact', description: String((e as any)?.message||'error'), variant: 'error' });
              }
            }}>Add</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

// Funnel Tab Component
type FunnelTabProps = { campaignId: string; campaignName: string; totalContacts: number };
function FunnelTab({ campaignId, campaignName, totalContacts }: FunnelTabProps) {
  const [graph, setGraph] = useState<{ nodes: any[]; edges: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCampaigns.graph(campaignId).then((g) => {
      setGraph(g || { nodes: [], edges: [] });
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [campaignId]);

  if (loading) {
    return <div className="card text-center py-8 text-gray-500">Loading funnel...</div>;
  }

  if (!graph || graph.nodes.length === 0) {
    return (
      <div className="card text-center py-8 text-gray-500">
        <p>No funnel configured for this campaign.</p>
        <p className="text-sm mt-2">Select a funnel template in the Overview tab.</p>
      </div>
    );
  }

  // Build a map of edges for easy lookup
  const edgeMap = new Map<string, string>();
  graph.edges.forEach((e: any) => {
    edgeMap.set(e.from, e.to);
  });

  // Order nodes by following the edges from start node
  const orderedNodes: any[] = [];
  const startNode = graph.nodes.find((n: any) => n.type === 'start');
  if (startNode) {
    let currentId = startNode.id;
    const visited = new Set<string>();
    while (currentId && !visited.has(currentId)) {
      const node = graph.nodes.find((n: any) => n.id === currentId);
      if (node) {
        orderedNodes.push(node);
        visited.add(currentId);
      }
      currentId = edgeMap.get(currentId) || '';
    }
  }

  const nodeTypeIcons: Record<string, string> = {
    start: '▶️',
    email_send: '📧',
    sms_send: '💬',
    voicemail_drop: '📞',
    wait: '⏰',
    decision: '🔀',
    task: '✅',
    goal: '🎯',
    exit: '🏁',
    stage: '📍',
    linkedin_connect: '🔗',
    linkedin_message: '💼',
    web_request: '🌐',
    esign: '✍️',
  };

  const getNodeColor = (type: string) => {
    const colors: Record<string, string> = {
      start: 'bg-gray-200 border-gray-400',
      email_send: 'bg-cyan-50 border-cyan-500',
      sms_send: 'bg-green-50 border-green-500',
      voicemail_drop: 'bg-amber-50 border-amber-500',
      wait: 'bg-gray-50 border-gray-400',
      decision: 'bg-blue-50 border-blue-500',
      task: 'bg-purple-50 border-purple-500',
      goal: 'bg-green-100 border-green-600',
      exit: 'bg-gray-100 border-gray-500',
      stage: 'bg-cyan-100 border-cyan-600',
    };
    return colors[type] || 'bg-gray-50 border-gray-400';
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-1">Testing Funnel Flow</h2>
        <p className="text-sm text-gray-600 mb-4">
          {orderedNodes.length} nodes · Linear automation flow
        </p>
        
        <div className="space-y-3">
          {orderedNodes.map((node, idx) => {
            const config = node.config || {};
            const nextNode = orderedNodes[idx + 1];
            
            return (
              <div key={node.id}>
                <div className={`border-2 rounded-lg p-4 ${getNodeColor(node.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{nodeTypeIcons[node.type] || '⚙️'}</span>
                        <span className="font-semibold">{node.name}</span>
                        <span className="text-xs px-2 py-0.5 bg-white/60 rounded">{node.type}</span>
                      </div>
                      
                      {/* Display node configuration - handle both nested and top-level formats */}
                      {node.type === 'email_send' && (config.content?.subject || config.subject) && (
                        <div className="mt-2 text-sm space-y-1">
                          <div><span className="font-medium">Subject:</span> {config.content?.subject || config.subject}</div>
                          <div><span className="font-medium">Body:</span> {config.content?.body || config.body}</div>
                        </div>
                      )}
                      
                      {node.type === 'sms_send' && (config.content?.text || config.text) && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Message:</span> {config.content?.text || config.text}
                        </div>
                      )}
                      
                      {node.type === 'wait' && (config.duration || config.waitDuration) && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Duration:</span> {config.duration === 'PT5M' ? '5 minutes' : (config.waitDuration ? `${config.waitDuration} ${config.waitUnit || 'days'}` : config.duration)}
                        </div>
                      )}
                      
                      {node.type === 'voicemail_drop' && (config.tts?.custom_script || config.tts_script || config.ttsScript) && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Script:</span> {config.tts?.custom_script || config.tts_script || config.ttsScript}
                        </div>
                      )}

                      {(node.type === 'linkedin_connect' || node.type === 'linkedin_message' || node.type === 'linkedin_post') && (config.content?.text || config.text) && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">{node.type === 'linkedin_connect' ? 'Note:' : node.type === 'linkedin_message' ? 'Message:' : 'Post:'}</span> {config.content?.text || config.text}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">Node {idx + 1}</div>
                  </div>
                </div>
                
                {nextNode && (
                  <div className="flex items-center justify-center py-2">
                    <div className="text-gray-400 text-2xl">↓</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="text-2xl">ℹ️</div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">About This Funnel</h3>
            <p className="text-sm text-gray-700">
              This funnel will execute automatically for all {totalContacts} contacts when you activate the campaign.
              Each node will execute in sequence with the specified timing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Personalized Emails Review Tab
type PersonalizedEmailsTabProps = {
  campaignId: string;
  emails: any[];
  onUpdate: () => Promise<void>;
};

function PersonalizedEmailsTab({ campaignId, emails, onUpdate }: PersonalizedEmailsTabProps) {
  const { addToast } = useStore();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'edited' | 'rejected'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');
  const [bulkApproving, setBulkApproving] = useState(false);

  const filtered = filterStatus === 'all' ? emails : emails.filter(pe => pe.status === filterStatus);

  // Group by nodeKey for clarity
  const nodeKeys = [...new Set(emails.map(pe => pe.nodeKey))].sort();

  const statusBadge = (status: string) => {
    const cls: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      edited: 'bg-blue-100 text-blue-800 border-blue-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    return cls[status] || 'bg-gray-100 text-gray-700';
  };

  const handleApprove = async (id: string) => {
    try {
      await apiPersonalization.update(id, { status: 'approved' });
      await onUpdate();
    } catch { addToast({ title: 'Error', description: 'Failed to approve', variant: 'error' }); }
  };

  const handleReject = async (id: string) => {
    try {
      await apiPersonalization.update(id, { status: 'rejected' });
      await onUpdate();
    } catch { addToast({ title: 'Error', description: 'Failed to reject', variant: 'error' }); }
  };

  const startEdit = (pe: any) => {
    setEditingId(pe.id);
    setEditSubject(pe.editedSubject || pe.subject || '');
    setEditBody(pe.editedBody || pe.body || '');
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await apiPersonalization.update(editingId, { editedSubject: editSubject, editedBody: editBody });
      setEditingId(null);
      await onUpdate();
      addToast({ title: 'Saved', description: 'Personalized email updated', variant: 'success' });
    } catch { addToast({ title: 'Error', description: 'Failed to save', variant: 'error' }); }
  };

  const handleBulkApprove = async () => {
    setBulkApproving(true);
    try {
      const result = await apiPersonalization.bulkApprove(campaignId);
      await onUpdate();
      addToast({ title: 'Bulk approved', description: `${result.count} emails approved`, variant: 'success' });
    } catch { addToast({ title: 'Error', description: 'Bulk approve failed', variant: 'error' }); }
    setBulkApproving(false);
  };

  const pendingCount = emails.filter(pe => pe.status === 'pending').length;
  const approvedCount = emails.filter(pe => pe.status === 'approved' || pe.status === 'edited').length;

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-semibold">{emails.length} personalized emails</span>
            <span className="text-green-600">{approvedCount} approved</span>
            <span className="text-amber-600">{pendingCount} pending</span>
            <span className="text-gray-500">{nodeKeys.length} email step{nodeKeys.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="input text-sm py-1"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as any)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="edited">Edited</option>
              <option value="rejected">Rejected</option>
            </select>
            {pendingCount > 0 && (
              <button
                className="btn-primary btn-sm"
                onClick={handleBulkApprove}
                disabled={bulkApproving}
              >
                {bulkApproving ? 'Approving...' : `Approve All Pending (${pendingCount})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Email list */}
      <div className="space-y-3">
        {filtered.map(pe => (
          <div key={pe.id} className="card">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedId(expandedId === pe.id ? null : pe.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${statusBadge(pe.status)}`}>
                  {pe.status}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{pe.contact?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {pe.contact?.company && `${pe.contact.company} · `}
                    {pe.contact?.email || 'No email'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-gray-400">Step {pe.nodeKey}</span>
                <span className="text-gray-400">{expandedId === pe.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expandedId === pe.id && (
              <div className="mt-4 space-y-4">
                {/* Side-by-side comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Original Template</h4>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2 border">
                      <div>
                        <span className="text-xs font-medium text-gray-500">Subject:</span>
                        <p className="mt-0.5">{pe.originalSubject || '(no subject)'}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500">Body:</span>
                        <div className="mt-0.5 whitespace-pre-wrap text-xs leading-relaxed max-h-64 overflow-y-auto">{pe.originalBody || '(empty)'}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-blue-600 uppercase mb-2">AI Personalized</h4>
                    <div className="bg-blue-50/50 rounded-lg p-3 text-sm space-y-2 border border-blue-200">
                      <div>
                        <span className="text-xs font-medium text-blue-500">Subject:</span>
                        <p className="mt-0.5">{pe.editedSubject || pe.subject || '(no subject)'}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-500">Body:</span>
                        <div className="mt-0.5 whitespace-pre-wrap text-xs leading-relaxed max-h-64 overflow-y-auto">{pe.editedBody || pe.body || '(empty)'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Rationale */}
                {pe.rationale && (
                  <div className="bg-gray-50 rounded-lg p-3 border">
                    <span className="text-xs font-medium text-gray-500">AI Rationale:</span>
                    <p className="text-xs text-gray-600 mt-0.5">{pe.rationale}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  {pe.status !== 'approved' && (
                    <button className="btn-primary btn-sm" onClick={() => handleApprove(pe.id)}>Approve</button>
                  )}
                  <button className="btn-outline btn-sm" onClick={() => startEdit(pe)}>Edit</button>
                  {pe.status !== 'rejected' && (
                    <button className="btn-outline btn-sm text-red-600" onClick={() => handleReject(pe.id)}>Reject</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="card text-center py-8 text-gray-500">
            <p>No personalized emails match this filter.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setEditingId(null)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold">Edit Personalized Email</h3>
              <p className="text-sm text-gray-600 mt-1">Make adjustments and the email will be marked as "edited".</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="label">Subject</label>
                <input className="input" value={editSubject} onChange={e => setEditSubject(e.target.value)} />
              </div>
              <div>
                <label className="label">Body</label>
                <textarea className="input h-56" value={editBody} onChange={e => setEditBody(e.target.value)} />
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-end gap-3">
              <button className="btn-outline btn-md" onClick={() => setEditingId(null)}>Cancel</button>
              <button className="btn-primary btn-md" onClick={saveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


