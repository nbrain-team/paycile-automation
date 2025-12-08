# Paycile Marketing Automation - Setup Guide

## 🎉 Welcome to Paycile Marketing Automation

This platform is a complete multi-channel marketing automation system built on the ADTV Event Automation foundation. It features SMS, Email, Voicemail, AI response generation, and visual workflow building capabilities.

---

## ✅ Local Setup Complete!

Your local development environment has been successfully configured:

- ✅ Root `.env` file created with all necessary environment variables
- ✅ Frontend `.env` file created (`apps/web/.env`)
- ✅ Backend dependencies installed (`apps/server`)
- ✅ Frontend dependencies installed (`apps/web`)
- ✅ PostgreSQL database created: `paycile_automation_dev`
- ✅ Database schema migrated successfully
- ✅ Branding updated from "ADTV" to "Paycile Marketing Automation"
- ✅ Backend server tested successfully (health check passing)
- ✅ Frontend build tested successfully
- ✅ Render deployment configuration updated

---

## 🚀 Running the Application Locally

### Start Backend Server

```bash
cd /Users/dannydemichele/Paycile\ Automation/adtv-event-automation/apps/server
pnpm dev
```

The backend will be available at: **http://localhost:4000**

Health check: **http://localhost:4000/health**

### Start Frontend Application

In a new terminal:

```bash
cd /Users/dannydemichele/Paycile\ Automation/adtv-event-automation/apps/web
pnpm dev
```

The frontend will be available at: **http://localhost:5173**

---

## 📊 Database Information

- **Database Name**: `paycile_automation_dev`
- **Connection String**: `postgresql://dannydemichele@localhost:5432/paycile_automation_dev?schema=public`
- **Schema**: All tables created via Prisma migrations

### Useful Database Commands

```bash
# View database tables
psql paycile_automation_dev -c "\dt"

# Access database console
psql paycile_automation_dev

# Regenerate Prisma Client
cd apps/server && pnpm prisma:generate

# Create new migration
cd apps/server && pnpm prisma migrate dev --name your_migration_name
```

---

## 🔧 Environment Variables

### Root `.env` (Already Configured)

Location: `/Users/dannydemichele/Paycile Automation/.env`

Key variables:
- `DATABASE_URL` - PostgreSQL connection (configured for local dev)
- `JWT_SECRET` - Authentication secret
- `SMS_PROVIDER=bonzo` - Using Bonzo for SMS
- `BONZO_API_KEY` - Configured from ADTV settings
- `ELEVENLABS_API_KEY` - Text-to-speech for voicemail
- `SLYBROADCAST_*` - Voicemail delivery service
- `SMTP_*` - Email configuration

### Frontend `.env` (Already Configured)

Location: `/Users/dannydemichele/Paycile Automation/adtv-event-automation/apps/web/.env`

```
VITE_API_URL=http://localhost:4000
```

---

## 🌐 Deploy to Render

### Prerequisites

1. **GitHub Account** - Create a repository for this project
2. **Render Account** - Sign up at https://render.com
3. **Environment Variables** - Ready to configure (see below)

### Step 1: Create GitHub Repository

```bash
cd /Users/dannydemichele/Paycile\ Automation/adtv-event-automation

# Initialize git if not already done
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
dist/
*.log
.DS_Store
*.db
.vscode/
.idea/
EOF

# Add files
git add .
git commit -m "Initial commit: Paycile Marketing Automation"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/paycile-automation.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Using Render Blueprint

The easiest way to deploy is using the included `render.yaml` blueprint:

1. Go to https://render.com
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the repository you just created
5. Render will automatically detect `render.yaml` and create:
   - PostgreSQL Database (`paycile-automation-db`)
   - Backend Web Service (`paycile-automation-server`)
   - Frontend Static Site (`paycile-automation-web`)

### Step 3: Configure Environment Variables

After blueprint deployment, you'll need to add these environment variables to the **backend service**:

#### Required Variables (Add Manually)

Go to your backend service → Environment → Add the following:

```bash
# SMS Provider Credentials (from your .env)
BONZO_API_KEY=<your_bonzo_api_key>
BONZO_FROM_NUMBER=+18587860101
BONZO_ON_BEHALF_OF=rick@adtvmedia.com

# Twilio (Alternative SMS)
TWILIO_ACCOUNT_SID=<your_twilio_sid>
TWILIO_AUTH_TOKEN=<your_twilio_token>
TWILIO_FROM_NUMBER=+16193047376

# ElevenLabs (Text-to-Speech)
ELEVENLABS_API_KEY=<your_elevenlabs_key>

# Slybroadcast (Voicemail)
SLYBROADCAST_USERNAME=rick@adtvmedia.com
SLYBROADCAST_PASSWORD=<your_password>
SLYBROADCAST_CALLER_ID=+16193747232

# SMTP (Email)
SMTP_USER=ivy@adtvmedia.com
SMTP_PASS=<your_smtp_password>

