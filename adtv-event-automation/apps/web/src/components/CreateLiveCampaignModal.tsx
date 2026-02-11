import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, type Campaign } from '@store/useStore';
import { apiCampaigns, apiTemplates, apiSenderEmails } from '@lib/api';

type Props = { open: boolean; onClose: () => void };

export function CreateLiveCampaignModal({ open, onClose }: Props) {
  const { addLiveCampaign, addToast, campaigns } = useStore();
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [calendlyLink, setCalendlyLink] = useState('');
  const [demoPageLink, setDemoPageLink] = useState('');
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateId, setTemplateId] = useState('');
  const [senderEmails, setSenderEmails] = useState<Array<{ email: string; name: string; source: string }>>([]);

  // Load templates and sender emails when modal opens
  useEffect(() => {
    if (!open) return;
    try {
      if (Array.isArray(campaigns) && campaigns.length) {
        setTemplates((prev) => (prev.length ? prev : campaigns.map((t: any) => ({ id: t.id, name: t.name }))));
      }
    } catch {}
    apiTemplates.list().then((list: any) => {
      if (Array.isArray(list) && list.length) setTemplates(list);
    }).catch(() => {});

    // Load sender emails from backend
    apiSenderEmails.list().then((list) => {
      console.log('[CreateCampaign] Sender emails loaded:', list);
      setSenderEmails(Array.isArray(list) ? list : []);
      // Auto-select first if only one
      if (Array.isArray(list) && list.length === 1 && !senderEmail && list[0]) {
        setSenderEmail(list[0].email);
      }
    }).catch((err) => {
      console.error('[CreateCampaign] Failed to load sender emails:', err);
      setSenderEmails([]);
    });
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

  const disabled = !name || !senderEmail || !launchDate;

  const submit = async () => {
    const senderData = senderEmails.find((s) => s.email === senderEmail);

    try {
      const created = await apiCampaigns.create({
        name,
        ownerName: senderData?.name || senderEmail,
        ownerEmail: senderEmail,
        ownerPhone: ownerPhone || undefined,
        videoLink: demoPageLink || undefined,
        eventLink: calendlyLink || undefined,
        eventType: 'outreach',
        eventDate: launchDate,
        launchDate: launchDate,
        calendlyLink: calendlyLink || undefined,
        templateId: templateId || undefined,
        status: 'draft',
      });

      const payload: Campaign = {
        id: created.id,
        name,
        owner_name: senderData?.name || senderEmail,
        owner_email: senderEmail,
        owner_phone: ownerPhone,
        video_link: demoPageLink,
        event_link: calendlyLink,
        launch_date: launchDate,
        event_type: 'outreach' as any,
        event_date: launchDate,
        event_slots: [],
        target_cities: '',
        hotel_name: undefined,
        hotel_address: undefined,
        calendly_link: calendlyLink,
        status: 'draft',
        total_contacts: 0,
        enriched_contacts: 0,
        emails_generated: 0,
        template_id: templateId || undefined,
      } as Campaign;

      addLiveCampaign(payload);
      addToast({ title: 'Campaign created', description: name, variant: 'success' });
      onClose();
    } catch (error: any) {
      addToast({ title: 'Failed to create campaign', description: error.message, variant: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-xl shadow-soft-xl w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create New Campaign</h2>
          <button type="button" className="btn-outline btn-sm" onClick={onClose}>Close</button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Template Selection */}
          <div>
            <label className="label">Choose Funnel Template</label>
            <select className="input" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
              <option value="">Select a funnel template</option>
              {combinedTemplates.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {combinedTemplates.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No templates yet. Go to <Link className="link" to="/templates">Funnel Templates</Link> to create one.</p>
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

          {/* Send From Email & Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Send From Email *</label>
              <select className="input" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)}>
                <option value="">Select sender email</option>
                {senderEmails.map((s) => (
                  <option key={s.email} value={s.email}>{s.email}</option>
                ))}
              </select>
              {senderEmails.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">No sender emails configured. Add one in Settings.</p>
              )}
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
