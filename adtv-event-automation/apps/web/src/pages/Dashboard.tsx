import { useEffect, useState } from 'react';
import { useStore } from '@store/useStore';
import { seedCampaigns } from '@seed/campaignSeed';
import { API_URL } from '@lib/api';

export function Dashboard() {
  const { campaigns, setCampaigns, liveCampaigns, addLiveCampaign } = useStore();
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    // DISABLED: Auto-seeding causes campaigns to reappear after deletion
    // All campaigns should come from database only
    // if (campaigns.length === 0) setCampaigns(seedCampaigns);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/stats`).then((r)=> r.json()).then((s)=> setStats(s)).catch(()=>{});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Campaign Overview</h1>
        <p className="mt-1 text-sm text-gray-600">Multi-channel marketing automation platform</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {([
          { label: 'Total Contacts', value: stats?.enrolled ?? 0 },
          { label: 'Emails Sent', value: stats?.messaged ?? 0 },
          { label: 'SMS Sent', value: stats?.smsSent ?? 0 },
          { label: 'Voicemails Dropped', value: stats?.voicemailsDropped ?? 0 },
          { label: 'LinkedIn Actions', value: stats?.linkedinActions ?? 0 },
          { label: 'Positive Responses', value: stats?.respondedPos ?? 0 },
          { label: 'Demos Booked', value: stats?.demosBooked ?? 0 },
          { label: 'Assessments Scheduled', value: stats?.assessmentsScheduled ?? 0 },
        ]).map((k) => (
          <div key={k.label} className="card">
            <p className="text-sm text-gray-600">{k.label}</p>
            <p className="text-3xl font-semibold mt-2">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        {stats?.recentActivity?.length ? (
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
            {stats.recentActivity.map((a: any) => (
              <li key={a.id}><span className="text-gray-500">{new Date(a.time).toLocaleString()}:</span> {a.direction === 'in' ? 'Inbound' : 'Outbound'} from {a.contact} — {a.text}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recent activity.</p>
        )}
      </div>

      {/* HIDDEN: Campaigns preserved but not displayed - will be used later */}
      <div className="card" style={{ display: 'none' }}>
        <h2 className="text-lg font-semibold mb-4">Active Campaigns</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {liveCampaigns.map((c) => (
            <div key={c.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.status} · {c.event_type}</p>
                </div>
                <a className="btn-primary btn-sm" href={`/campaigns/${c.id}`}>Open</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


