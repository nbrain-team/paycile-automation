# 🚀 Deployment Checklist for Render

## Pre-Deployment Preparation

### 1. Code Repository
- [ ] Create GitHub repository
- [ ] Push all code to main branch
- [ ] Ensure `.gitignore` excludes `.env`, `node_modules`, `dist`
- [ ] Verify all files are committed
- [ ] Repository is set to public or Render has access

### 2. Environment Variables Ready
- [ ] Complete list of all required env vars
- [ ] All API keys obtained
- [ ] Database connection string format verified
- [ ] JWT secret generated (min 32 characters)
- [ ] Third-party service accounts created

### 3. Dependencies Check
- [ ] All `package.json` files up to date
- [ ] `pnpm-lock.yaml` committed
- [ ] No missing dependencies
- [ ] Build scripts tested locally

---

## Render Account Setup

### 1. Create Render Account
- [ ] Sign up at https://render.com
- [ ] Verify email address
- [ ] (Optional) Add payment method for paid plans
- [ ] (Optional) Enable 2FA for security

### 2. Connect GitHub
- [ ] Link GitHub account to Render
- [ ] Grant Render access to your repository
- [ ] Verify connection successful

---

## Database Deployment

### 1. Create PostgreSQL Database
- [ ] Dashboard → New → PostgreSQL
- [ ] Configure database:
  - **Name**: `your-project-db`
  - **Database Name**: `your_project_prod`
  - **Region**: Oregon (or closest)
  - **Plan**: Free ($0) or Starter ($7/mo)
- [ ] Click "Create Database"
- [ ] Wait for database to provision (2-5 minutes)

### 2. Get Database Connection
- [ ] Copy "Internal Database URL"
- [ ] Save for backend configuration
- [ ] Note: External URL only needed for local connections

### 3. Database Health Check
- [ ] Status shows "Available"
- [ ] Connection info accessible
- [ ] (Optional) Test connection from local machine

---

## Backend Deployment

### 1. Create Web Service
- [ ] Dashboard → New → Web Service
- [ ] Connect GitHub repository
- [ ] Configure basic settings:
  - **Name**: `your-project-server`
  - **Region**: Same as database
  - **Branch**: `main`
  - **Root Directory**: `apps/server`
  - **Environment**: `Node`

### 2. Configure Build & Start
- [ ] **Build Command**:
  ```bash
  pnpm install && pnpm build
  ```
- [ ] **Start Command**:
  ```bash
  pnpm start
  ```

### 3. Select Instance Type
- [ ] **Free** ($0/mo):
  - Spins down after inactivity
  - 512 MB RAM, 0.1 CPU
- [ ] **Starter** ($7/mo):
  - Always on
  - 512 MB RAM, 0.5 CPU
- [ ] **Standard** or higher (for production)

### 4. Environment Variables
Add all variables from `RENDER_ENV_TEMPLATE.txt`:

**Required:**
- [ ] `DATABASE_URL` → Use "Internal Database URL"
- [ ] `JWT_SECRET` → Generate: `openssl rand -base64 32`
- [ ] `NODE_ENV` → `production`
- [ ] `PORT` → `4000`
- [ ] `PUBLIC_BASE_URL` → Will update after deployment

**Optional (based on features needed):**
- [ ] Twilio credentials (for SMS)
- [ ] Google OAuth credentials (for Gmail)
- [ ] Gemini API key (for AI)
- [ ] ElevenLabs credentials (for TTS)
- [ ] Slybroadcast credentials (for voicemail)
- [ ] SMTP credentials (for email)

### 5. Deploy Backend
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Check build logs for errors
- [ ] Verify deployment successful

### 6. Update PUBLIC_BASE_URL
- [ ] Copy backend service URL (e.g., `https://your-project-server.onrender.com`)
- [ ] Go to Environment tab
- [ ] Update `PUBLIC_BASE_URL` with this URL
- [ ] Save changes
- [ ] Service will restart automatically

### 7. Backend Health Check
- [ ] Visit `https://your-project-server.onrender.com/health`
- [ ] Should return: `{"ok":true}`
- [ ] Check logs for startup messages
- [ ] Verify database connection successful

---

## Frontend Deployment

### 1. Create Static Site
- [ ] Dashboard → New → Static Site
- [ ] Connect GitHub repository
- [ ] Configure settings:
  - **Name**: `your-project-web`
  - **Region**: Same as backend
  - **Branch**: `main`
  - **Root Directory**: Leave empty (root)

