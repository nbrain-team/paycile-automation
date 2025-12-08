# New Cursor Project Setup Guide

## 📦 Complete Migration Package for New Project

This guide will help you set up a new Cursor project using this codebase as a foundation.

---

## 🚀 Quick Start

### Step 1: Copy Project Files

Copy the entire `apps/` directory to your new project location:

```bash
# Navigate to your new project directory
mkdir my-new-project
cd my-new-project

# Copy the application files
cp -r /path/to/adtv-event-automation/apps ./

# Copy configuration files
cp /path/to/adtv-event-automation/static.json ./
cp /path/to/adtv-event-automation/templates.csv ./

# Copy documentation (optional but recommended)
cp /path/to/adtv-event-automation/ADTV_PLATFORM_TECHNICAL_DOCUMENTATION.md ./
```

### Step 2: Initialize Git

```bash
git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
echo "*.log" >> .gitignore
echo ".DS_Store" >> .gitignore
git add .
git commit -m "Initial commit: Base platform"
```

### Step 3: Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm@10.12.4

# Install backend dependencies
cd apps/server
pnpm install

# Install frontend dependencies
cd ../web
pnpm install
```

### Step 4: Setup Environment Variables

Create `.env` file in the root directory:

```bash
cp RENDER_ENV_TEMPLATE.txt .env
```

Edit `.env` with your credentials (see Environment Configuration section below).

### Step 5: Setup Database

```bash
cd apps/server

# Generate Prisma Client
pnpm prisma:generate

# Run migrations
pnpm prisma:deploy

# (Optional) Seed with sample data
# node scripts/seed_campaign.js
```

### Step 6: Start Development

```bash
# Terminal 1 - Backend
cd apps/server
pnpm dev

# Terminal 2 - Frontend  
cd apps/web
pnpm dev
```

**Access your app:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Health Check: http://localhost:4000/health

---

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory with these variables:

```bash
# ===========================
# DATABASE
# ===========================
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# ===========================
# APPLICATION
# ===========================
PORT=4000
PUBLIC_BASE_URL="http://localhost:4000"
NODE_ENV=development

# ===========================
# AUTHENTICATION
# ===========================
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long-change-this"

# ===========================
# TWILIO (SMS) - Optional but recommended
# ===========================
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token"
TWILIO_PHONE_NUMBER="+15551234567"

# ===========================
# GOOGLE (OAuth & Gmail) - Optional
# ===========================
GOOGLE_CLIENT_ID="your-app.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxxxxxxxxx"
GOOGLE_REDIRECT_URI="http://localhost:4000/api/auth/google/callback"

# ===========================
# GOOGLE GEMINI AI - Optional
# ===========================
GEMINI_API_KEY="AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# ===========================
# ELEVENLABS (Text-to-Speech) - Optional
# ===========================
ELEVENLABS_API_KEY="your_elevenlabs_api_key"
ELEVENLABS_VOICE_ID="21m00Tcm4TlvDq8ikWAM"
ELEVENLABS_MODEL_ID="eleven_flash_v2_5"

# ===========================
# SLYBROADCAST (Voicemail) - Optional
# ===========================
SLYBROADCAST_USERNAME="your_email@example.com"
SLYBROADCAST_PASSWORD="your_password"
SLYBROADCAST_CALLER_ID="+15551234567"
SLYBROADCAST_API_BASE_URL="https://www.mobile-sphere.com/gateway/vmb.php"

# ===========================
# SMTP (Email) - Optional
# ===========================
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_specific_password"
SMTP_SECURE=true

# ===========================
# SMS PROVIDER SELECTION
# ===========================
SMS_PROVIDER="twilio"
```

### Frontend Environment Variables

Create `apps/web/.env`:

```bash
VITE_API_URL="http://localhost:4000"
```

---

## 📊 Database Setup

### Option 1: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# Create database
createdb myproject_dev

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://localhost:5432/myproject_dev?schema=public"
```

### Option 2: Docker PostgreSQL

```bash
# Create docker-compose.yml in root
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: myproject_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOF

# Start database
docker-compose up -d

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/myproject_dev?schema=public"
```

### Run Migrations

```bash
cd apps/server
pnpm prisma:generate
pnpm prisma:deploy
```

---

## 🚢 Render Deployment

### Prerequisites

1. GitHub account
2. Render account (free tier available)
3. PostgreSQL database on Render

### Step 1: Create GitHub Repository

```bash
# In your project root
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### Step 2: Create Render Database

1. Go to https://render.com
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `myproject-db`
   - Database: `myproject_prod`
   - User: (auto-generated)
   - Region: Oregon (or closest to you)
   - Instance Type: Free or Starter ($7/mo)
4. Click "Create Database"
5. Copy the "Internal Database URL" for the next step

### Step 3: Create Backend Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `myproject-server`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `apps/server`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`
   - **Instance Type**: Free or Starter
