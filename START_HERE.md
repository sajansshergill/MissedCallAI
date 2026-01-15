# 🚀 START HERE - Complete Setup Guide

Welcome! This guide will get you from zero to live in **under 30 minutes**.

## 📋 Prerequisites Checklist

Before you start, make sure you have:

- [ ] Twilio account (free trial works)
- [ ] OpenAI API key (GPT-4 access)
- [ ] Calendly account (free tier works)
- [ ] Google account (for Sheets)
- [ ] Hosting account (Replit, Railway, or similar)

---

## Step 1: Get Your API Keys (10 minutes)

### 1.1 Twilio Setup

1. Go to [twilio.com](https://www.twilio.com) and sign up
2. Get a phone number (US number recommended)
3. Copy these from your Twilio Console:
   - **Account SID**
   - **Auth Token**
   - **Phone Number** (format: +1234567890)

### 1.2 OpenAI Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Ensure you have GPT-4 access (may require billing setup)
4. Copy your **API Key**

### 1.3 Calendly Setup

1. Go to [calendly.com](https://calendly.com) and sign up
2. Create a new event type (e.g., "Demo Call - 30 min")
3. Get your **Event Link** (e.g., `calendly.com/yourname/demo`)
4. Optional: Get API key from Integrations → API

### 1.4 Google Sheets Setup

1. Create a new Google Sheet
2. Name it "MissedCallAI Leads"
3. Create headers: `Timestamp`, `Name`, `Phone`, `Service`, `Address`, `Urgency`, `Status`
4. Share with service account (see `automations/google-sheets.md`)

---

## Step 2: Configure the Voice Agent (5 minutes)

### 2.1 Copy Configuration File

```bash
cd voice-agent
cp config.example.js config.js
```

### 2.2 Edit `config.js`

Open `voice-agent/config.js` and fill in:

```javascript
module.exports = {
  twilio: {
    accountSid: 'YOUR_TWILIO_ACCOUNT_SID',
    authToken: 'YOUR_TWILIO_AUTH_TOKEN',
    phoneNumber: '+1234567890'
  },
  openai: {
    apiKey: 'sk-YOUR_OPENAI_API_KEY'
  },
  calendly: {
    eventLink: 'https://calendly.com/yourname/demo'
  },
  googleSheets: {
    spreadsheetId: 'YOUR_GOOGLE_SHEET_ID',
    // See automations/google-sheets.md for service account setup
  }
};
```

### 2.3 Customize the Prompt (Optional)

Edit `voice-agent/prompt.txt` to match your target niche:

- Change business type (plumber, HVAC, etc.)
- Adjust qualification questions
- Modify booking flow

---

## Step 3: Deploy the Webhook (10 minutes)

### Option A: Deploy to Replit

1. Go to [replit.com](https://replit.com)
2. Create new Node.js repl
3. Upload all files from `voice-agent/` folder
4. Install dependencies: `npm install`
5. Set environment variables in Secrets tab
6. Click "Run"
7. Copy your Replit URL (e.g., `https://your-repl.repl.co`)

### Option B: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repo or upload files
4. Set environment variables
5. Deploy
6. Copy your Railway URL

### Option C: Deploy to Vercel/Netlify

See `voice-agent/deploy.md` for detailed instructions.

### 3.1 Get Your Webhook URL

Your webhook URL will be:
- Replit: `https://your-repl.repl.co/webhook`
- Railway: `https://your-app.railway.app/webhook`
- Custom: `https://yourdomain.com/webhook`

---

## Step 4: Connect Twilio to Your Webhook (5 minutes)

1. Go to Twilio Console → Phone Numbers → Manage → Active Numbers
2. Click on your phone number
3. Scroll to "Voice & Fax"
4. Under "A CALL COMES IN", select "Webhook"
5. Enter your webhook URL: `https://your-app.com/webhook`
6. Method: `POST`
7. Save

**Test it:** Call your Twilio number. You should hear the AI agent!

---

## Step 5: Launch Your Website (5 minutes)

### Option A: Use the HTML File

1. Open `website/index.html` in a code editor
2. Replace placeholder Calendly link with yours
3. Upload to any hosting (Netlify, Vercel, GitHub Pages)
4. Or use Carrd (see Option B)

### Option B: Use Carrd

1. Go to [carrd.co](https://carrd.co)
2. Create new site
3. Copy content from `website/copy.txt`
4. Use Carrd's templates to match the design
5. Add your Calendly embed
6. Publish

---

## Step 6: Test Everything (5 minutes)

### Test Checklist:

- [ ] Call your Twilio number → AI answers
- [ ] AI asks qualification questions
- [ ] AI books appointment (or sends Calendly link)
- [ ] SMS confirmation sent
- [ ] Lead appears in Google Sheet
- [ ] Website loads correctly
- [ ] Calendly booking works

---

## Step 7: Start Selling! 🎉

You're live! Now:

1. **Share your website** with potential clients
2. **Use the sales script** (`sales/sales-script.md`)
3. **Record your VSL** using `videos/vsl-script.md`
4. **Book demos** via Calendly
5. **Close deals** and onboard clients

---

## 🐛 Troubleshooting

### AI doesn't answer calls
- Check Twilio webhook URL is correct
- Verify webhook is accessible (not localhost)
- Check Twilio logs in Console

### AI doesn't understand callers
- Review `voice-agent/prompt.txt`
- Test with OpenAI Playground
- Adjust prompt clarity

### Leads not saving to Google Sheets
- Check service account permissions
- Verify spreadsheet ID is correct
- See `automations/google-sheets.md`

### SMS not sending
- Verify Twilio phone number is SMS-enabled
- Check Twilio account balance
- Review webhook logs

---

## 📚 Next Steps

- **Customize for your niche:** Edit prompts and website copy
- **Add more automations:** See `automations/zapier-setup.md`
- **Scale your sales:** Use `sales/pricing-guide.md`
- **Record your demo:** Follow `videos/vsl-script.md`

---

## 🎥 Video Walkthrough

For visual learners, follow the Loom guide script in `videos/loom-guide.md` to create your own setup video.

---

**Questions?** Review the documentation in each folder, or check the deployment guides.

**Ready to sell?** Open `sales/sales-script.md` and start booking demos!