### 2. Configure Build
- [ ] **Build Command**:
  ```bash
  cd apps/web && pnpm install && pnpm build
  ```
- [ ] **Publish Directory**:
  ```
  apps/web/dist
  ```

### 3. Environment Variables
- [ ] Add `VITE_API_URL` with backend URL:
  ```
  https://your-project-server.onrender.com
  ```

### 4. Deploy Frontend
- [ ] Click "Create Static Site"
- [ ] Wait for build (3-5 minutes)
- [ ] Check build logs
- [ ] Verify deployment successful

### 5. Configure Redirects (SPA Support)
This should be automatic with `static.json`, but verify:
- [ ] All routes redirect to `/index.html`
- [ ] 404 page loads the app
- [ ] Direct navigation to routes works

### 6. Frontend Health Check
- [ ] Visit frontend URL
- [ ] App loads successfully
- [ ] No console errors
- [ ] Can navigate between pages
- [ ] API calls reach backend

---

## Post-Deployment Configuration

### 1. CORS & API Connection
- [ ] Frontend can reach backend
- [ ] No CORS errors in console
- [ ] Network tab shows successful API calls

### 2. Database Verification
- [ ] Migrations ran successfully
- [ ] Tables created
- [ ] Can create/read data
- [ ] No connection pool errors

### 3. External Services
**If using SMS:**
- [ ] Twilio credentials working
- [ ] Can send test SMS
- [ ] Webhooks configured (if using inbound)

**If using Email:**
- [ ] SMTP connection working
- [ ] Can send test email
- [ ] Gmail OAuth working (if configured)

**If using Voicemail:**
- [ ] ElevenLabs TTS generating audio
- [ ] Slybroadcast accepting drops
- [ ] Audio URLs accessible

**If using AI:**
- [ ] Gemini API responding
- [ ] Token limits sufficient
- [ ] Response generation working

### 4. Authentication
- [ ] Can create user account
- [ ] Login works
- [ ] JWT tokens generated
- [ ] Protected routes work
- [ ] Logout functions properly

---

## Testing Checklist

### Critical User Flows
- [ ] **Create Campaign**
  - Can create new campaign
  - Template assignment works
  - Graph cloning successful

- [ ] **Import Contacts**
  - CSV upload works
  - Contacts saved to database
  - Relationships created

- [ ] **Send Messages**
  - SMS sending functional
  - Email sending functional
  - Messages logged to conversations

- [ ] **Inbox**
  - Conversations load
  - Messages display correctly
  - Can send replies

- [ ] **Analytics**
  - Dashboard loads stats
  - Charts render
  - Data accurate

### Edge Cases
- [ ] Large file uploads
- [ ] Many contacts (100+)
- [ ] Concurrent users
- [ ] Network errors handled gracefully
- [ ] Invalid input validation

---

## Performance Optimization

### Backend
- [ ] Database connection pooling active
- [ ] Query optimization (no N+1 queries)
- [ ] Response times acceptable (<500ms avg)
- [ ] Memory usage stable

### Frontend
- [ ] Initial load time <3 seconds
- [ ] Images optimized
- [ ] Code splitting effective
- [ ] No memory leaks

### Database
- [ ] Indexes on frequently queried fields
- [ ] No missing foreign keys
- [ ] Vacuum/analyze scheduled

---

## Monitoring Setup

### Render Dashboard
- [ ] Enable email alerts for:
  - Service failures
  - Deploy failures
  - High error rates
- [ ] Check metrics regularly:
  - Response times
  - Error rates
  - Memory usage
  - CPU usage

### Application Logging
- [ ] Logs accessible in Render dashboard
- [ ] Error logs searchable
- [ ] No sensitive data in logs
- [ ] Log retention adequate

### External Monitoring (Optional)
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics, Mixpanel)

---

## Security Hardening

### Environment Variables
- [ ] No secrets in code
- [ ] All secrets in Render env vars
- [ ] JWT_SECRET is unique and secure
- [ ] API keys have minimal permissions

### Database
- [ ] Database not publicly accessible
- [ ] Strong password
- [ ] Backups enabled
- [ ] Connection from Render only

### API Security
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Rate limiting (consider for future)

### Third-Party Services
- [ ] 2FA enabled where possible
- [ ] Webhook secrets configured
- [ ] API keys rotated regularly
- [ ] Minimal scope/permissions

---

## Custom Domain (Optional)

### 1. Purchase Domain
- [ ] Buy domain from registrar (Namecheap, Google Domains, etc.)
- [ ] Domain DNS accessible

