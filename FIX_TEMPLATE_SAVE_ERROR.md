# Fix: Template Save Error (400 Bad Request)

## Problem
When trying to save edits to content templates in the Funnel Templates page, the save fails with a 400 error. The network request shows a malformed URL like `optimise-backend-un_ns_email_02_value:1` instead of the correct API endpoint.

## Root Cause
The `VITE_API_URL` environment variable is not properly set in the production build on Render. There's a mismatch between:
- The `render.yaml` configuration which references `paycile-automation-server`
- The actual backend service running at `https://opticwise-backend-uq3o.onrender.com`

Vite bakes environment variables into the build at build time, so if the variable isn't set correctly during the build process, the frontend will have an incorrect or missing API URL.

## Solution

### Step 1: Update Render Environment Variables

In your Render dashboard for the **paycile-automation-web** service (the frontend):

1. Go to **Environment** tab
2. Add or update the `VITE_API_URL` variable:
   ```
   VITE_API_URL=https://opticwise-backend-uq3o.onrender.com
   ```
3. **IMPORTANT:** Make sure this is set as a regular environment variable (it will be available at build time for static sites)

**Note:** The `render.yaml` file tries to reference `paycile-automation-server`, but your actual backend is `opticwise-backend-uq3o`. This is why the environment variable isn't being set correctly.

### Step 2: Trigger a Rebuild

After updating the environment variable:

1. Go to the **Manual Deploy** section
2. Click **Clear build cache & deploy**
3. This ensures the new environment variable is baked into the build

### Step 3: Verify the Fix

After deployment completes:

1. Open browser DevTools (F12)
2. Go to the **Console** tab
3. Type: `import.meta.env.VITE_API_URL`
4. Should show: `https://opticwise-backend-uq3o.onrender.com`

If it shows `undefined` or `http://localhost:4000`, the environment variable wasn't set correctly at build time.

### Step 4: Test Template Editing

1. Go to **Templates** page
2. Click on any content template to edit it
3. Make a change (e.g., update the subject line)
4. Click **Save**
5. Should save successfully without errors

## Alternative: Use Runtime Configuration

If the above doesn't work (some Render configurations don't support build-time env vars for static sites), we can switch to a runtime configuration approach:

### Create a config.js file that loads at runtime:

```javascript
// apps/web/public/config.js
window.ENV = {
  VITE_API_URL: 'https://opticwise-backend-uq3o.onrender.com'
};
```

### Update index.html to load it:

```html
<!-- Add before other scripts -->
<script src="/config.js"></script>
```

### Update api.ts to use runtime config:

```typescript
const API_URL = (window as any).ENV?.VITE_API_URL || 
                (import.meta as any).env?.VITE_API_URL || 
                'http://localhost:4000';
```

## Why This Happened

The error shows `optimise-backend-un_ns_email_02_value:1` which appears to be:
- A corrupted/truncated version of `opticwise-backend`
- Mixed with some template field names
- Suggests the API URL was undefined/null and JavaScript tried to construct a URL with undefined values

This is a classic symptom of environment variables not being available at build time in Vite applications.

## Prevention

To prevent this in the future:

1. Always verify environment variables are set **before** building
2. Use `console.log(import.meta.env.VITE_API_URL)` in development to verify
3. Add a build-time check in vite.config.ts:

```typescript
export default defineConfig({
  // ... other config
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:4000')
  }
});
```

## Testing Checklist

- [ ] Environment variable set in Render
- [ ] Build cache cleared and redeployed
- [ ] Console shows correct API URL
- [ ] Template editing saves successfully
- [ ] No 400 errors in Network tab
- [ ] Template changes persist after page refresh

## Related Files

- `adtv-event-automation/apps/web/src/lib/api.ts` - API client configuration
- `adtv-event-automation/apps/web/src/pages/TemplatesFunnel.tsx` - Template editing UI
- `adtv-event-automation/apps/server/src/index.ts` - Backend API endpoints
- `adtv-event-automation/render.yaml` - Render deployment configuration

## Support

If the issue persists after following these steps:

1. Check Render build logs for environment variable warnings
2. Verify the backend API is accessible at `https://opticwise-backend-uq3o.onrender.com/health`
3. Check browser Network tab to see the exact URL being called
4. Look for CORS errors in the console
