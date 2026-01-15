# Zapier Automation Setup Guide

This guide shows you how to connect MissedCallAI to other tools using Zapier.

---

## WHAT IS ZAPIER?

Zapier connects apps together. When something happens in one app (like a new lead in MissedCallAI), it automatically does something in another app (like add to CRM).

**Example:** New lead → Add to HubSpot → Send email → Notify Slack

---

## PREREQUISITES

- Zapier account (free tier works)
- Google Sheets set up (for lead tracking)
- Any other tools you want to connect (CRM, email, etc.)

---

## SETUP 1: GOOGLE SHEETS → CRM

**Trigger:** New row in Google Sheet (when lead is added)

**Action:** Create contact in CRM (HubSpot, Pipedrive, etc.)

### Steps:

1. **Go to Zapier.com** and create account
2. **Click "Create Zap"**
3. **Choose Trigger:**
   - Search for "Google Sheets"
   - Select "New Spreadsheet Row"
   - Connect your Google account
   - Select your "MissedCallAI Leads" sheet
   - Test trigger (add a test row)

4. **Choose Action:**
   - Search for your CRM (e.g., "HubSpot")
   - Select "Create Contact"
   - Connect your CRM account
   - Map fields:
     - Name → Full Name
     - Phone → Phone Number
     - Service → Notes/Tags
     - Address → Address
   - Test action

5. **Turn on Zap**

**Result:** Every new lead automatically goes to your CRM!

---

## SETUP 2: GOOGLE SHEETS → EMAIL NOTIFICATION

**Trigger:** New row in Google Sheet

**Action:** Send email (Gmail, Mailchimp, etc.)

### Steps:

1. **Create Zap**
2. **Trigger:** Google Sheets - New Row
3. **Action:** Gmail - Send Email
4. **Email Template:**
   ```
   Subject: New Lead: {{Name}} - {{Service}}
   
   Hi [Your Name],
   
   New lead just came in:
   
   Name: {{Name}}
   Phone: {{Phone}}
   Service: {{Service}}
   Address: {{Address}}
   Urgency: {{Urgency}}
   
   Call them back ASAP!
   ```
5. **Turn on Zap**

**Result:** You get an email for every new lead!

---

## SETUP 3: GOOGLE SHEETS → SLACK NOTIFICATION

**Trigger:** New row in Google Sheet

**Action:** Send Slack message

### Steps:

1. **Create Zap**
2. **Trigger:** Google Sheets - New Row
3. **Action:** Slack - Send Channel Message
4. **Message:**
   ```
   🎯 New Lead!
   
   *Name:* {{Name}}
   *Phone:* {{Phone}}
   *Service:* {{Service}}
   *Address:* {{Address}}
   *Urgency:* {{Urgency}}
   
   Call them back!
   ```
5. **Turn on Zap**

**Result:** Your team gets notified in Slack!

---

## SETUP 4: GOOGLE SHEETS → SMS (VIA TWILIO)

**Trigger:** New row in Google Sheet

**Action:** Send SMS via Twilio

### Steps:

1. **Create Zap**
2. **Trigger:** Google Sheets - New Row
3. **Action:** Twilio - Send SMS
4. **Message:**
   ```
   New Lead: {{Name}} - {{Service}} - {{Phone}}. Call ASAP!
   ```
5. **Turn on Zap**

**Result:** You get SMS for every new lead!

---

## SETUP 5: GOOGLE SHEETS → CALENDAR EVENT

**Trigger:** New row in Google Sheet (when urgency is "emergency")

**Action:** Create calendar event

### Steps:

1. **Create Zap**
2. **Trigger:** Google Sheets - New Row
3. **Add Filter:** Only continue if Urgency = "emergency"
4. **Action:** Google Calendar - Create Event
5. **Event Details:**
   - Title: `Emergency: {{Service}} - {{Name}}`
   - Start: Now + 1 hour
   - Description: `Phone: {{Phone}}, Address: {{Address}}`
6. **Turn on Zap**

**Result:** Emergency calls automatically create calendar events!

---

## SETUP 6: GOOGLE SHEETS → MAILCHIMP

**Trigger:** New row in Google Sheet

**Action:** Add to Mailchimp list

### Steps:

1. **Create Zap**
2. **Trigger:** Google Sheets - New Row
3. **Action:** Mailchimp - Add Subscriber
4. **Map fields:**
   - Email → Email (if you collect it)
   - Name → First Name
   - Phone → Custom Field
5. **Turn on Zap**

**Result:** Leads automatically added to your email list!

---

## SETUP 7: MULTI-STEP ZAP (COMPLEX)

**Trigger:** New row in Google Sheet

**Actions:**
1. Add to CRM
2. Send email
3. Notify Slack
4. Create calendar event (if emergency)

### Steps:

1. **Create Zap**
2. **Trigger:** Google Sheets - New Row
3. **Action 1:** HubSpot - Create Contact
4. **Action 2:** Gmail - Send Email
5. **Action 3:** Slack - Send Message
6. **Action 4:** Google Calendar - Create Event (with filter for emergencies)
7. **Turn on Zap**

**Result:** One lead triggers multiple actions automatically!

---

## COMMON INTEGRATIONS

### CRMs:
- HubSpot
- Pipedrive
- Salesforce
- Zoho CRM
- Monday.com

### Email:
- Gmail
- Mailchimp
- SendGrid
- ConvertKit

### Communication:
- Slack
- Microsoft Teams
- Discord
- SMS (Twilio)

### Calendar:
- Google Calendar
- Outlook Calendar
- Calendly

### Project Management:
- Trello
- Asana
- Notion
- Airtable

---

## PRO TIPS

1. **Start Simple** - Begin with one Zap, then add more
2. **Test First** - Always test before turning on
3. **Use Filters** - Only trigger actions when needed (e.g., emergencies only)
4. **Monitor Usage** - Free tier has 100 tasks/month
5. **Error Handling** - Set up error notifications

---

## ZAPIER PRICING

- **Free:** 100 tasks/month (5 Zaps)
- **Starter ($20/month):** 750 tasks/month (20 Zaps)
- **Professional ($50/month):** 2,000 tasks/month (unlimited Zaps)

**For MissedCallAI:** Free tier is usually enough unless you have 100+ leads/month.

---

## TROUBLESHOOTING

### Zap not triggering:
- Check Google Sheet has new rows
- Verify Zap is turned on
- Check Zapier task history

### Data not mapping correctly:
- Verify column names match
- Check data format (text vs number)
- Test with sample data

### Rate limits:
- Free tier: 100 tasks/month
- Upgrade if you need more

---

## EXAMPLE: COMPLETE AUTOMATION FLOW

**When a new lead comes in:**

1. ✅ Lead saved to Google Sheet (via webhook)
2. ✅ Zapier detects new row
3. ✅ Adds contact to HubSpot CRM
4. ✅ Sends email to owner
5. ✅ Notifies team in Slack
6. ✅ If emergency, creates calendar event
7. ✅ Adds to Mailchimp list for follow-up

**All automatic. Zero manual work.**

---

That's it! You're now automating your entire lead flow.

Need help? Check Zapier's documentation or their support.

Good luck! 🚀