### 2. Configure Frontend Domain
- [ ] Render → Static Site → Settings → Custom Domain
- [ ] Add domain (e.g., `app.yourdomain.com`)
- [ ] Copy DNS records provided
- [ ] Update registrar DNS:
  - CNAME: `app` → `your-project-web.onrender.com`
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify SSL certificate issued

### 3. Configure Backend Domain (Optional)
- [ ] Add subdomain for API (e.g., `api.yourdomain.com`)
- [ ] Render → Web Service → Settings → Custom Domain
- [ ] Update DNS as instructed
- [ ] Update frontend `VITE_API_URL` to new domain
- [ ] Redeploy frontend

### 4. Update OAuth Redirects
- [ ] Update Google OAuth redirect URI
- [ ] Update any webhook URLs
- [ ] Test OAuth flow with new domain

---

## Documentation

### Internal Documentation
- [ ] Document all environment variables
- [ ] Record database schema changes
- [ ] Note any custom configurations
- [ ] Track API endpoints added/modified

### Team Knowledge
- [ ] Share Render dashboard access
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Set up team communication for alerts

---

## Backup & Disaster Recovery

### Database Backups
- [ ] Automated backups enabled (Render does this)
- [ ] Know how to restore from backup
- [ ] Test restore process once
- [ ] Document backup retention policy

### Application State
- [ ] Code in version control (GitHub)
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Recovery plan exists

### Rollback Plan
- [ ] Know how to redeploy previous version
- [ ] Database migration rollback strategy
- [ ] Contact list for emergency

---

## Launch Preparation

### Final Pre-Launch Checks
- [ ] All features tested end-to-end
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser tested (Chrome, Firefox, Safari)
- [ ] Error messages user-friendly
- [ ] Loading states implemented

### Performance Baseline
- [ ] Record initial metrics:
  - Average response time: _______
  - Pages per second: _______
  - Error rate: _______
  - Active users: _______

### Support Preparation
- [ ] User documentation ready
- [ ] Support email configured
- [ ] FAQ prepared
- [ ] Feedback mechanism in place

---

## Post-Launch

### Week 1
- [ ] Monitor logs daily
- [ ] Check error rates
- [ ] Respond to user feedback
- [ ] Fix critical bugs immediately

### Week 2-4
- [ ] Review performance metrics
- [ ] Optimize slow queries
- [ ] Plan feature improvements
- [ ] Scale resources if needed

### Ongoing
- [ ] Regular dependency updates
- [ ] Security patches
- [ ] Feature development
- [ ] User feedback incorporation

---

## Troubleshooting Common Issues

### "Service Unavailable"
**Possible causes:**
- Build failed
- Start command incorrect
- Port not configured
- Environment variables missing

**Check:**
- Build logs for errors
- Environment tab for PORT=4000
- Start command: `pnpm start`
- Database connection string

### "Database Connection Failed"
**Possible causes:**
- Wrong DATABASE_URL
- Database not running
- Network issue

**Check:**
- DATABASE_URL is Internal URL
- Database status is "Available"
- Apps in same region

### "CORS Error"
**Possible causes:**
- Wrong API URL in frontend
- CORS not configured in backend

**Check:**
- Frontend VITE_API_URL matches backend URL
- Backend has cors() middleware
- No trailing slashes in URLs

### "Build Timeout"
**Possible causes:**
- Build taking too long
- Dependencies downloading slowly
- Build command incorrect

**Solutions:**
- Use `pnpm` (faster than npm)
- Check build command
- Upgrade to paid plan for more resources

---

## Success Criteria

Your deployment is successful when:

✅ Backend health check returns `{"ok":true}`  
✅ Frontend loads without errors  
✅ Can create and view campaigns  
✅ Can send messages (SMS/Email)  
✅ Database persists data across deploys  
✅ External integrations work  
✅ No critical bugs  
✅ Performance is acceptable  
✅ Monitoring is active  

---

## 🎉 Congratulations!

You've successfully deployed the ADTV Event Automation Platform to Render!

**Next steps:**
1. Share the URL with your team
2. Start creating campaigns
3. Monitor performance and iterate
4. Customize for your specific use case

**Need help?**
- Render Docs: https://render.com/docs
- Check logs in Render dashboard
- Review technical documentation
- Open GitHub issue for bugs

---

**Deployment completed**: _____________ (date)  
**Deployed by**: _____________  
**Frontend URL**: _____________  
**Backend URL**: _____________  
**Database**: _____________

