# DropCowboy Voicemail Integration

**Date:** December 19, 2025  
**Status:** Code Integrated, Waiting for Brand Registration

---

## ✅ Integration Complete

I've integrated DropCowboy as your voicemail provider with automatic fallback to Slybroadcast.

**Flow:**
1. Generate voicemail audio with ElevenLabs TTS
2. Try sending via DropCowboy (if credentials configured)
3. Fallback to Slybroadcast if DropCowboy unavailable
4. Log results and track delivery

---

## 🔧 Environment Variables Needed

**Once you complete brand registration** in DropCowboy Trust Center and get your API credentials:

Add these to Render:

```bash
VOICEMAIL_PROVIDER=dropcowboy
DROPCOWBOY_TEAM_ID=(from DropCowboy API page)
DROPCOWBOY_SECRET=(from DropCowboy API page)
DROPCOWBOY_CALLER_ID=(your caller ID number)
```

**Optional:**
```bash
DROPCOWBOY_API_BASE_URL=https://www.dropcowboy.com/api
```

---

## 📋 How to Get API Credentials

### Step 1: Complete Brand Registration
1. Go to: https://www.dropcowboy.com/appv1/#/trust-center
2. Fill out brand registration form
3. Submit for review
4. Wait for approval (usually 24-48 hours)

### Step 2: Access API Page
1. Go to: https://www.dropcowboy.com/appv1/#/api
2. Find "API Credentials" section
3. Copy your **team_id**
4. Click eye icon to reveal and copy **secret**

### Step 3: Add to Render
Add the credentials to Render environment variables (as shown above)

---

## 🔄 How It Works

### Voicemail Campaign Flow:

```javascript
// 1. Campaign execution triggers voicemail node
// 2. System checks VOICEMAIL_PROVIDER env var

// If "dropcowboy":
//   - Check for DROPCOWBOY_TEAM_ID and DROPCOWBOY_SECRET
//   - If configured: Send via DropCowboy API
//   - If not configured or fails: Fallback to Slybroadcast

// If "slybroadcast":
//   - Send directly via Slybroadcast
//   - Skip DropCowboy entirely
```

### API Request Format:

```json
POST https://www.dropcowboy.com/api/campaigns/send
{
  "team_id": "your-team-id",
  "secret": "your-secret-key",
  "phone_numbers": ["5551234567"],
  "audio_url": "https://your-server.com/voicemail.mp3",
  "caller_id": "5559876543",
  "campaign_name": "Paycile Campaign",
  "schedule_datetime": "2025-12-20T10:00:00"
}
```

---

## ✅ Current System Flow

### With ElevenLabs + DropCowboy:

1. **Campaign triggered** with voicemail node
2. **ElevenLabs generates MP3** from text script
3. **MP3 hosted** on your Paycile server
4. **DropCowboy sends** ringless voicemail
5. **Results tracked** in campaign logs

### Fallback Chain:

```
DropCowboy (if configured)
    ↓ (if fails or not configured)
Slybroadcast (if configured)
    ↓ (if fails)
Mock provider (logs but doesn't send)
```

---

## 🧪 Testing

**After adding DropCowboy credentials:**

```bash
# Test voicemail drop
curl -X POST https://opticwise-backend-uq3o.onrender.com/api/voicemail/drop \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+15551234567",
    "ttsScript": "Hello, this is a test voicemail from Paycile.",
    "callerId": "5559876543"
  }'

# Expected response:
{
  "ok": true,
  "queued": true,
  "provider": "dropcowboy",
  "id": "campaign-id-here"
}
```

---

## 📊 Provider Comparison

### DropCowboy
- ✅ Modern UI/UX
- ✅ Better reporting dashboard
- ✅ SMS capabilities included
- ✅ Multiple delivery regions
- ⏳ Requires brand registration
- 💰 $250 balance already funded

### Slybroadcast
- ✅ Already working
- ✅ No registration needed
- ✅ Proven delivery
- ✅ Current fallback
- 📊 Basic reporting

---

## 🎯 Current Status

**Code:** ✅ Integrated and deployed  
**Credentials:** ⏳ Waiting for brand registration approval  
**Fallback:** ✅ Slybroadcast working  
**ElevenLabs:** ✅ TTS generating audio  

**When Brand Registration Approved:**
1. Get team_id and secret from API page
2. Add to Render environment
3. DropCowboy becomes primary provider
4. Slybroadcast remains as failover

---

## 📝 Webhooks (Optional)

You can configure webhooks in DropCowboy to receive delivery status:

**RVM Status:** `https://opticwise-backend-uq3o.onrender.com/api/dropcowboy/rvm-status`  
**CDR (Callbacks):** `https://opticwise-backend-uq3o.onrender.com/api/dropcowboy/cdr`  
**MDR (Message Delivery):** `https://opticwise-backend-uq3o.onrender.com/api/dropcowboy/mdr`

These endpoints can be added later for tracking delivery rates.

---

## ✅ Summary

**Integration:** ✅ Complete  
**Deployment:** ✅ Code live on Render  
**Provider:** DropCowboy (with Slybroadcast fallback)  
**Todo:** Get API credentials after brand registration  

**Your voicemail system is ready to use DropCowboy as soon as you get approved!** 🎙️




