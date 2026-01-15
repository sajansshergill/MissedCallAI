# Project Structure Overview

Complete breakdown of the MissedCallAI Business-in-a-Box.

---

## 📁 Root Directory

```
MissedCallAI/
├── README.md                 # Main project overview
├── START_HERE.md            # Complete setup guide (30 min)
├── QUICK_START.md           # 5-minute quick setup
├── PROJECT_STRUCTURE.md     # This file
├── .gitignore               # Git ignore rules
│
├── voice-agent/             # AI Voice Agent Code
│   ├── webhook.js           # Main Twilio webhook handler
│   ├── prompt.txt           # AI agent prompt (customizable)
│   ├── config.example.js    # Configuration template
│   ├── package.json         # Node.js dependencies
│   └── deploy.md            # Deployment instructions
│
├── website/                 # Website Files
│   ├── index.html           # Main landing page (HTML)
│   ├── styles.css           # Website styling
│   └── copy.txt             # Website copy (for Carrd)
│
├── automations/             # Automation Setup
│   ├── zapier-setup.md      # Zapier integration guide
│   └── google-sheets.md     # Google Sheets setup
│
├── demo/                    # Demo Materials
│   └── demo-script.md       # Sales demo script
│
├── sales/                   # Sales Materials
│   ├── sales-script.md      # Complete sales call script
│   ├── calendly-setup.md    # Calendly configuration
│   └── pricing-guide.md     # Pricing strategies
│
└── videos/                  # Video Scripts
    ├── vsl-script.md        # VSL script (2-3 min)
    └── loom-guide.md        # Setup guide script (8-10 min)
```

---

## 🎯 What Each Folder Does

### `/voice-agent`
**Purpose:** The core AI voice agent that answers calls

**Key Files:**
- `webhook.js` - Handles incoming calls, processes with OpenAI
- `prompt.txt` - Defines how the AI talks and what it asks
- `config.example.js` - Template for API keys (copy to `config.js`)

**Who Uses It:** Technical setup, deployment

---

### `/website`
**Purpose:** Landing page to attract customers

**Key Files:**
- `index.html` - Complete HTML page (ready to deploy)
- `styles.css` - Professional styling
- `copy.txt` - Copy for Carrd/Framer builders

**Who Uses It:** Anyone (can use HTML or Carrd)

---

### `/automations`
**Purpose:** Connect MissedCallAI to other tools

**Key Files:**
- `zapier-setup.md` - Connect to CRM, email, Slack, etc.
- `google-sheets.md` - Automatic lead tracking

**Who Uses It:** Advanced users who want integrations

---

### `/demo`
**Purpose:** Materials for demonstrating the product

**Key Files:**
- `demo-script.md` - Step-by-step demo script for sales calls

**Who Uses It:** Sales calls, demos, presentations

---

### `/sales`
**Purpose:** Everything needed to sell MissedCallAI

**Key Files:**
- `sales-script.md` - Complete sales call script with objections
- `calendly-setup.md` - How to set up booking system
- `pricing-guide.md` - Pricing strategies and negotiation

**Who Uses It:** Sales process, closing deals

---

### `/videos`
**Purpose:** Scripts for video content

**Key Files:**
- `vsl-script.md` - Video sales letter script (2-3 min)
- `loom-guide.md` - Setup walkthrough script (8-10 min)

**Who Uses It:** Creating marketing videos, setup tutorials

---

## 🚀 Getting Started Paths

### Path 1: Quick Setup (5 minutes)
1. Read `QUICK_START.md`
2. Get API keys
3. Deploy webhook
4. Test call

### Path 2: Complete Setup (30 minutes)
1. Read `START_HERE.md`
2. Follow all steps
3. Customize for your niche
4. Launch website
5. Start selling

### Path 3: Customization
1. Edit `voice-agent/prompt.txt` for your niche
2. Update `website/index.html` with your branding
3. Customize `sales/sales-script.md` for your style

---

## 📊 File Sizes & Complexity

| File | Size | Complexity | Required? |
|------|------|------------|-----------|
| `webhook.js` | ~8KB | Medium | ✅ Yes |
| `prompt.txt` | ~2KB | Low | ✅ Yes |
| `config.js` | ~1KB | Low | ✅ Yes |
| `index.html` | ~15KB | Low | ✅ Yes |
| `styles.css` | ~8KB | Low | ✅ Yes |
| Automation guides | ~5KB each | Low | Optional |
| Sales scripts | ~10KB each | Low | Recommended |

---

## 🔑 Required vs Optional

### ✅ Required Files:
- `voice-agent/webhook.js`
- `voice-agent/prompt.txt`
- `voice-agent/config.js` (create from example)
- `voice-agent/package.json`
- `website/index.html` (or use Carrd)

### 📚 Recommended Files:
- `START_HERE.md` - Setup guide
- `sales/sales-script.md` - For selling
- `videos/vsl-script.md` - For marketing

### 🎁 Bonus Files:
- Automation guides
- Demo scripts
- Pricing guides

---

## 🎯 Use Cases

### Use Case 1: "I want to sell this immediately"
**Focus on:**
- `QUICK_START.md` - Get it working
- `sales/sales-script.md` - Start selling
- `website/index.html` - Launch site

### Use Case 2: "I want to customize it first"
**Focus on:**
- `voice-agent/prompt.txt` - Customize AI
- `website/index.html` - Brand it
- `sales/sales-script.md` - Make it yours

### Use Case 3: "I want to understand everything"
**Focus on:**
- `START_HERE.md` - Complete guide
- All documentation files
- Automation guides

---

## 📝 Next Steps After Setup

1. **Test thoroughly** - Make test calls, verify everything works
2. **Customize** - Make it match your brand/niche
3. **Launch website** - Get it live
4. **Record VSL** - Use `videos/vsl-script.md`
5. **Start selling** - Use `sales/sales-script.md`
6. **Scale** - Add automations, more phone numbers

---

## 🆘 Need Help?

- **Setup issues?** → `START_HERE.md`
- **Deployment problems?** → `voice-agent/deploy.md`
- **Sales questions?** → `sales/sales-script.md`
- **Customization?** → Edit `prompt.txt` and `index.html`

---

**You're all set!** Everything you need is here. 🚀
