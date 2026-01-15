# Loom Guide Script - Complete Setup Walkthrough (8-10 minutes)

**Purpose:** Step-by-step setup guide for buyers  
**Audience:** Someone who just purchased/downloaded MissedCallAI  
**Length:** 8-10 minutes  
**Style:** Clear, friendly, no fluff

---

## SCRIPT STRUCTURE

### [0:00 - 0:30] INTRODUCTION

"Hey! Welcome to MissedCallAI. I'm going to walk you through the complete setup process. By the end of this video, you'll have your AI receptionist live and ready to answer calls.

This should take about 30 minutes total, but I'll show you everything step by step.

Let's get started."

---

### [0:30 - 1:00] OVERVIEW

"Here's what we're going to do:

1. Get your API keys set up
2. Configure the voice agent
3. Deploy the webhook
4. Connect Twilio
5. Launch your website
6. Test everything

Don't worry if you're not technical. I'll show you exactly what to do. Let's go."

---

### [1:00 - 2:30] STEP 1: API KEYS

"First, we need to get your API keys. These are like passwords that let the system talk to Twilio, OpenAI, and Calendly.

**Twilio Setup:**
[Screen share: Go to twilio.com]

1. Go to twilio.com and sign up (or log in)
2. Once you're in, go to the Console
3. You'll see your Account SID and Auth Token right here
4. Copy these — we'll need them in a minute
5. Now, get a phone number. Click 'Phone Numbers' → 'Buy a Number'
6. Choose a US number (they're the cheapest)
7. Copy that phone number too

**OpenAI Setup:**
[Screen share: Go to platform.openai.com]

1. Go to platform.openai.com
2. Sign up or log in
3. Go to API Keys
4. Create a new secret key
5. Copy it — you won't see it again!

**Calendly Setup:**
[Screen share: Go to calendly.com]

1. Sign up for Calendly (free tier works)
2. Create a new event type — call it 'Demo Call' or 'Consultation'
3. Set it to 30 minutes
4. Copy your event link — it'll look like calendly.com/yourname/demo

Okay, you should now have:
- Twilio Account SID
- Twilio Auth Token
- Twilio Phone Number
- OpenAI API Key
- Calendly Event Link

Got them? Great. Let's move on."

---

### [2:30 - 4:00] STEP 2: CONFIGURE THE AGENT

"Now let's configure the voice agent.

[Screen share: Open voice-agent folder]

1. Open the `voice-agent` folder
2. You'll see a file called `config.example.js`
3. Copy it and rename it to `config.js`
4. Open `config.js` in any text editor

[Screen share: Show config.js file]

Now, just fill in your API keys. Replace:
- `YOUR_TWILIO_ACCOUNT_SID` with your actual Account SID
- `YOUR_TWILIO_AUTH_TOKEN` with your Auth Token
- `+1234567890` with your Twilio phone number
- `sk-YOUR_OPENAI_API_KEY` with your OpenAI key
- The Calendly link with your actual link

Save the file.

**Optional: Customize the Prompt**
[Screen share: Open prompt.txt]

If you want to customize how the AI talks, open `prompt.txt`. You can change:
- The business type (plumber, HVAC, etc.)
- The questions it asks
- The tone of voice

For now, the default works great. We can customize later."

---

### [4:00 - 6:00] STEP 3: DEPLOY THE WEBHOOK

"This is the technical part, but I'll make it super simple.

**Option 1: Deploy to Replit (Easiest)**
[Screen share: Go to replit.com]

1. Go to replit.com and sign up
2. Click 'Create Repl'
3. Choose 'Node.js'
4. Name it 'missedcallai-webhook'
5. Upload all the files from the `voice-agent` folder
6. You'll need to create a `package.json` file — I've included one in the folder
7. In the Replit shell, type: `npm install`
8. Wait for it to install
9. Click the 'Run' button
10. Copy the URL it gives you — that's your webhook URL!

**Option 2: Deploy to Railway**
[Screen share: Go to railway.app]

1. Go to railway.app
2. Sign up with GitHub
3. Create a new project
4. Connect your GitHub repo (or upload files)
5. Railway will auto-deploy
6. Copy the URL it gives you

Either way works. I prefer Replit for beginners because it's simpler.

Your webhook URL will look like:
- `https://your-repl.repl.co/webhook` (Replit)
- `https://your-app.railway.app/webhook` (Railway)

Got it? Perfect."

---

### [6:00 - 7:00] STEP 4: CONNECT TWILIO

"Now we need to tell Twilio to send calls to our webhook.

[Screen share: Go to Twilio Console]

1. Go back to Twilio Console
2. Click 'Phone Numbers' → 'Manage' → 'Active Numbers'
3. Click on your phone number
4. Scroll down to 'Voice & Fax'
5. Under 'A CALL COMES IN', select 'Webhook'
6. Paste your webhook URL: `https://your-webhook-url.com/webhook`
7. Make sure it says 'POST' (not GET)
8. Click 'Save'

That's it! Now when someone calls your Twilio number, it'll go to your webhook.

**Let's test it:**
[Screen share: Call the number]

Call your Twilio number right now. You should hear the AI agent answer!

[Let it ring and answer]

There it is! The AI is answering. Try talking to it. Ask for a service. See how it works.

Pretty cool, right?"

---

### [7:00 - 8:00] STEP 5: LAUNCH YOUR WEBSITE

"Now let's get your website live.

**Option 1: Use the HTML File**
[Screen share: Open website/index.html]

1. Open the `website` folder
2. Open `index.html` in a text editor
3. Find the Calendly link and replace it with yours
4. Upload to Netlify, Vercel, or GitHub Pages
5. Done!

**Option 2: Use Carrd**
[Screen share: Go to carrd.co]

1. Go to carrd.co
2. Create a new site
3. Use the copy from `website/copy.txt`
4. Match the design (I've included the HTML/CSS for reference)
5. Add your Calendly embed
6. Publish

Either way works. Carrd is easier if you're not technical.

Your website is now live!"

---

### [8:00 - 9:00] STEP 6: TEST EVERYTHING

"Let's make sure everything works.

**Test Checklist:**

1. **Call your Twilio number** ✅
   - AI should answer
   - Try a full conversation
   - See if it books an appointment

2. **Check SMS** ✅
   - You should get a text with the booking link
   - Customer should get a confirmation

3. **Check Google Sheets** ✅
   - Lead should appear in your sheet
   - All details should be there

4. **Test your website** ✅
   - Visit your site
   - Click 'Book a Demo'
   - Make sure Calendly works

If everything works, you're done! If something's broken, check the troubleshooting section in `START_HERE.md`."

---

### [9:00 - 10:00] NEXT STEPS & CUSTOMIZATION

"Congratulations! Your AI receptionist is live.

**What's Next:**

1. **Customize for your niche**
   - Edit the prompt to match your business
   - Update website copy
   - Add your branding

2. **Start selling**
   - Use the sales script in the `sales` folder
   - Record your VSL using the script in `videos`
   - Book demos via Calendly

3. **Scale up**
   - Add more automations (see `automations` folder)
   - Connect to your CRM
   - Add more phone numbers

**Pro Tips:**

- Test with real calls before going live with clients
- Customize the prompt to match your voice
- Monitor the Google Sheet to see all leads
- Adjust the AI's questions based on what you learn

That's it! You're ready to go.

If you have questions, check the documentation in each folder. Everything is explained there.

Good luck, and happy selling!"

---

## RECORDING TIPS

1. **Screen Share Everything** - Show, don't just tell
2. **Go Slow** - Pause between steps, let people follow along
3. **Use Annotations** - Circle important things, highlight text
4. **Test First** - Do a practice run before recording
5. **Edit Out Mistakes** - It's okay to re-record sections
6. **Add Timestamps** - In the description, add timestamps for each step

---

## VIDEO DESCRIPTION TEMPLATE

```
MissedCallAI - Complete Setup Guide

This video walks you through setting up MissedCallAI from scratch.

Timestamps:
0:00 - Introduction
0:30 - Overview
1:00 - Step 1: Get API Keys
2:30 - Step 2: Configure Agent
4:00 - Step 3: Deploy Webhook
6:00 - Step 4: Connect Twilio
7:00 - Step 5: Launch Website
8:00 - Step 6: Test Everything
9:00 - Next Steps

Resources:
- START_HERE.md - Complete written guide
- voice-agent/deploy.md - Deployment options
- automations/ - Automation setup guides

Questions? Check the documentation in each folder.
```
