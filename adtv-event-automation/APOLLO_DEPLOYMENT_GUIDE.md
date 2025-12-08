# Apollo.io Integration - Deployment Guide

## Quick Deployment Steps

### 1. Add Environment Variable to Render

Go to your Render service dashboard and add:

```
Key: APOLLO_API_KEY
Value: cCXNmyS6zpMPko6Hoy-87Q
```

**Steps:**
1. Log into Render Dashboard
2. Select your backend service (adtv-events-server)
3. Go to "Environment" tab
4. Click "Add Environment Variable"
5. Enter key and value above
6. Click "Save Changes"

### 2. Deploy the Code

The integration is complete and ready to deploy. All files have been updated:

**Backend:**
- ✅ Apollo API service created
- ✅ API routes added
- ✅ Environment variable configured

**Frontend:**
- ✅ Apollo Search page created
- ✅ Navigation updated
- ✅ API client methods added

### 3. Verify Deployment

After deployment, check:

1. **Server Logs** - Should show:
   ```
   ✓ Apollo People Search: POST /api/apollo/people/search
   ✓ Apollo Organizations Search: POST /api/apollo/organizations/search
   ```

2. **Frontend** - Navigate to `/apollo` in the app
   - Should see "Apollo Search" page
   - Two tabs: "People" and "Organizations"
   - Search filters should be visible

3. **Test Search** - Try a simple search:
   - **People:** Enter "CEO" in Job Titles field
   - **Organizations:** Enter "saas" in Keywords field
   - Click "Search" button
   - Results should appear with pagination

## Troubleshooting

### If searches fail:

1. **Check API Key:**
   - Verify `APOLLO_API_KEY` is set in Render environment
   - Restart the service after adding the variable

2. **Check Server Logs:**
   - Look for "Apollo API error" messages
   - Common issues:
     - Missing API key → Add to Render environment
     - Invalid API key → Verify the key is correct
     - Rate limiting → Apollo has API limits

3. **Check Network Tab:**
   - Open browser DevTools → Network
   - Look for calls to `/api/apollo/people/search` or `/api/apollo/organizations/search`
   - Check response status and error messages

### If page doesn't load:

1. **Clear Browser Cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

2. **Check Build Logs:**
   - Verify frontend build succeeded
   - Look for TypeScript errors (should be none)

3. **Check Routing:**
   - Verify `/apollo` route is accessible
   - Check browser console for routing errors

## API Usage Notes

### Apollo API Limits
- Free tier: 50 credits/month
- Paid plans: Higher limits
- Each search consumes credits based on results

### Best Practices
1. Use specific filters to narrow results
2. Combine multiple filters for better targeting
3. Use pagination for large result sets
4. Monitor credit usage in Apollo dashboard

## Next Steps After Deployment

1. **Test thoroughly** - Try various search combinations
2. **Wire up "Add to Campaign"** - Connect button to campaign contact import
3. **Add export functionality** - CSV export for search results
4. **Monitor usage** - Track Apollo API credit consumption
5. **User training** - Document search strategies for team

## Support

If issues persist:
1. Check `APOLLO_INTEGRATION_SUMMARY.md` for technical details
2. Review Apollo API docs: https://apolloio.github.io/apollo-api-docs/
3. Check server logs in Render dashboard
4. Verify all environment variables are set correctly






