import { useEffect, useMemo, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { apiCampaigns } from '@lib/api';
import { useStore } from '@store/useStore';

// Simple needle plugin for gauge-style doughnut
const needlePlugin = {
  id: 'gaugeNeedle',
  afterDatasetDraw(chart: any, args: any, pluginOptions: any) {
    const { ctx, data, chartArea: { width, height } } = chart;
    const dataset = data.datasets[0];
    const value = dataset?.data?.[0]?.value ?? dataset?.data?.[0] ?? 0;
    const max = (dataset as any)?.maxValue ?? 100;
    
    // Safety check: ensure chart data is available
    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data || !meta.data[0]) {
      return; // Skip drawing if data not ready
    }
    
    const angle = Math.PI + (value / Math.max(max, 1)) * Math.PI; // half circle
    const cx = width / 2 + meta.data[0].x - width / 2;
    const cy = meta.data[0].y; // center y
    const r = Math.min(width, height) / 2 * 0.8;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(r, 0);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#374151';
    ctx.stroke();
    ctx.restore();
  }
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, needlePlugin as any);

export function AnalyticsMaster() {
  const { liveCampaigns } = useStore();
  const [selectedId, setSelectedId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!selectedId && liveCampaigns && liveCampaigns.length) setSelectedId(liveCampaigns[0]?.id || '');
  }, [liveCampaigns, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    setLoading(true);
    apiCampaigns.stats(selectedId).then((d) => setData(d)).finally(() => setLoading(false));
  }, [selectedId]);

  const lineData = useMemo(() => {
    const labels = (data?.messagesByDay || []).map((d: any) => d.date);
    return {
      labels,
      datasets: [
        { label: 'Inbound', data: (data?.messagesByDay || []).map((d: any) => d.in), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)', tension: 0.3 },
        { label: 'Outbound', data: (data?.messagesByDay || []).map((d: any) => d.out), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)', tension: 0.3 },
      ],
    };
  }, [data]);

  const statusData = useMemo(() => {
    const entries = Object.entries(data?.statusCounts || {});
    const labels = entries.map(([k]) => k);
    const values = entries.map(([_, v]: any) => v);
    const colors = ['#6b7280','#f59e0b','#3b82f6','#10b981','#6366f1','#a855f7','#ec4899','#14b8a6','#22c55e'];
    return { labels, datasets: [{ label: 'Contacts', data: values, backgroundColor: colors.slice(0, values.length) }] };
  }, [data]);

  // Gauge helpers (half-doughnut)
  const buildGauge = (value: number, max: number, label: string) => {
    const pct = Math.min(value / Math.max(max, 1), 1);
    // Three ranges: red 0-25%, yellow 25-60%, green 60-100%
    const red = Math.min(pct, 0.25);
    const yellow = Math.max(Math.min(pct - 0.25, 0.35), 0);
    const green = Math.max(pct - 0.60, 0);
    const remain = 1 - (red + yellow + green);
    const seg = [red, yellow, green, remain].map((p) => Math.max(p, 0) * 100);
    return {
      data: {
        labels: ['Low','Med','High','Remaining'],
        datasets: [
          {
            data: seg,
            backgroundColor: ['#ef4444','#f59e0b','#4ade80','#e5e7eb'],
            borderWidth: 0,
            circumference: 180,
            rotation: 180,
            // custom for needle
            maxValue: max,
            // store value for plugin
            dataElementType: 'arc',
            // embed the actual numeric value in first datum for plugin
            // @ts-ignore
            dataValue: value,
          } as any,
        ],
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      } as ChartOptions<'doughnut'>,
      centerText: { label, value },
      max,
    };
  };

  const overallReach = data?.totals?.contacts ?? 0;
  const overallImpressions = data?.totals?.messages ?? 0;
  const overallEngagement = (data?.recentMessages || []).filter((m: any)=> m.direction==='in').length;
  const frequency = overallReach > 0 ? Math.round((overallImpressions / overallReach) * 10) / 10 : 0;

  const gauges = [
    buildGauge(overallReach, 40000, 'Reach'),
    buildGauge(overallImpressions, 40000, 'Impressions'),
    buildGauge(overallEngagement, 15000, 'Post Engagement'),
    buildGauge(Math.min(frequency, 12), 12, 'Frequency'),
  ];

  const kpis = [
    { label: 'Total Contacts', value: data?.totals?.contacts ?? 0 },
    { label: 'Emails Sent', value: data?.totals?.emails ?? 0 },
    { label: 'SMS Sent', value: data?.totals?.sms ?? 0 },
    { label: 'Voicemails Dropped', value: data?.totals?.voicemails ?? 0 },
    { label: 'LinkedIn Connections', value: data?.totals?.linkedin ?? 0 },
    { label: 'Positive Responses', value: data?.totals?.inbound ?? 0 },
    { label: 'Demos Booked', value: data?.funnel?.demosBooked ?? 0 },
    { label: 'Assessments Requested', value: data?.funnel?.assessments ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-gray-600">Aggregate analytics across campaigns with drilldown</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="label">Campaign</label>
          <select className="input" value={selectedId} onChange={(e)=> setSelectedId(e.target.value)}>
            {liveCampaigns.map((c)=> (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="card text-gray-500">Loading…</div>}
      {!loading && (
        <>
          <div className="grid md:grid-cols-4 gap-4">
            {kpis.map((k) => (
              <div key={k.label} className="card">
                <p className="text-xs text-gray-500">{k.label}</p>
                <p className="text-3xl mt-2">{k.value}</p>
              </div>
            ))}
          </div>

          {/* Overall Account Metrics */}
          <div className="card">
            <h3 className="font-semibold mb-6">Overall Account Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                <p className="text-5xl font-bold text-gray-900">{overallReach.toLocaleString()}</p>
                <p className="text-sm uppercase text-gray-500 tracking-wider mt-3">Reach</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                <p className="text-5xl font-bold text-gray-900">{overallImpressions.toLocaleString()}</p>
                <p className="text-sm uppercase text-gray-500 tracking-wider mt-3">Impressions</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                <p className="text-5xl font-bold text-gray-900">{overallEngagement.toLocaleString()}</p>
                <p className="text-sm uppercase text-gray-500 tracking-wider mt-3">Post Engagement</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
                <p className="text-5xl font-bold text-gray-900">{frequency.toLocaleString()}</p>
                <p className="text-sm uppercase text-gray-500 tracking-wider mt-3">Frequency</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="card md:col-span-2">
              <h3 className="font-semibold mb-2">Messages by Day (30d)</h3>
              <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { x: { ticks: { maxTicksLimit: 10 } } } }} />
            </div>
            <div className="card">
              <h3 className="font-semibold mb-2">Contact Status Breakdown</h3>
              <div className="h-64">
                <Doughnut 
                  data={statusData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { 
                      legend: { 
                        position: 'bottom',
                        labels: {
                          font: { size: 10 },
                          boxWidth: 12,
                          padding: 8
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context: any) {
                            return `${context.label}: ${context.parsed} contacts`;
                          }
                        }
                      }
                    } 
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Performance By Action</h3>
            <div className="space-y-3">
              {/* Email Actions */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Sequences</p>
                    <p className="text-xs text-gray-500">Initial outreach + follow-ups</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{data?.totals?.emails ?? 0}</p>
                  <p className="text-xs text-gray-500">Sent</p>
                </div>
              </div>

              {/* SMS Actions */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">SMS Follow-Ups</p>
                    <p className="text-xs text-gray-500">Text message campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{data?.totals?.sms ?? 0}</p>
                  <p className="text-xs text-gray-500">Sent</p>
                </div>
              </div>

              {/* Voicemail Actions */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Voicemail Drops</p>
                    <p className="text-xs text-gray-500">AI-generated voicemails</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{data?.totals?.voicemails ?? 0}</p>
                  <p className="text-xs text-gray-500">Dropped</p>
                </div>
              </div>

              {/* LinkedIn Actions */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">LinkedIn Outreach</p>
                    <p className="text-xs text-gray-500">Connections + messages</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{data?.totals?.linkedin ?? 0}</p>
                  <p className="text-xs text-gray-500">Actions</p>
                </div>
              </div>

              {/* Demo Bookings */}
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg border border-primary-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Demos Booked</p>
                    <p className="text-xs text-gray-500">Qualified meetings scheduled</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">{data?.funnel?.demosBooked ?? 0}</p>
                  <p className="text-xs text-gray-500">Booked</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


