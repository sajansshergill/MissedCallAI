# Calendly Setup Guide

This guide shows you how to set up Calendly for your MissedCallAI sales pipeline.

---

## STEP 1: CREATE YOUR CALENDLY ACCOUNT

1. Go to [calendly.com](https://calendly.com)
2. Sign up (free tier works fine)
3. Connect your calendar (Google Calendar, Outlook, etc.)

---

## STEP 2: CREATE YOUR EVENT TYPE

### Event Details:

**Name:** "MissedCallAI Demo Call"

**Duration:** 15-30 minutes (I recommend 30 for first calls)

**Description:**
```
See how MissedCallAI can help your business never miss another call.

In this 15-minute demo, I'll show you:
- How the AI answers calls 24/7
- How it qualifies leads automatically
- How it books appointments
- The ROI for your business

No commitment, just information.
```

**Location:** Zoom, Google Meet, or Phone Call

**Availability:** Set your working hours (e.g., 9 AM - 6 PM, Monday-Friday)

---

## STEP 3: CUSTOMIZE YOUR QUESTIONS

Add these questions when someone books:

1. **What type of business do you run?**
   - Dropdown: Plumber, HVAC, Electrician, Septic, Towing, Cleaning, Other

2. **How many calls do you miss per week?**
   - Number field

3. **What's your average job value?**
   - Number field ($)

4. **What's your phone number?**
   - Phone field (for the demo call)

---

## STEP 4: SET UP REMINDERS

### Email Reminders:

**24 hours before:**
```
Subject: Reminder: Your MissedCallAI Demo Tomorrow

Hi [Name],

Just a quick reminder about our demo call tomorrow at [Time].

I'm excited to show you how MissedCallAI can help [Business Type] like yours capture every call, 24/7.

See you tomorrow!

[Your Name]
```

**2 hours before:**
```
Subject: See You Soon - MissedCallAI Demo

Hi [Name],

Looking forward to our call in 2 hours!

Here's the link: [Meeting Link]

Talk soon!

[Your Name]
```

### SMS Reminders (Optional):

If you have Calendly Premium, set up SMS reminders:
- 24 hours before
- 1 hour before

---

## STEP 5: EMBED ON YOUR WEBSITE

### Option 1: Inline Embed

1. Go to Calendly → Share → Embed
2. Copy the inline embed code
3. Paste it in your website's CTA section

### Option 2: Popup Widget

1. Go to Calendly → Share → Embed
2. Choose "Popup Widget"
3. Copy the code
4. Add to your website (usually in the footer or as a floating button)

### Option 3: Direct Link

Just use the direct link: `https://calendly.com/yourname/demo`

---

## STEP 6: SET UP AUTOMATIONS (OPTIONAL)

### Zapier Integration:

**Trigger:** New Calendly Event Scheduled

**Actions:**
1. Add to CRM (HubSpot, Pipedrive, etc.)
2. Send welcome email
3. Add to Google Sheet
4. Send Slack notification

### Calendly Native Integrations:

- **Google Calendar** - Auto-adds events
- **Salesforce** - Syncs leads
- **Mailchimp** - Adds to email list
- **Slack** - Notifies team

---

## STEP 7: TEST IT

1. Book a test appointment yourself
2. Check that reminders are sent
3. Verify calendar sync works
4. Test the meeting link

---

## PRO TIPS

1. **Use Buffer Time** - Add 15 minutes between calls so you're not rushed

2. **Set Office Hours** - Only show availability when you can actually take calls

3. **Multiple Event Types** - Create different events for:
   - Initial demo (30 min)
   - Follow-up call (15 min)
   - Onboarding (60 min)

4. **Customize Thank You Page** - After booking, redirect to a page with:
   - What to expect
   - How to prepare
   - Your contact info

5. **Track No-Shows** - Follow up with people who don't show:
   ```
   Hi [Name],
   
   I noticed we missed each other today. No worries — these things happen!
   
   Would you like to reschedule? Here's my calendar: [Link]
   
   Or if you'd prefer, I can send you a quick video demo instead.
   
   Let me know!
   ```

---

## CALENDLY PREMIUM FEATURES (OPTIONAL)

If you upgrade to Calendly Premium ($10/month), you get:

- **SMS Reminders** - Text people before the call
- **Custom Branding** - Match your website
- **Multiple Event Types** - Different calls for different purposes
- **Team Scheduling** - Multiple people can take calls
- **Workflows** - Automated follow-ups

**Worth it if:** You're booking 10+ calls per month

---

## INTEGRATION WITH MISSEDCALLAI

The AI agent can mention your Calendly link during calls:

**In your prompt.txt, add:**
```
If the caller asks about booking a consultation or wants to learn more, offer:
"I can send you a link to book a time that works for you. Would that be helpful?"
```

Then the webhook can send the Calendly link via SMS.

---

That's it! Your Calendly is set up and ready to book demos.

Good luck! 🎯
