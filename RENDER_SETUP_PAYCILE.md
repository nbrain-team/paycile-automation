# Paycile Render Setup & Configuration

## ⚠️ CRITICAL: Services Need Reconfiguration

Both Render services are currently misconfigured as **Ruby** services. They need to be **Node.js** services.

---

## 🔧 Backend Service Configuration

**Service:** `Paycile-Automation-Backend` (srv-d4ec9pnpm1nc738ovl1g)  
**URL:** https://paycile-automation-backend.onrender.com

### Step 1: Update Service Settings

Go to: https://dashboard.render.com/web/srv-d4ec9pnpm1nc738ovl1g/settings

**Change these settings:**

| Setting | Current Value | **New Value** |
|---------|--------------|---------------|
| **Runtime** | Ruby | **Node** |
| **Build Command** | `bundle install` | **`cd apps/server && pnpm install && pnpm build`** |
| **Start Command** | `npm start` | **`cd apps/server && pnpm start`** |
| **Health Check Path** | (empty) | **`/health`** |

### Step 2: Add Environment Variables

Go to: https://dashboard.render.com/web/srv-d4ec9pnpm1nc738ovl1g/environment

**Add these environment variables:**

```bash
# Core Settings
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://paycile_automation_db_user:1H0KFp9XLNvcanTHE1aGop7CQY8SsUSf@dpg-d4eca47gi27c73ck9pvg-a/paycile_automation_db
PUBLIC_BASE_URL=https://paycile-automation-backend.onrender.com
JWT_SECRET=paycile-jwt-secret-2025-secure-key-change-in-production

# SMS Provider (Bonzo)
SMS_PROVIDER=bonzo
BONZO_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiMmMzYWY5OTgxNmM2NGM1OTc3MTc3NDJjMjlmZDJjODlhYzM0YjIzMTU1Nzc2OGZlYmYxYTMzOTRmZmY5ZGFiYmIwMzU5YWJlODYwZDA1YTkiLCJpYXQiOjE3NTk3OTA4MzIuNzcxMzY0LCJuYmYiOjE3NTk3OTA4MzIuNzcxMzY3LCJleHAiOjE3OTEzMjY4MzIuNzU3ODY4LCJzdWIiOiIyNzg1OCIsInNjb3BlcyI6WyJhY2Nlc3MtcHVibGljIiwiYWNjZXNzLWF1dGhlbnRpY2F0ZWQiLCJwcm9zcGVjdHMiLCJwaXBlbGluZXMiLCJjYW1wYWlnbnMiLCJjb252ZXJzYXRpb25zIiwibWVzc2FnaW5nIl19.Xg7ZHf7X4yWLzaGYUxUF8ko6zBKevUWXrAhZg_Vxm5I7LIZ_flXSGStH89OEYlcdCmish6zpAFMj7ynw0Yqe7NsYrvHSgPIYD8sH8gcCgmFG1JGjGwngSr8EM6lvP-KTsGvE_Zt66li0_VWRkyy5ONein_W-amOY8cQQyfx4a1-26aoo4Gihs3ihEASMMW9HVc6ePbOsEcK0wQdKOyvsPqMcMMUYUqhXA3OcXWPgNCdCSmxvwZd12pElMpFfJ_9gC5aRoRg4kfSShj9UunXRKaU6s3JMMF9aSah3BVpbEqFjKa1n7QRvwlGL0r-Hv9ykM8R33ifDzS0GNq5L9-YY-KRUsr1eUcz0_pBd2AwixwWxVHws3jNiwl0B2l9am3B-hYeVI9A2PH1aDQPYlP6MNdfDpNAGHUy0HtmLON0-VmVSB698HNs5uH-8KZX8yCGgSAS6s4ojy8b8nfTk1ixkMsFkqIlVk-xHuvdrY-q6iGLLec0kdl4OG_ae9jiGVQUfovAxXJtxcNLNgCF757fekbuCzIIch7PEymwbsS-H-iFBSD8p4IUOuioWCnN25_yIlNNhW4YZoeDDTVRhLCayUsTXU2bH3HGvsFdaLu9yAj3PVSHDBHtzuy9jh43gBeMAt0CkXqHso9vb_VpnFgPJMtLD-LDIMqssmD0oZ9xH0M4
BONZO_API_BASE_URL=https://app.getbonzo.com/api
BONZO_FROM_NUMBER=+18587860101
BONZO_ON_BEHALF_OF=rick@adtvmedia.com

# Voicemail Provider (Slybroadcast)
VOICEMAIL_PROVIDER=slybroadcast
SLYBROADCAST_USERNAME=rick@adtvmedia.com
SLYBROADCAST_PASSWORD=Ignite0099
SLYBROADCAST_CALLER_ID=+16193747232
SLYBROADCAST_API_BASE_URL=https://www.mobile-sphere.com/gateway/vmb.php

# ElevenLabs TTS
ELEVENLABS_API_KEY=a52e9de63e022be4319a1319aaabc06ad812d3c3a1dc9434100914ade40dd812
ELEVENLABS_VOICE_ID=WzEaNiZ7hcVOsge5QDNT
ELEVENLABS_MODEL_ID=eleven_flash_v2_5

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=ivy@adtvmedia.com
SMTP_PASS=ncax fhum pnef qftp
SMTP_SECURE=true

# Twilio (Backup SMS)
TWILIO_ACCOUNT_SID=ACc9d72a11329b934d1326253a49dfc1e4
TWILIO_AUTH_TOKEN=4ca1169b7204166498ed33bbe399a798
TWILIO_FROM_NUMBER=+16193047376

# AI Services
OPENAI_API_KEY=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
APOLLO_API_KEY=cCXNmyS6zpMPko6Hoy-87Q
GEMINI_API_KEY=(add if you have one)
```

