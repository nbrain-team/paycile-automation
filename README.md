# Paycile Marketing Automation

A complete multi-channel marketing automation platform with SMS, Email, Voicemail, AI, and visual workflow capabilities.

## 🚀 Quick Start

### Local Development

```bash
# Terminal 1 - Backend
cd adtv-event-automation/apps/server
pnpm dev

# Terminal 2 - Frontend
cd adtv-event-automation/apps/web
pnpm dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000
- **Health**: http://localhost:4000/health

## 📚 Documentation

- **[PAYCILE_SETUP_GUIDE.md](./PAYCILE_SETUP_GUIDE.md)** - Complete setup and deployment guide
- **[adtv-event-automation/ADTV_PLATFORM_TECHNICAL_DOCUMENTATION.md](./adtv-event-automation/ADTV_PLATFORM_TECHNICAL_DOCUMENTATION.md)** - Technical reference
- **[adtv-event-automation/DEPLOYMENT_CHECKLIST.md](./adtv-event-automation/DEPLOYMENT_CHECKLIST.md)** - Render deployment steps

## ✅ Setup Status

All initial setup completed:
- ✅ Environment variables configured
- ✅ Database initialized (`paycile_automation_dev`)
- ✅ Dependencies installed
- ✅ Branding updated to "Paycile Marketing Automation"
- ✅ Backend tested successfully
- ✅ Frontend tested successfully
- ✅ Render deployment configuration ready

## 🛠 Tech Stack

**Backend**: Node.js, Express, TypeScript, PostgreSQL, Prisma  
**Frontend**: React 18, TypeScript, Vite, Tailwind CSS  
**Integrations**: Bonzo/Twilio (SMS), ElevenLabs (TTS), Slybroadcast (Voicemail), SMTP (Email)

## 🌐 Deploy to Render

See **[PAYCILE_SETUP_GUIDE.md](./PAYCILE_SETUP_GUIDE.md)** for complete deployment instructions.

Quick steps:
1. Push to GitHub
2. Create Render Blueprint from `render.yaml`
3. Configure environment variables
4. Deploy!

## 📂 Project Structure

```
/Users/dannydemichele/Paycile Automation/
├── .env                              # Root environment config
├── PAYCILE_SETUP_GUIDE.md           # Complete setup guide
├── README.md                         # This file
└── adtv-event-automation/           # Main application
    ├── apps/
    │   ├── server/                  # Backend API
    │   │   ├── prisma/             # Database schema
    │   │   └── src/                # TypeScript source
    │   └── web/                    # Frontend React app
    │       ├── src/                # React components
    │       └── .env                # Frontend config
    ├── render.yaml                  # Render Blueprint
    └── [documentation files]
```

## 🎯 Next Steps

1. Run the application locally (see Quick Start above)
2. Review the **PAYCILE_SETUP_GUIDE.md** for detailed information
3. Customize branding and features as needed
4. Deploy to Render when ready

---

**Built on**: ADTV Event Automation Platform  
**Created**: November 11, 2025  
**Platform**: Paycile Marketing Automation

