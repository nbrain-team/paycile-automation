import { useEffect, useState } from 'react';
import { apiAuth, apiGoogle, apiMicrosoft, apiLinkedIn, getApiUrl } from '../lib/api';

export function Settings() {
  const [me, setMe] = useState<any>(null);
  const [smtpConfigs, setSmtpConfigs] = useState<any[]>([]);
  const [showSmtpForm, setShowSmtpForm] = useState(false);
  const [smtpForm, setSmtpForm] = useState({
    email: '',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 465,
    smtpUser: '',
    smtpPass: '',
    smtpSecure: true
  });
  
  useEffect(() => {
    apiAuth.me().then(setMe).catch(() => setMe(null));
    loadSmtpConfigs();
  }, []);
  
  const loadSmtpConfigs = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/smtp/configs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSmtpConfigs(data);
      }
    } catch (e) {
      console.error('Failed to load SMTP configs:', e);
    }
  };
  
  const saveSmtpConfig = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/smtp/configs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(smtpForm)
      });
      
      if (response.ok) {
        alert('SMTP configuration added successfully!');
        setShowSmtpForm(false);
        setSmtpForm({
          email: '',
          smtpHost: 'smtp.gmail.com',
          smtpPort: 465,
          smtpUser: '',
          smtpPass: '',
          smtpSecure: true
        });
        loadSmtpConfigs();
      } else {
        alert('Failed to save SMTP configuration');
      }
    } catch (e) {
      alert('Error saving SMTP configuration');
    }
  };
  
  const deleteSmtpConfig = async (id: string) => {
    if (!confirm('Delete this SMTP configuration?')) return;
    
    try {
      const response = await fetch(`${getApiUrl()}/api/smtp/configs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (response.ok) {
        alert('SMTP configuration deleted');
        loadSmtpConfigs();
      }
    } catch (e) {
      alert('Failed to delete SMTP configuration');
    }
  };
  const testSend = async () => {
    const num = window.prompt('Enter phone number (E.164 or US local)');
    if (!num) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: num, text: 'ADTV test from Settings' })
      });
      const data = await res.json().catch(()=>({}));
      alert(res.ok ? `Sent (or simulated). Details: ${JSON.stringify(data)}` : `Send failed: ${JSON.stringify(data)}`);
    } catch (e) {
      alert('Send error');
    }
  };
  const testVoicemail = async () => {
    const num = window.prompt('Enter phone number for voicemail drop (US local or E.164)');
    if (!num) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/voicemail/drop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: num, ttsScript: 'Hey, this is ADTV with a quick invite. Call me back when you can!' })
      });
      const data = await res.json().catch(()=>({}));
      alert(res.ok ? `Queued (or simulated). Details: ${JSON.stringify(data)}` : `Drop failed: ${JSON.stringify(data)}`);
    } catch (e) {
      alert('Drop error');
    }
  };
  const doLogin = async () => {
    const email = window.prompt('Email');
    const password = window.prompt('Password');
    if (!email || !password) return;
    try {
      const r = await apiAuth.login(email, password);
      localStorage.setItem('auth_token', r.token);
      const meData = await apiAuth.me();
      setMe(meData);
      alert('Logged in');
    } catch (e) {
      alert('Login failed');
    }
  };
  const connectGoogle = async () => {
    if (!me?.id) return alert('Login first');
    try {
      const { url } = await apiGoogle.initiate(me.id);
      window.location.href = url;
    } catch (e) {
      alert('Google initiate failed');
    }
  };
  const connectMicrosoft = async () => {
    if (!me?.id) return alert('Login first');
    try {
      const { url } = await apiMicrosoft.initiate(me.id);
      window.location.href = url;
    } catch (e: any) {
      alert('Microsoft connect failed: ' + (e?.message || 'error'));
    }
  };
  const disconnectMicrosoft = async () => {
    try {
      await apiMicrosoft.disconnect();
      const meData = await apiAuth.me();
      setMe(meData);
      alert('Microsoft disconnected');
    } catch (e) {
      alert('Disconnect failed');
    }
  };
  const connectLinkedIn = async () => {
    if (!me?.id) return alert('Login first');
    try {
      const { url } = await apiLinkedIn.initiate(me.id);
      window.location.href = url;
    } catch (e: any) {
      alert('LinkedIn connect failed: ' + (e?.message || 'error'));
    }
  };
  const disconnectLinkedIn = async () => {
    try {
      await apiLinkedIn.disconnect();
      const meData = await apiAuth.me();
      setMe(meData);
      alert('LinkedIn disconnected');
    } catch (e) {
      alert('Disconnect failed');
    }
  };
  const syncGmail = async () => {
    if (!me?.id) return alert('Login first');
    try {
      const out = await apiGoogle.sync(me.id, 30);
      alert(`Imported ${out.imported} replies`);
    } catch (e) {
      alert('Sync failed');
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-600">Branding and integrations</p>
        <div className="mt-3 flex items-center gap-3">
          {!me && <button className="btn-primary btn-sm" onClick={doLogin}>Login</button>}
          {me && <span className="text-sm text-gray-700">Logged in as {me.email}</span>}
        </div>
      </div>

      {/* SMTP Configuration Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">SMTP Email Configurations</h2>
          <button className="btn-primary btn-sm" onClick={() => setShowSmtpForm(!showSmtpForm)}>
            + Add SMTP Account
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Configure multiple SMTP accounts for email rotation. The system will automatically rotate between accounts when sending emails to distribute load.
        </p>
        
        {showSmtpForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
            <h3 className="font-semibold text-sm">Add New SMTP Configuration</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="label">From Email *</label>
                <input
                  className="input"
                  type="email"
                  value={smtpForm.email}
                  onChange={(e) => setSmtpForm({...smtpForm, email: e.target.value})}
                  placeholder="sender@company.com"
                />
              </div>
              <div>
                <label className="label">SMTP Host *</label>
                <input
                  className="input"
                  value={smtpForm.smtpHost}
                  onChange={(e) => setSmtpForm({...smtpForm, smtpHost: e.target.value})}
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div>
                <label className="label">SMTP Username *</label>
                <input
                  className="input"
                  value={smtpForm.smtpUser}
                  onChange={(e) => setSmtpForm({...smtpForm, smtpUser: e.target.value})}
                  placeholder="username@gmail.com"
                />
              </div>
              <div>
                <label className="label">SMTP Port *</label>
                <input
                  className="input"
                  type="number"
                  value={smtpForm.smtpPort}
                  onChange={(e) => setSmtpForm({...smtpForm, smtpPort: parseInt(e.target.value)})}
                  placeholder="465"
                />
              </div>
            </div>
            <div>
              <label className="label">SMTP Password / App Password *</label>
              <input
                className="input"
                type="password"
                value={smtpForm.smtpPass}
                onChange={(e) => setSmtpForm({...smtpForm, smtpPass: e.target.value})}
                placeholder="App password for Gmail"
              />
              <p className="text-xs text-gray-500 mt-1">
                For Gmail, use an App Password (Settings → Security → 2-Step Verification → App passwords)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="smtpSecure"
                checked={smtpForm.smtpSecure}
                onChange={(e) => setSmtpForm({...smtpForm, smtpSecure: e.target.checked})}
              />
              <label htmlFor="smtpSecure" className="text-sm">Use SSL/TLS (recommended for Gmail)</label>
            </div>
            <div className="flex gap-2">
              <button className="btn-primary btn-sm" onClick={saveSmtpConfig}>Save SMTP Config</button>
              <button className="btn-outline btn-sm" onClick={() => setShowSmtpForm(false)}>Cancel</button>
            </div>
          </div>
        )}
        
        {smtpConfigs.length > 0 ? (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm mb-2">Active SMTP Accounts ({smtpConfigs.length})</h3>
            {smtpConfigs.map((config) => (
              <div key={config.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div>
                  <p className="font-medium text-sm">{config.email}</p>
                  <p className="text-xs text-gray-600">{config.smtpHost}:{config.smtpPort}</p>
                </div>
                <button 
                  className="btn-outline btn-xs text-red-600"
                  onClick={() => deleteSmtpConfig(config.id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <p className="text-xs text-gray-600 mt-2">
              ℹ️ System will rotate emails across these accounts when sending campaigns (round-robin distribution)
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No SMTP configurations yet. Click "+ Add SMTP Account" to get started.</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold">Branding</h2>
          <div className="mt-3 space-y-3">
            <div>
              <label className="label">Logo</label>
              <input className="input" placeholder="Upload mock" />
            </div>
            <div>
              <label className="label">Primary Color</label>
              <input className="input" type="color" defaultValue="#4f46e5" />
            </div>
            <button className="btn-primary btn-md">Save</button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold">Integrations</h2>
          <div className="mt-3 space-y-3">
            <div>
              <label className="label">Microsoft Email (Outlook / 365)</label>
              <div className="flex items-center gap-2">
                {me?.microsoftEmail ? (
                  <>
                    <span className="text-sm text-green-600 font-medium">{me.microsoftEmail}</span>
                    <button className="btn-outline btn-xs text-red-600" onClick={disconnectMicrosoft}>Disconnect</button>
                  </>
                ) : (
                  <button className="btn-primary btn-sm" onClick={connectMicrosoft}>Connect Microsoft Email</button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Connect your Microsoft account to send campaign emails from your Outlook address.</p>
            </div>
            <div>
              <label className="label">LinkedIn</label>
              <div className="flex items-center gap-2">
                {me?.linkedinProfileUrl ? (
                  <>
                    <span className="text-sm text-green-600 font-medium">Connected</span>
                    <button className="btn-outline btn-xs text-red-600" onClick={disconnectLinkedIn}>Disconnect</button>
                  </>
                ) : (
                  <button className="btn-primary btn-sm" onClick={connectLinkedIn}>Connect LinkedIn</button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Connect your LinkedIn account for LinkedIn campaign touchpoints.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