4. Add Environment Variables (see RENDER_ENV_TEMPLATE.txt)
5. Click "Create Web Service"

### Step 4: Create Frontend Static Site

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `myproject-web`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `.`
   - **Build Command**: `cd apps/web && pnpm install && pnpm build`
   - **Publish Directory**: `apps/web/dist`
4. Add Environment Variable:
   - `VITE_API_URL`: `https://myproject-server.onrender.com`
5. Click "Create Static Site"

### Step 5: Configure Custom Domains (Optional)

In each service:
1. Go to "Settings" → "Custom Domain"
2. Add your domain
3. Update DNS records as instructed

---

## 📝 Customization Guide

### 1. Branding

**Update Application Name:**
- `apps/web/index.html` - `<title>` tag
- `apps/web/src/pages/*.tsx` - Page titles
- `apps/server/package.json` - `name` field

**Update Styling:**
- `apps/web/tailwind.config.ts` - Color scheme
- `apps/web/src/styles.css` - Global styles

### 2. Database Schema

Edit `apps/server/prisma/schema.prisma`:

```prisma
// Add your custom models
model MyCustomModel {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
}
```

Then generate and migrate:

```bash
cd apps/server
pnpm prisma:generate
pnpm prisma migrate dev --name add_custom_model
```

### 3. Add New API Endpoints

Edit `apps/server/src/index.ts`:

```typescript
// Add your custom endpoints
app.get('/api/custom', async (req, res) => {
  try {
    const data = await prisma.myCustomModel.findMany();
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: e?.message });
  }
});
```

### 4. Add New Pages

Create new file in `apps/web/src/pages/MyPage.tsx`:

```typescript
import { AppLayout } from '../shared/AppLayout';

export function MyPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">My Custom Page</h1>
      </div>
    </AppLayout>
  );
}
```

Update `apps/web/src/main.tsx` routes:

```typescript
<Route path="/my-page" element={<MyPage />} />
```

---

## 🧪 Testing

### Local Testing Checklist

- [ ] Backend health check: `curl http://localhost:4000/health`
- [ ] Frontend loads: http://localhost:5173
- [ ] Database connection works
- [ ] API endpoints respond
- [ ] Environment variables loaded

### Production Testing Checklist

- [ ] Render services deployed successfully
- [ ] Database migrations ran
- [ ] Environment variables set
- [ ] Health endpoints accessible
- [ ] Frontend connects to backend
- [ ] Authentication works
- [ ] External integrations functioning

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to a unique value
- [ ] Never commit `.env` file to Git
- [ ] Use app-specific passwords for email
- [ ] Enable 2FA on all third-party services
- [ ] Restrict database access to Render IPs
- [ ] Use HTTPS in production
- [ ] Regularly update dependencies

---

## 📚 Additional Resources

- **Technical Documentation**: See `ADTV_PLATFORM_TECHNICAL_DOCUMENTATION.md`
- **API Documentation**: See "API Documentation" section in tech docs
- **Prisma Docs**: https://www.prisma.io/docs
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com
- **Render Docs**: https://render.com/docs

---

## 🆘 Troubleshooting

### Build Fails on Render

**Issue**: "Module not found" or dependency errors

**Solution**:
```bash
# Locally test the exact build commands
cd apps/server
pnpm install && pnpm build

cd apps/web
pnpm install && pnpm build
```

### Database Connection Fails

**Issue**: "Can't reach database server"

**Solution**:
- Check DATABASE_URL is correct
- Ensure database is running
- Verify network connectivity
- Check Render database status

### Environment Variables Not Loading

**Issue**: Features not working in production

**Solution**:
- Verify all env vars are set in Render dashboard
- Check for typos in variable names
- Restart services after updating env vars

### CORS Errors

**Issue**: Frontend can't reach backend

**Solution**:
- Update `VITE_API_URL` in frontend env
- Verify backend CORS settings
- Check network tab for exact error

---

## 🎯 Next Steps

After basic setup:

1. **Customize for Your Use Case**
   - Update branding and styling
   - Add/remove features as needed
   - Customize database schema

2. **Add Your Integrations**
   - Configure Twilio for SMS
   - Set up Gmail OAuth
   - Add AI capabilities with Gemini

3. **Deploy to Production**
   - Follow Render deployment steps
   - Configure custom domain
   - Set up monitoring

4. **Enhance & Scale**
   - Add automated tests
   - Implement CI/CD pipeline
   - Optimize performance
   - Add error tracking (Sentry)

---

## ✅ Success Criteria

Your setup is complete when:

- ✅ Local development environment runs smoothly
- ✅ All core features work (campaigns, contacts, messaging)
- ✅ Database schema is deployed
- ✅ Production deployment is live on Render
- ✅ Environment variables are configured
- ✅ External integrations are connected
- ✅ Custom branding is applied

---

**Ready to build something amazing! 🚀**

For questions or issues, refer to the technical documentation or create an issue in your repository.

