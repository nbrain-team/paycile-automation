# Template Save Error Fix - Deployment Guide

## Problem Summary
Users were unable to save edits to content templates (email, SMS, voicemail) in the Funnel Templates page. The error showed a 400 Bad Request with a malformed URL.

## Root Cause
The `VITE_API_URL` environment variable was not properly configured in production, causing API requests to fail. The `render.yaml` file referenced a service name (`paycile-automation-server`) that didn't match the actual backend service (`opticwise-backend-uq3o`).

## Solution Implemented

### 1. Runtime Configuration System
Created a runtime configuration system that allows the API URL to be changed without rebuilding the application.

**Files Created:**
- `adtv-event-automation/apps/web/public/config.js` - Runtime configuration file

**Files Modified:**
- `adtv-event-automation/apps/web/index.html` - Added config.js script loader
- `adtv-event-automation/apps/web/src/lib/api.ts` - Added runtime config support
- `adtv-event-automation/apps/web/src/pages/TemplatesFunnel.tsx` - Updated to use getApiUrl()
- `adtv-event-automation/apps/web/src/pages/CampaignBuilder.tsx` - Updated to use getApiUrl()
- `adtv-event-automation/apps/web/src/pages/Settings.tsx` - Updated to use getApiUrl()

### 2. How It Works

**Before:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
```
- API URL was baked into the build at build time
- If environment variable wasn't set during build, it would be wrong in production

**After:**
```typescript
const getApiUrl = () => {
  return window.ENV?.VITE_API_URL ||           // Runtime config (NEW)
         import.meta.env?.VITE_API_URL ||      // Build-time env var
         'http://localhost:4000';               // Fallback for local dev
};
```
- Checks runtime config first (can be changed without rebuild)
- Falls back to build-time env var
- Falls back to localhost for development

### 3. Configuration File
The `config.js` file is loaded before the app starts and provides the API URL:

```javascript
window.ENV = {
  VITE_API_URL: 'https://opticwise-backend-uq3o.onrender.com'
};
```

This file is in the `public/` folder, so it's:
- Copied to the build output as-is
- Not processed by Vite
- Can be edited in production without rebuilding

## Deployment Steps

### Option A: Quick Fix (No Rebuild Required)

If you have access to the deployed files on Render:

1. Navigate to the deployed static files directory
2. Edit the `config.js` file to ensure it has the correct API URL:
   ```javascript
   window.ENV = {
     VITE_API_URL: 'https://opticwise-backend-uq3o.onrender.com'
   };
   ```
3. Save the file
4. Clear browser cache and refresh

### Option B: Full Deployment (Recommended)

1. **Commit and push the changes:**
   ```bash
   cd /Users/dannydemichele/Paycile\ Automation
   git add .
   git commit -m "Fix template save error with runtime API configuration"
   git push origin main
   ```

2. **Render will automatically deploy** the changes to the `paycile-automation-web` service

3. **Verify the deployment:**
   - Wait for the build to complete in Render dashboard
   - Check the build logs for any errors
   - Verify the `config.js` file is included in the build output

4. **Test the fix:**
   - Open the production site: https://paycile-automation.onrender.com
   - Open browser DevTools (F12) and go to Console
   - Type: `window.ENV.VITE_API_URL`
   - Should show: `https://opticwise-backend-uq3o.onrender.com`
   - Go to Templates page
   - Edit a content template
   - Click Save
   - Should save successfully without errors

## Verification Checklist

- [ ] Code committed and pushed to GitHub
- [ ] Render deployment completed successfully
- [ ] `config.js` file exists in deployed build
- [ ] `window.ENV.VITE_API_URL` shows correct URL in browser console
- [ ] Template editing saves without errors
- [ ] No 400 errors in browser Network tab
- [ ] Template changes persist after page refresh

## Testing Instructions

### Test Template Editing:

1. **Login to production:**
   - URL: https://paycile-automation.onrender.com
   - Email: admin@paycile.com
   - Password: Password#123

2. **Navigate to Templates:**
   - Click "Templates" in the sidebar
   - Scroll down to "Content Templates" section

3. **Edit an Email Template:**
   - Click on any email template
   - Modify the subject line or body
   - Click "Save"
   - Should see success toast message
   - Close the modal and reopen the template
   - Verify changes were saved

4. **Edit an SMS Template:**
   - Click on an SMS template
   - Modify the text
   - Click "Save"
   - Verify success

5. **Edit a Voicemail Template:**
   - Click on a voicemail template
   - Modify the TTS script
   - Click "Save"
   - Verify success

### Check Browser Console:

1. Open DevTools (F12)
2. Go to Console tab
3. Run: `window.ENV.VITE_API_URL`
4. Should output: `https://opticwise-backend-uq3o.onrender.com`
5. Run: `getApiUrl()` (if function is exposed)
6. Should output the same URL

### Check Network Tab:

1. Open DevTools (F12)
2. Go to Network tab
3. Edit and save a template
4. Look for the PATCH request to `/api/content-templates/:id`
5. Should show:
   - Status: 200 OK
   - Request URL: `https://opticwise-backend-uq3o.onrender.com/api/content-templates/...`
   - Response: JSON with updated template data

## Rollback Plan

If issues occur after deployment:

### Quick Rollback:
```bash
git revert HEAD
git push origin main
```

### Manual Fix:
If only the API URL is wrong, you can manually edit `config.js` in the deployed files without a full rollback.

## Benefits of This Solution

1. **No Rebuild Required:** API URL can be changed by editing `config.js` without rebuilding the app
2. **Environment Flexibility:** Works in any environment (local, staging, production)
3. **Backwards Compatible:** Still supports build-time environment variables
4. **Easy to Debug:** Can check `window.ENV` in browser console
5. **Future-Proof:** Can add more runtime configuration options easily

## Future Improvements

Consider these enhancements for later:

1. **Environment Detection:**
   ```javascript
   window.ENV = {
     VITE_API_URL: window.location.hostname === 'localhost' 
       ? 'http://localhost:4000'
       : 'https://opticwise-backend-uq3o.onrender.com'
   };
   ```

2. **Configuration Endpoint:**
   Create a `/api/config` endpoint that returns the correct API URL based on the environment

3. **Health Check:**
   Add a startup health check that verifies the API URL is accessible before loading the app

## Related Documentation

- `FIX_TEMPLATE_SAVE_ERROR.md` - Detailed troubleshooting guide
- `DEPLOYMENT_INSTRUCTIONS_JAN28.md` - Previous deployment instructions
- `LOGIN_CREDENTIALS.txt` - Login credentials for testing

## Support

If you encounter issues:

1. Check Render build logs for errors
2. Verify `config.js` exists in the deployed build
3. Check browser console for API URL
4. Look for CORS errors in console
5. Verify backend is accessible at the configured URL
6. Check Network tab for failed requests

## Technical Notes

### Why Runtime Config Instead of Build-Time?

**Build-Time Environment Variables (Vite):**
- Baked into the JavaScript bundle during build
- Requires rebuild to change
- Can't be different per environment without multiple builds

**Runtime Configuration:**
- Loaded when the app starts
- Can be changed without rebuild
- Same build works in all environments
- Easier to debug and troubleshoot

### Security Considerations

The API URL is not sensitive information (it's visible in Network tab anyway), so exposing it in a runtime config file is safe. For sensitive data like API keys, continue using build-time environment variables or server-side configuration.
