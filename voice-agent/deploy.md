# Deployment Guide - Voice Agent Webhook

This guide covers deploying the MissedCallAI webhook to various platforms.

## Prerequisites

- Node.js 18+ installed
- All API keys configured in `config.js`
- Git repository (optional but recommended)

---

## Option 1: Deploy to Replit (Easiest)

### Steps:

1. **Create Replit Account**
   - Go to [replit.com](https://replit.com)
   - Sign up (free tier works)

2. **Create New Repl**
   - Click "Create Repl"
   - Choose "Node.js" template
   - Name it "missedcallai-webhook"

3. **Upload Files**
   - Upload all files from `voice-agent/` folder:
     - `webhook.js`
     - `prompt.txt`
     - `config.js` (create from `config.example.js`)
     - `package.json` (create one - see below)

4. **Create package.json**
   ```json
   {
     "name": "missedcallai-webhook",
     "version": "1.0.0",
     "main": "webhook.js",
     "scripts": {
       "start": "node webhook.js"
     },
     "dependencies": {
       "twilio": "^4.19.0",
       "openai": "^4.20.0",
       "express": "^4.18.2",
       "axios": "^1.6.0"
     }
   }
   ```

5. **Install Dependencies**
   - In Replit shell, run: `npm install`

6. **Set Secrets (Environment Variables)**
   - Click "Secrets" tab (lock icon)
   - Add your API keys as secrets (optional - or use config.js)

7. **Run**
   - Click "Run" button
   - Copy the URL (e.g., `https://missedcallai-webhook.yourusername.repl.co`)

8. **Get Webhook URL**
   - Your webhook URL: `https://missedcallai-webhook.yourusername.repl.co/webhook`

---

## Option 2: Deploy to Railway

### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo" or "Empty Project"

3. **Add Files**
   - If using GitHub: Push your code to a repo
   - If empty project: Upload files via Railway dashboard

4. **Create package.json** (same as Replit)

5. **Set Environment Variables**
   - Go to "Variables" tab
   - Add your API keys (or use config.js file)

6. **Deploy**
   - Railway auto-deploys on push
   - Or click "Deploy" button

7. **Get Webhook URL**
   - Railway provides a URL like: `https://your-app.railway.app`
   - Your webhook: `https://your-app.railway.app/webhook`

---

## Option 3: Deploy to Vercel

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Create vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "webhook.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/webhook",
         "dest": "webhook.js"
       },
       {
         "src": "/webhook/process",
         "dest": "webhook.js"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Get Webhook URL**
   - Vercel provides: `https://your-app.vercel.app/webhook`

---

## Option 4: Deploy to Netlify Functions

### Steps:

1. **Create netlify.toml**
   ```toml
   [build]
     functions = "functions"
   
   [[redirects]]
     from = "/webhook"
     to = "/.netlify/functions/webhook"
     status = 200
   ```

2. **Create functions/webhook.js**
   - Adapt `webhook.js` for Netlify Functions format
   - Export as serverless function

3. **Deploy**
   - Connect GitHub repo to Netlify
   - Or use Netlify CLI: `netlify deploy`

---

## Option 5: Deploy to Heroku

### Steps:

1. **Install Heroku CLI**
   ```bash
   heroku login
   ```

2. **Create Procfile**
   ```
   web: node webhook.js
   ```

3. **Deploy**
   ```bash
   heroku create missedcallai-webhook
   git push heroku main
   ```

4. **Set Config Vars**
   ```bash
   heroku config:set TWILIO_ACCOUNT_SID=your_sid
   heroku config:set OPENAI_API_KEY=your_key
   ```

---

## Testing Your Deployment

### Test Webhook:

1. **Check if server is running**
   ```bash
   curl https://your-webhook-url.com/webhook
   ```

2. **Test with Twilio**
   - Call your Twilio number
   - Should hear AI agent

3. **Check Logs**
   - Replit: View console output
   - Railway: View logs in dashboard
   - Vercel: `vercel logs`

---

## Troubleshooting

### Webhook not responding:
- Check URL is accessible (not localhost)
- Verify Twilio webhook URL is correct
- Check server logs for errors

### 404 errors:
- Verify route paths match (`/webhook`, `/webhook/process`)
- Check serverless function configuration

### API errors:
- Verify API keys are set correctly
- Check OpenAI API quota
- Verify Twilio account balance

---

## Production Considerations

1. **Use Environment Variables** instead of config.js for security
2. **Add Error Handling** for production
3. **Use Redis/Database** for conversation state (not in-memory Map)
4. **Add Logging** (Winston, Pino, etc.)
5. **Set up Monitoring** (Sentry, LogRocket, etc.)
6. **Add Rate Limiting** to prevent abuse

---

## Quick Start Command

For Replit/Railway, after setup:

```bash
npm install
node webhook.js
```

Your webhook will be live at the provided URL!
