# AI Campaign Builder - Quick Start Guide

**Last Updated:** January 28, 2026  
**Access:** https://paycile-automation.onrender.com/builder

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ **Add OpenAI API Key to Render**
Before using the AI Builder, configure the backend:

**Go to:** https://dashboard.render.com → Select backend service → Environment

**Add this variable:**
```
OPENAI_API_KEY=sk-your-key-here
```

**Get your key:** https://platform.openai.com/api-keys

**Then:** Click "Save" and Render will auto-redeploy (takes ~3 minutes)

### 2️⃣ **Access the Builder**
Once deployed, navigate to:
- **Production:** https://paycile-automation.onrender.com/builder
- **Or click:** "Builder" in the top navigation menu

### 3️⃣ **Generate Your First Campaign**
Fill in the form:

**Campaign Description:** (Required)
```
Example: "A 5-step email sequence to invite CFOs in the insurance 
industry to schedule a demo. Include follow-ups emphasizing cost 
savings and automated reconciliation."
```

**Select Channels:**
- ✅ Email
- ✅ SMS  
- ✅ Wait

**Click:** ✨ Generate Campaign

**Result:** Complete funnel with professional content in ~15 seconds!

---

## 🎯 What You Get

Each generated campaign includes:

✅ **Campaign Name & Description** - Professional, benefit-driven  
✅ **Complete Node Sequence** - Start → Actions → End  
✅ **Fully-Written Content:**
  - Email subjects (compelling, under 60 chars)
  - Email bodies (150-250 words, clear CTAs)
  - SMS messages (under 160 chars, urgent)
  - Voicemail scripts (30-45 seconds)
  - Wait durations (strategic timing)

✅ **Paycile Context:** References services, pain points, value props  
✅ **Personalization Tokens:** {{contact.first_name}}, {{contact.company}}  
✅ **Industry-Specific:** Insurance vs. Property Management language  
✅ **Professional Tone:** Matches your brand voice

---

## 🔧 Configuration Options

### Campaign Description Tips:
- **Be Specific:** Include target audience, goal, key messages
- **Good:** "Re-engage cold leads from Q4 with 5-touch sequence highlighting new pricing for insurance companies"
- **Better:** "Target insurance CFOs who didn't respond to our first campaign. 5 emails + SMS emphasizing cost recovery and automated claims reconciliation. Goal: Book 15 demos."

### Available Channels:
| Channel | Best For | Example Use |
|---------|----------|-------------|
| 📧 **Email** | Detailed information | Product education, demos |
| 💬 **SMS** | Urgent reminders | Event reminders, deadlines |
| 🎙️ **Voicemail** | Personal touch | High-value prospects |
| ⏱️ **Wait** | Timing | 1-3 days between touches |
| 🎯 **Stage** | Milestone tracking | Campaign phases |
| 🔀 **Decision** | Conditional logic | Response-based routing |
| ✓ **Task** | Manual follow-up | BDR intervention |

### Tone Options:
- **Professional** - CFOs, Controllers (recommended for Paycile)
- **Friendly** - Relationship building
- **Urgent** - Time-sensitive offers
- **Empathetic** - Problem-focused messaging

### Industry Selection:
- **Insurance** - Claims, deductibles, carrier language
- **Property Management** - Yardi, multi-property reconciliation
- **Real Estate** - Transaction processing
- **Financial Services** - Generic payment processing
- **Other** - General business messaging

---

## ✨ Refinement Tips

After generating, click on any step to refine:

**Common Refinements:**
- "Make it more urgent"
- "Add a deadline of February 15th"
- "Emphasize cost savings over time efficiency"
- "Shorten to 100 words"
- "Make subject line more curiosity-driven"
- "Add specific ROI numbers"

**Example Refinement:**
1. Click "Email 1: Introduction"
2. Type: "Make this more urgent and add a limited-time offer"
3. Click "✨ Refine with AI"
4. Review updated content

---

## 💾 Save to Templates

When satisfied with your campaign:

1. Click **"💾 Save as Template"** (top right)
2. Campaign saves to Funnel Templates
3. Automatically navigates to Template Builder
4. Make final adjustments if needed
5. Use in live campaigns!

**Note:** Saved as "draft" status - you can edit nodes, edges, and content before deploying.

---

## 📊 Example Campaigns

### Example 1: Insurance CFO Demo Campaign
**Input:**
```
Description: "5-step sequence for insurance CFOs. Highlight automated 
claims payment reconciliation, deductible tracking, and cost recovery. 
Goal: Book product demos."

Target: CFOs at insurance companies with 100+ employees
Goal: Schedule 20+ demonstrations
Tone: Professional
Industry: Insurance
Channels: Email, SMS, Wait
Steps: 5
```

**Output:**
- Email 1: "The Hidden Costs in Your Claims Process"
- Wait: 2 days
- Email 2: "How Insurance CFOs Save 40 Hours/Month"
- Wait: 3 days
- SMS: "Quick question about payment reconciliation"

### Example 2: Property Management Re-Engagement
**Input:**
```
Description: "Re-engage cold leads from Q4. Emphasize Yardi integration 
and multi-property payment consolidation. 7-step nurture sequence."

Target: Finance Managers at property management companies
Goal: Get 15 consultation bookings
Tone: Friendly
Industry: Property Management
Channels: Email, Voicemail, Wait
Steps: 7
```

**Output:**
- Email 1: "Simplify Multi-Property Reconciliation"
- Wait: 1 day
- Email 2: "Yardi + Paycile: The Perfect Match"
- Wait: 2 days
- Voicemail: Personal message about integration benefits
- (etc.)

---

## 🎓 Best Practices

### ✅ DO:
- Be specific in campaign descriptions
- Select appropriate industry for context
- Review all generated content before saving
- Use refinement to perfect messaging
- Test with small audience first
- Keep existing good templates (AI learns from them!)

### ❌ DON'T:
- Use vague descriptions like "email campaign"
- Skip reviewing AI-generated content
- Generate duplicate campaigns (customize instead!)
- Over-rely on AI without human review
- Forget to check personalization tokens

---

## 💰 Cost Expectations

**Per Campaign Generation:**
- ~$0.03 - $0.05 per campaign (GPT-4 Turbo)
- Average: **$0.04 per funnel**

**Monthly Estimates:**
- 10 campaigns/month: ~$0.40
- 50 campaigns/month: ~$2.00
- 100 campaigns/month: ~$4.00

**Very affordable!** Even heavy users spend < $10/month.

---

## 🐛 Troubleshooting

### "Failed to generate campaign"
**Fix:** Check that `OPENAI_API_KEY` is set in Render backend environment

### Content seems generic
**Fix:**
1. Use more specific campaign description
2. Select correct industry
3. Include Paycile-specific use cases in description

### Save to template fails
**Fix:**
1. Check browser console (F12) for errors
2. Verify you're logged in
3. Try refreshing the page

### "Builder" not showing in navigation
**Fix:** Clear browser cache and hard refresh (Cmd+Shift+R)

---

## 🎬 Video Tutorial (Coming Soon)

We'll create a screen recording showing:
1. Accessing the Builder
2. Configuring a campaign
3. Generating and reviewing content
4. Refining a step
5. Saving to templates
6. Using in live campaign

---

## 📞 Support

**Questions?**
- Documentation: `AI_CAMPAIGN_BUILDER_DEPLOYED.md`
- Backend logs: Render Dashboard → Service → Logs
- OpenAI status: https://status.openai.com

**Feature requests?**
- A/B testing variations
- Multi-language support
- Industry-specific templates
- Campaign analytics

---

## 🚀 Next Steps

1. ✅ Add `OPENAI_API_KEY` to Render
2. ✅ Generate your first test campaign
3. ✅ Refine content to perfection
4. ✅ Save as template
5. ✅ Deploy in live campaign
6. ✅ Iterate and improve!

**Ready to save hours on campaign creation!** 🎉

---

**Document:** AI_BUILDER_QUICK_START.md  
**Version:** 1.0  
**Date:** January 28, 2026