# Optional: Google Gemini AI
# GEMINI_API_KEY=<your_gemini_key>
```

#### Auto-Configured Variables

These are automatically set by the blueprint:
- `DATABASE_URL` - From PostgreSQL service
- `PUBLIC_BASE_URL` - From backend service URL
- `JWT_SECRET` - Auto-generated
- `NODE_ENV=production`
- `PORT=4000`

### Step 4: Verify Deployment

1. **Backend Health Check**:
   - Go to: `https://paycile-automation-server.onrender.com/health`
   - Should return: `{"ok":true}`

2. **Frontend**:
   - Go to: `https://paycile-automation-web.onrender.com`
   - Should load the Paycile Marketing Automation dashboard

3. **Check Logs**:
   - Backend: Look for "Server listening on :4000"
   - Frontend: Check for successful build output

---

## 📋 Post-Deployment Checklist

- [ ] Backend health endpoint responds
- [ ] Frontend loads successfully
- [ ] Database migrations ran successfully
- [ ] Can create a campaign
- [ ] SMS sending works (test with Bonzo)
- [ ] Email sending works (if configured)
- [ ] Voicemail generation works (if using AI features)

---

## 🔍 Testing the Platform

### Create a Test Campaign

1. Navigate to **Campaigns** page
2. Click **"Create New Campaign"**
3. Fill in campaign details
4. Add test contacts
5. Build workflow using visual editor
6. Launch campaign
7. Check **Inbox** for responses

### Test SMS Functionality

```bash
# From backend server logs, look for:
# "SMS sent via Bonzo: ..."
```

### Test Database Access

```bash
# Local
psql paycile_automation_dev -c "SELECT * FROM campaigns LIMIT 5;"

# Production (from Render dashboard)
# Use the SQL console in your database service
```

---

## 🛠 Common Issues & Solutions

### Backend Won't Start

**Issue**: `P1010: User was denied access`

**Solution**: Check `DATABASE_URL` format in `.env`:
```bash
# Local format:
DATABASE_URL=postgresql://dannydemichele@localhost:5432/paycile_automation_dev?schema=public

# Render format (auto-configured):
DATABASE_URL=postgresql://user:pass@host/dbname
```

### Frontend Can't Connect to Backend

**Issue**: CORS errors or API not responding

**Solution**: 
1. Check `VITE_API_URL` in frontend `.env`
2. Local: `http://localhost:4000`
3. Production: `https://paycile-automation-server.onrender.com`

### Build Fails on Render

**Issue**: `Module not found` or dependency errors

**Solution**:
1. Test build locally first:
   ```bash
   cd apps/server && pnpm install && pnpm build
   cd apps/web && pnpm install && pnpm build
   ```
2. Ensure `pnpm-lock.yaml` is committed to git
3. Check Render build logs for specific errors

### SMS Not Sending

**Issue**: Messages not delivering via Bonzo

**Solution**:
1. Verify `BONZO_API_KEY` is correct in environment
2. Check `SMS_PROVIDER=bonzo` is set
3. Verify phone number format: `+1XXXXXXXXXX`
4. Check Render logs for API errors

---

## 📚 Additional Resources

### Documentation

Located in `adtv-event-automation/` directory:
- `ADTV_PLATFORM_TECHNICAL_DOCUMENTATION.md` - Complete technical reference
- `DEPLOYMENT_CHECKLIST.md` - Detailed deployment steps
- `NEW_PROJECT_SETUP.md` - Original setup guide
- `RENDER_ENV_TEMPLATE.txt` - All environment variables explained

### Tech Stack

**Backend:**
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- SMS: Twilio / Bonzo
- Email: SMTP / Gmail
- Voicemail: ElevenLabs + Slybroadcast
- AI: Google Gemini
- Auth: JWT + bcrypt

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router + Zustand
- ReactFlow (workflow builder)
- Chart.js (analytics)

### Support

- Technical Documentation: See `ADTV_PLATFORM_TECHNICAL_DOCUMENTATION.md`
- API Documentation: In technical docs
- Prisma Docs: https://www.prisma.io/docs
- Render Docs: https://render.com/docs

---

## ✨ Next Steps

1. **Customize Branding**: Update colors, logo, and theme
2. **Add Integrations**: Configure Google OAuth, Gemini AI
3. **Create Campaigns**: Build your first marketing automation workflow
4. **Monitor Performance**: Use the Analytics dashboard
5. **Scale Up**: Upgrade Render services as needed

---

## 🎯 Quick Reference

### Local Development URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Health: http://localhost:4000/health

### Production URLs (After Deployment)
- Frontend: https://paycile-automation-web.onrender.com
- Backend: https://paycile-automation-server.onrender.com
- Health: https://paycile-automation-server.onrender.com/health

### Database Access
- Local: `paycile_automation_dev`
- Production: Via Render SQL console

---

**Ready to automate your marketing! 🚀**

Created: November 11, 2025
Platform: Paycile Marketing Automation
Based on: ADTV Event Automation Platform