---

## 🌐 Frontend Service Configuration

**Service:** `Paycile-Automation-Frontend` (srv-d4ec92m3jp1c73c3ate0)  
**URL:** https://paycile-automation.onrender.com

### Step 1: Update Service Settings

Go to: https://dashboard.render.com/web/srv-d4ec92m3jp1c73c3ate0/settings

**Change these settings:**

| Setting | Current Value | **New Value** |
|---------|--------------|---------------|
| **Runtime** | Ruby | **Static Site** (or Node if not available) |
| **Build Command** | `bundle install` | **`cd apps/web && pnpm install && pnpm build`** |
| **Publish Directory** | (empty) | **`apps/web/dist`** |

### Step 2: Add Environment Variables

Go to: https://dashboard.render.com/web/srv-d4ec92m3jp1c73c3ate0/environment

**Add this environment variable:**

```bash
VITE_API_URL=https://paycile-automation-backend.onrender.com
```

---

## 📊 Database Configuration

**Database:** `paycile-automation-db` (dpg-d4eca47gi27c73ck9pvg)

✅ **Already correctly configured:**
- Username: `paycile_automation_db_user`
- Password: `1H0KFp9XLNvcanTHE1aGop7CQY8SsUSf`
- Internal URL: `postgresql://paycile_automation_db_user:1H0KFp9XLNvcanTHE1aGop7CQY8SsUSf@dpg-d4eca47gi27c73ck9pvg-a/paycile_automation_db`

---

## 🚀 Deployment Steps

### 1. Push Code to GitHub

**You need to push manually since I don't have GitHub credentials:**

```bash
cd "/Users/dannydemichele/Paycile Automation/adtv-event-automation"

# Verify remote is correct
git remote -v
# Should show: https://github.com/nbrain-team/paycile-automation.git

# Push changes (you'll need to authenticate)
git push origin main
```

### 2. Configure Render Services

1. **Backend:**
   - Go to https://dashboard.render.com/web/srv-d4ec9pnpm1nc738ovl1g/settings
   - Update Runtime, Build Command, Start Command (see table above)
   - Add all environment variables
   - Click "Save Changes"

2. **Frontend:**
   - Go to https://dashboard.render.com/web/srv-d4ec92m3jp1c73c3ate0/settings
   - Update Runtime, Build Command, Publish Directory
   - Add VITE_API_URL environment variable
   - Click "Save Changes"

### 3. Trigger Manual Deploy

After configuration:
- Go to each service dashboard
- Click "Manual Deploy" → "Deploy latest commit"
- Wait for build to complete (~5-10 minutes)

### 4. Restore Templates via Shell

Once backend is deployed and running:

1. Go to: https://dashboard.render.com/web/srv-d4ec9pnpm1nc738ovl1g/shell
2. Paste this script:

```bash
#!/bin/bash
set -e
echo "🔧 Paycile Template Restoration"
cd /opt/render/project/src/apps/server
echo "✓ Located server directory"
npx prisma generate
echo "✓ Prisma client ready"
node scripts/seed_paycile_templates.js
echo "✅ Template restoration complete!"
echo "Templates restored:"
echo "  📊 4 Funnel Templates"
echo "  📧 12 Content Templates"
```

3. Press Enter and wait ~30 seconds

### 5. Verify Deployment

**Backend Health Check:**
```bash
curl https://paycile-automation-backend.onrender.com/health
# Expected: {"ok":true}
```

**Frontend:**
- Open: https://paycile-automation.onrender.com
- Should see Paycile logo and "Marketing Automation"
- Navigate to "Funnel Templates" to see restored templates

---

## 🔍 Troubleshooting

### Backend won't start
- Check logs: https://dashboard.render.com/web/srv-d4ec9pnpm1nc738ovl1g/logs
- Verify DATABASE_URL is correct
- Ensure all required env vars are set

### Frontend shows API errors
- Verify VITE_API_URL points to backend
- Check backend is running and healthy
- Look at browser console for errors

### Templates not showing
- Run the shell script to seed templates
- Check backend logs for database errors
- Verify DATABASE_URL connection

---

## 📝 Summary of Changes Made

✅ **Local Changes (Committed, Ready to Push):**
- Reverted branding to Paycile (logo + name)
- Added template seed scripts
- Added render.yaml for deployment
- Updated AppLayout with Paycile branding

⚠️ **Render Configuration Needed:**
- Backend: Change from Ruby → Node.js
- Frontend: Change from Ruby → Static Site
- Add all environment variables
- Deploy both services

🔄 **After Deployment:**
- Run template restoration script in backend shell
- Verify health endpoints
- Test frontend loads correctly

---

## 🎯 Next Steps

1. **Push to GitHub** (you need to authenticate)
2. **Configure Render services** (follow tables above)
3. **Deploy services** (manual deploy after config)
4. **Restore templates** (run shell script)
5. **Test everything** (health check + frontend)

---

**Need Help?**
- Backend Dashboard: https://dashboard.render.com/web/srv-d4ec9pnpm1nc738ovl1g
- Frontend Dashboard: https://dashboard.render.com/web/srv-d4ec92m3jp1c73c3ate0
- Database Dashboard: https://dashboard.render.com/d/dpg-d4eca47gi27c73ck9pvg






