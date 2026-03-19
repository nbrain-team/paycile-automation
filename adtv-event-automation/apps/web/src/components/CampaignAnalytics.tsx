import { useEffect, useState, useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { apiAnalytics } from '@lib/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

interface AnalyticsData {
  email: {
    total: number;
    sent: number;
    delivered: number;
    failed: number;
    opened: number;
    openRate: number;
    clicked: number;
    clickRate: number;
    byNode: Array<{
      nodeKey: string;
      nodeName: string;
      sent: number;
      delivered: number;
      opened: number;
      clicked: number;
    }>;
  };
  calendly: {
    schedulingCompleted: number;
    schedulingCanceled: number;
    events: Array<{ name: string; email: string; scheduledAt: string; eventType: string; status: string }>;
  };
  contacts: {
    total: number;
    byStatus: Record<string, number>;
    engagement: Array<{
      contactId: string;
      name: string;
      email: string;
      company: string;
      status: string;
      currentStep: string;
      emailsSent: number;
      opened: boolean;
      clicked: boolean;
      scheduled: boolean;
      lastActivity: string;
    }>;
  };
  timeline: Array<{ date: string; sent: number; opened: number; clicked: number }>;
}

type EngagementFilter = 'all' | 'opened' | 'clicked' | 'scheduled' | 'no_activity';

export function CampaignAnalytics({ campaignId }: { campaignId: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [engagementFilter, setEngagementFilter] = useState<EngagementFilter>('all');
  const [sortBy, setSortBy] = useState<'name' | 'lastActivity' | 'emailsSent'>('lastActivity');

  useEffect(() => {
    setLoading(true);
    apiAnalytics.campaign(campaignId)
      .then((d: any) => setData(d))
      .catch((e: any) => console.error('Analytics load failed:', e))
      .finally(() => setLoading(false));
  }, [campaignId]);

  const filteredContacts = useMemo(() => {
    if (!data) return [];
    let list = data.contacts.engagement;
    if (engagementFilter === 'opened') list = list.filter(c => c.opened);
    else if (engagementFilter === 'clicked') list = list.filter(c => c.clicked);
    else if (engagementFilter === 'scheduled') list = list.filter(c => c.scheduled);
    else if (engagementFilter === 'no_activity') list = list.filter(c => !c.opened && !c.clicked && c.emailsSent > 0);

    return [...list].sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'emailsSent') return b.emailsSent - a.emailsSent;
      return new Date(b.lastActivity || 0).getTime() - new Date(a.lastActivity || 0).getTime();
    });
  }, [data, engagementFilter, sortBy]);

  const timelineChart = useMemo(() => {
    if (!data) return null;
    const labels = data.timeline.map(t => t.date.slice(5));
    return {
      labels,
      datasets: [
        { label: 'Sent', data: data.timeline.map(t => t.sent), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', tension: 0.3, fill: true },
        { label: 'Opened', data: data.timeline.map(t => t.opened), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', tension: 0.3, fill: true },
        { label: 'Clicked', data: data.timeline.map(t => t.clicked), borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.3, fill: true },
      ],
    };
  }, [data]);

  const nodeBarChart = useMemo(() => {
    if (!data || !data.email.byNode.length) return null;
    const labels = data.email.byNode.map(n => n.nodeName);
    return {
      labels,
      datasets: [
        { label: 'Delivered', data: data.email.byNode.map(n => n.delivered), backgroundColor: '#3b82f6' },
        { label: 'Opened', data: data.email.byNode.map(n => n.opened), backgroundColor: '#10b981' },
        { label: 'Clicked', data: data.email.byNode.map(n => n.clicked), backgroundColor: '#f59e0b' },
      ],
    };
  }, [data]);

  if (loading) {
    return (
      <div className="card text-center py-12">
        <div className="animate-pulse text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">No analytics data available yet.</p>
        <p className="text-xs text-gray-400 mt-2">Analytics will populate after emails are sent from this campaign.</p>
      </div>
    );
  }

  const { email, calendly, contacts } = data;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <KpiCard label="Emails Sent" value={email.sent} />
        <KpiCard label="Delivered" value={email.delivered} sub={email.sent > 0 ? `${Math.round((email.delivered / email.sent) * 100)}%` : ''} color="blue" />
        <KpiCard label="Rejected" value={email.failed} sub={email.sent > 0 ? `${Math.round((email.failed / email.sent) * 100)}%` : ''} color="red" />
        <KpiCard label="Opened" value={email.opened} sub={`${email.openRate}%`} color="green" />
        <KpiCard label="Clicked" value={email.clicked} sub={`${email.clickRate}%`} color="amber" />
        <KpiCard label="Booked" value={calendly.schedulingCompleted} color="purple" />
      </div>

      {/* Funnel Visualization */}
      <div className="card">
        <h3 className="font-semibold mb-4">Email Funnel</h3>
        <div className="flex items-center gap-1">
          <FunnelStep label="Sent" value={email.sent} maxValue={email.sent} color="#3b82f6" />
          <FunnelArrow />
          <FunnelStep label="Delivered" value={email.delivered} maxValue={email.sent} color="#6366f1" />
          <FunnelArrow />
          <FunnelStep label="Opened" value={email.opened} maxValue={email.sent} color="#10b981" />
          <FunnelArrow />
          <FunnelStep label="Clicked" value={email.clicked} maxValue={email.sent} color="#f59e0b" />
          <FunnelArrow />
          <FunnelStep label="Booked" value={calendly.schedulingCompleted} maxValue={email.sent} color="#8b5cf6" />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Per-Step Breakdown */}
        {nodeBarChart && (
          <div className="card">
            <h3 className="font-semibold mb-4">Performance by Funnel Step</h3>
            <Bar data={nodeBarChart} options={{ responsive: true, plugins: { legend: { position: 'top' as const } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} />
          </div>
        )}

        {/* Timeline */}
        {timelineChart && (
          <div className="card">
            <h3 className="font-semibold mb-4">Activity Timeline (30 Days)</h3>
            <Line data={timelineChart} options={{ responsive: true, plugins: { legend: { position: 'top' as const } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} />
          </div>
        )}
      </div>

      {/* Calendly Bookings */}
      {calendly.events.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-3">Calendly Bookings ({calendly.schedulingCompleted})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4">Name</th>
                  <th className="pb-2 pr-4">Email</th>
                  <th className="pb-2 pr-4">Event Type</th>
                  <th className="pb-2">Scheduled For</th>
                </tr>
              </thead>
              <tbody>
                {calendly.events.map((e, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{e.name || '-'}</td>
                    <td className="py-2 pr-4 text-gray-500">{e.email}</td>
                    <td className="py-2 pr-4">{e.eventType || '-'}</td>
                    <td className="py-2">{e.scheduledAt ? new Date(e.scheduledAt).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Engagement Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Contact Engagement ({filteredContacts.length})</h3>
          <div className="flex items-center gap-3">
            <select
              className="text-xs border rounded px-2 py-1"
              value={engagementFilter}
              onChange={e => setEngagementFilter(e.target.value as EngagementFilter)}
            >
              <option value="all">All Contacts</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="scheduled">Booked</option>
              <option value="no_activity">No Activity</option>
            </select>
            <select
              className="text-xs border rounded px-2 py-1"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
            >
              <option value="lastActivity">Sort: Last Activity</option>
              <option value="name">Sort: Name</option>
              <option value="emailsSent">Sort: Emails Sent</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b text-left text-gray-500 text-xs uppercase">
                <th className="pb-2 pr-3">Name</th>
                <th className="pb-2 pr-3">Email</th>
                <th className="pb-2 pr-3">Company</th>
                <th className="pb-2 pr-3">Step</th>
                <th className="pb-2 pr-2 text-center">Sent</th>
                <th className="pb-2 pr-2 text-center">Opened</th>
                <th className="pb-2 pr-2 text-center">Clicked</th>
                <th className="pb-2 pr-2 text-center">Booked</th>
                <th className="pb-2">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(ct => (
                <tr key={ct.contactId} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 pr-3 font-medium">{ct.name || '-'}</td>
                  <td className="py-2 pr-3 text-gray-500 text-xs">{ct.email || '-'}</td>
                  <td className="py-2 pr-3 text-gray-500">{ct.company || '-'}</td>
                  <td className="py-2 pr-3">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{ct.currentStep}</span>
                  </td>
                  <td className="py-2 pr-2 text-center">{ct.emailsSent}</td>
                  <td className="py-2 pr-2 text-center">{ct.opened ? <Check color="green" /> : <Dash />}</td>
                  <td className="py-2 pr-2 text-center">{ct.clicked ? <Check color="amber" /> : <Dash />}</td>
                  <td className="py-2 pr-2 text-center">{ct.scheduled ? <Check color="purple" /> : <Dash />}</td>
                  <td className="py-2 text-xs text-gray-400">
                    {ct.lastActivity ? new Date(ct.lastActivity).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400">No contacts match the current filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub, color }: { label: string; value: number; sub?: string; color?: string }) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    amber: 'text-amber-600',
    purple: 'text-purple-600',
  };
  return (
    <div className="card text-center">
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colorMap[color || ''] || 'text-gray-900'}`}>{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function FunnelStep({ label, value, maxValue, color }: { label: string; value: number; maxValue: number; color: string }) {
  const pct = maxValue > 0 ? Math.max((value / maxValue) * 100, 8) : 8;
  return (
    <div className="flex-1 text-center">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div
        className="mx-auto rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: color, height: `${Math.max(pct * 0.8, 32)}px`, minWidth: 60, transition: 'height 0.3s' }}
      >
        {value}
      </div>
      {maxValue > 0 && <div className="text-xs text-gray-400 mt-1">{Math.round((value / maxValue) * 100)}%</div>}
    </div>
  );
}

function FunnelArrow() {
  return <div className="text-gray-300 text-lg flex-shrink-0">&rarr;</div>;
}

function Check({ color }: { color: string }) {
  const colorMap: Record<string, string> = { green: 'text-green-500', amber: 'text-amber-500', purple: 'text-purple-500' };
  return <span className={colorMap[color] || 'text-green-500'}>&#10003;</span>;
}

function Dash() {
  return <span className="text-gray-300">&mdash;</span>;
}
