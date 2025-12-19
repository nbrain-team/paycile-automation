export type VoicemailDropInput = {
  to: string;
  audioUrl?: string; // pre-recorded mp3 url
  audioFileId?: string; // for future: uploaded media id
  campaignId?: string;
  from?: string;
  scheduleAt?: string; // ISO datetime for scheduling
  callerId?: string; // optional caller id
  note?: string;
};

export type VoicemailDropResult = {
  queued: boolean;
  provider: 'dropcowboy' | 'mock';
  id?: string;
  raw?: any;
};

function normalizePhone10(input: string): string {
  const d = (input || '').replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) return d.slice(1);
  if (d.length >= 10) return d.slice(-10);
  return d;
}

// Minimal HTTP wrapper
function doFetch(url: string, init?: any) {
  const f: any = (globalThis as any).fetch;
  if (!f) {
    throw new Error('Global fetch not available in runtime');
  }
  return f(url, init);
}

export async function sendVoicemailDrop(input: VoicemailDropInput): Promise<VoicemailDropResult> {
  const provider = (process.env.VOICEMAIL_PROVIDER || 'dropcowboy').toLowerCase();
  
  // DropCowboy provider (only provider)
  if (provider === 'dropcowboy') {
    const teamId = process.env.DROPCOWBOY_TEAM_ID || '';
    const secret = process.env.DROPCOWBOY_SECRET || '';
    const baseUrl = process.env.DROPCOWBOY_API_BASE_URL || 'https://www.dropcowboy.com/api';

    if (!teamId || !secret) {
      return { 
        queued: false, 
        provider: 'dropcowboy', 
        raw: { error: 'Missing DropCowboy credentials (DROPCOWBOY_TEAM_ID or DROPCOWBOY_SECRET)' } 
      };
    }

    if (!input.audioUrl) {
      return { 
        queued: false, 
        provider: 'dropcowboy', 
        raw: { error: 'Missing audio URL - ensure ElevenLabs TTS generated audio' } 
      };
    }

    try {
      const phone = normalizePhone10(input.to);
      const callerId = normalizePhone10(input.callerId || input.from || process.env.DROPCOWBOY_CALLER_ID || '');
      
      const payload = {
        team_id: teamId,
        secret: secret,
        phone_numbers: [phone],
        audio_url: input.audioUrl,
        caller_id: callerId,
        campaign_name: input.campaignId || 'Paycile Campaign',
        schedule_datetime: input.scheduleAt || undefined
      };

      console.log('[DropCowboy] Sending voicemail drop:', { 
        to: phone, 
        callerId, 
        audioUrl: input.audioUrl?.substring(0, 50) + '...' 
      });

      const res = await doFetch(`${baseUrl}/campaigns/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && !data.error) {
        console.log('[DropCowboy] Success:', data);
        return {
          queued: true,
          provider: 'dropcowboy',
          id: data.campaign_id || data.id,
          raw: data
        };
      } else {
        console.error('[DropCowboy] API error:', { status: res.status, data });
        return {
          queued: false,
          provider: 'dropcowboy',
          raw: { error: data || `HTTP ${res.status}` }
        };
      }
    } catch (err: any) {
      console.error('[DropCowboy] Exception:', err.message);
      return {
        queued: false,
        provider: 'dropcowboy',
        raw: { error: err.message }
      };
    }
  }

  // No provider configured or unsupported provider
  return { 
    queued: false, 
    provider: 'mock', 
    raw: { error: `Voicemail provider '${provider}' not supported. Set VOICEMAIL_PROVIDER=dropcowboy` } 
  };
}
