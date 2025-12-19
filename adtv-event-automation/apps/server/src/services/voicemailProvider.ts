export type VoicemailDropInput = {
  to: string;
  audioUrl?: string; // pre-recorded mp3 url
  audioFileId?: string; // for future: uploaded media id
  ttsScript?: string; // text script for DropCowboy voice TTS
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

    try {
      // Format phone number in E.164 format (with +1)
      let phone = normalizePhone10(input.to);
      const phoneE164 = phone.length === 10 ? `+1${phone}` : `+${phone}`;
      
      // Format caller ID / forwarding number
      let forwardingNum = normalizePhone10(input.callerId || input.from || process.env.DROPCOWBOY_CALLER_ID || '');
      const forwardingE164 = forwardingNum.length === 10 ? `+1${forwardingNum}` : `+${forwardingNum}`;
      
      const brandId = process.env.DROPCOWBOY_BRAND_ID || '';
      const voiceId = process.env.DROPCOWBOY_VOICE_ID || '';
      
      if (!brandId) {
        return {
          queued: false,
          provider: 'dropcowboy',
          raw: { error: 'Missing DROPCOWBOY_BRAND_ID - get from Trust Center in DropCowboy dashboard' }
        };
      }
      
      // Build payload - prefer voice_id (DropCowboy TTS) over audio_url
      const payload: any = {
        team_id: teamId,
        secret: secret,
        brand_id: brandId,
        phone_number: phoneE164,
        forwarding_number: forwardingE164,
        foreign_id: input.campaignId || `paycile-${Date.now()}`
      };

      // If voice_id is configured, use DropCowboy's TTS (no special approval needed)
      if (voiceId && input.ttsScript) {
        payload.voice_id = voiceId;
        payload.tts_body = input.ttsScript;
      }
      // Otherwise use audio_url (requires special approval from DropCowboy)
      else if (input.audioUrl) {
        payload.audio_url = input.audioUrl;
        payload.audio_type = 'mp3';
      }
      // No audio source provided
      else {
        return {
          queued: false,
          provider: 'dropcowboy',
          raw: { error: 'Missing audio source - need either DROPCOWBOY_VOICE_ID with ttsScript, or audioUrl' }
        };
      }

      console.log('[DropCowboy] Sending voicemail drop:', { 
        phone: phoneE164, 
        forwarding: forwardingE164,
        brandId,
        method: voiceId && input.ttsScript ? 'voice_id (DropCowboy TTS)' : 'audio_url (external MP3)',
        scriptLength: input.ttsScript?.length,
        audioUrl: input.audioUrl?.substring(0, 60) + '...' 
      });

      const res = await doFetch(`https://api.dropcowboy.com/v1/rvm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => null);

      // DropCowboy returns 200 for queued voicemails (delivery happens async)
      if (res.ok && data && !data.error) {
        console.log('[DropCowboy] Voicemail queued successfully:', data);
        return {
          queued: true,
          provider: 'dropcowboy',
          id: data.drop_id || data.id || data.campaign_id,
          raw: data
        };
      } else {
        console.error('[DropCowboy] API error:', { status: res.status, data });
        return {
          queued: false,
          provider: 'dropcowboy',
          raw: { error: data?.message || data?.error || data || `HTTP ${res.status}` }
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
