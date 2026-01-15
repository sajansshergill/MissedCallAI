# 🚀 Run and Test MissedCallAI - Quick Guide

Follow these steps to run and test your MissedCallAI setup.

---

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
cd /Users/sajanshergill/MissedCallAI/voice-agent
npm install
```

**Expected output:** Packages installing, then "added X packages"

---

### Step 2: Create Config File

```bash
cp config.example.js config.js
```

Then edit `config.js` with your API keys (see below).

---

### Step 3: Add Your API Keys

Open `config.js` and replace the placeholders:

```javascript
module.exports = {
  twilio: {
    accountSid: 'ACxxxxxxxxxxxx',        // From Twilio Console
    authToken: 'your_auth_token',         // From Twilio Console
    phoneNumber: '+1234567890'            // Your Twilio number
  },
  openai: {
    apiKey: 'sk-xxxxxxxxxxxx'             // From OpenAI Platform
  },
  calendly: {
    eventLink: 'https://calendly.com/yourname/demo'
  }
};
```

**Save the file.**

---

### Step 4: Test the Config

```bash
cd /Users/sajanshergill/MissedCallAI/voice-agent
node -e "const c = require('./config'); console.log('✅ Config OK');"
```

If you see "✅ Config OK", your config is valid!

---

### Step 5: Start the Server

```bash
node webhook.js
```

**You should see:**
```
MissedCallAI webhook running on port 3000
```

**Keep this terminal open!**

---

### Step 6: Test Locally (New Terminal)

Open a **new terminal window** and run:

```bash
curl http://localhost:3000/webhook
```

**Expected:** XML response (TwiML)

**✅ If you see XML, your webhook is working locally!**

---

## 🌐 Make It Public (For Real Calls)

### Option A: Use ngrok (Easiest for Testing)

**Install ngrok:**
```bash
brew install ngrok
# Or download from ngrok.com
```

**In a new terminal:**
```bash
ngrok http 3000
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

**Your webhook URL:** `https://abc123.ngrok.io/webhook`

---

### Option B: Deploy to Replit (Permanent)

1. Go to [replit.com](https://replit.com)
2. Create new Node.js repl
3. Upload all files from `voice-agent/` folder
4. Click "Run"
5. Copy the URL
6. Your webhook: `https://your-repl.repl.co/webhook`

---

## 📞 Connect to Twilio

1. Go to [Twilio Console](https://console.twilio.com)
2. Phone Numbers → Active Numbers
3. Click your phone number
4. Under "Voice & Fax" → "A CALL COMES IN"
5. Select "Webhook"
6. Enter: `https://your-url.com/webhook`
7. Method: **POST**
8. Save

---

## 🧪 Test with Real Call

1. **Call your Twilio number** from your cell phone
2. **You should hear:** "Hello! Thank you for calling..."
3. **Try saying:** "Hi, I need a plumber"
4. **Follow the conversation** - provide name, service, address
5. **Check your terminal** - you'll see logs
6. **Check SMS** - you should receive a text with booking link

---

## ✅ Quick Test Script

I've created a test script for you. Run:

```bash
cd /Users/sajanshergill/MissedCallAI/voice-agent
./test-webhook.sh
```

This will:
- Check if config.js exists
- Install dependencies if needed
- Test if webhook is running
- Show you what's working/missing

---

## 🔍 What to Check

### ✅ Success Indicators:

- [ ] Server starts without errors
- [ ] `curl http://localhost:3000/webhook` returns XML
- [ ] ngrok/Replit URL works
- [ ] Twilio webhook configured
- [ ] Call connects and AI answers
- [ ] SMS received after call
- [ ] No errors in terminal logs

---

## 🐛 Common Issues

### "Cannot find module 'config'"
**Fix:** Make sure `config.js` exists (not just `config.example.js`)

### "Port 3000 already in use"
**Fix:** 
```bash
# Find what's using port 3000
lsof -ti:3000

# Kill it
kill -9 $(lsof -ti:3000)

# Or change port in webhook.js
```

### "Twilio webhook 404"
**Fix:** 
- Make sure server is running
- Verify webhook URL is correct
- Must be HTTPS (not HTTP)
- Test URL in browser first

### "OpenAI API Error"
**Fix:**
- Verify API key is correct
- Check you have GPT-4 access
- Verify billing is set up

---

## 📊 Testing Checklist

Run through this checklist:

```bash
# 1. Dependencies installed?
cd voice-agent && npm install

# 2. Config file exists?
ls config.js

# 3. Config is valid?
node -e "require('./config'); console.log('✅')"

# 4. Server starts?
node webhook.js
# (Should see "running on port 3000")

# 5. Webhook responds?
# In new terminal:
curl http://localhost:3000/webhook
# (Should return XML)

# 6. Public URL works?
# Test ngrok/Replit URL in browser
# Should return XML

# 7. Twilio connected?
# Check Twilio Console → Phone Numbers

# 8. Real call works?
# Call your Twilio number
# AI should answer
```

---

## 🎯 Next Steps After Testing

Once everything works:

1. **Customize the prompt** - Edit `prompt.txt`
2. **Set up Google Sheets** - Follow `automations/google-sheets.md`
3. **Deploy permanently** - Use Replit, Railway, or Vercel
4. **Launch website** - Deploy `website/index.html`
5. **Start selling** - Use `sales/sales-script.md`

---

## 💡 Pro Tips

1. **Keep server running** - Don't close the terminal with `node webhook.js`
2. **Check logs** - Watch terminal for errors during calls
3. **Test multiple times** - Try different scenarios
4. **Use ngrok for quick tests** - Replit for permanent setup
5. **Monitor Twilio Console** - See call logs and errors there too

---

## 📚 More Help

- **Detailed setup:** `START_HERE.md`
- **Verification:** `SETUP_VERIFICATION.md`
- **Testing guide:** `RUN_AND_TEST.md` (this file)
- **Deployment:** `voice-agent/deploy.md`

---

**Ready to test?** Start with Step 1 above! 🚀
