# Server Pull Deployment Setup

This guide is for when the **server pulls code from GitHub** instead of GitHub pushing to the server.

---

## What You Already Did:

✅ Added server's public key to GitHub Deploy Keys at:
https://github.com/jayrweg/e4c/settings/keys

---

## Setup for Server Person:

### Step 1: Clone Repository on Server

```bash
# SSH into the server
ssh your-username@uk-fast-web1373.main-hosting.eu

# Navigate to where you want the app
cd ~

# Clone the repository
git clone git@github.com:jayrweg/e4c.git

# Navigate to the e4c project folder
cd e4c/e4c
```

### Step 2: Set Up Environment Variables

```bash
# Create environment file
nano .env.production
```

Add:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xw1lpmj9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk8K8qVPoXcNezyENZnZLjzgehPpyNMAl9QVvCGgXf5rrr0m4zY3yTRCfRNDiD4m5f2dm4pMAjxE2gfSF6R1ZBK3siLom91hMbL6ovG3QXghSPBf3G56YhXff0mMTO5GyKit6wF58Tm8qBCtCE603WFEoWTKMgGMcPBrYVewEIgjltzcTrP1
RESEND_API_KEY=re_QxmYCzWt_8tThPcEg3aSh7wZfK2AuPCpn
CONTACT_EMAIL=empoweredforchangetz@gmail.com
DONATION_EMAIL=empoweredforchangetz@gmail.com
VOLUNTEER_EMAIL=empoweredforchangetz@gmail.com
NODE_ENV=production
PORT=3000
```

Save: `Ctrl+X`, `Y`, `Enter`

### Step 3: Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

### Step 4: Start with PM2

```bash
# Install PM2 if not installed
npm install -g pm2

# Start the application
pm2 start npm --name "e4c-website" -- start

# Save PM2 process list
pm2 save

# Set PM2 to start on server reboot
pm2 startup
# Follow the command it gives you
```

---

## Auto-Update Setup (Server Person):

### Option A: Manual Pull Script

Create an update script:

```bash
# Create update script
nano ~/update-e4c.sh
```

Add:
```bash
#!/bin/bash
cd ~/e4c/e4c
git pull origin main
npm install
npm run build
pm2 restart e4c-website
echo "✅ E4C updated successfully!"
```

Make it executable:
```bash
chmod +x ~/update-e4c.sh
```

**To update the site:**
```bash
~/update-e4c.sh
```

### Option B: Webhook Auto-Deploy

Install webhook listener:

```bash
# Install webhook
sudo apt-get update
sudo apt-get install webhook
```

Create webhook script:

```bash
nano ~/webhook-deploy.sh
```

Add:
```bash
#!/bin/bash
cd ~/e4c/e4c
git pull origin main
npm install
npm run build
pm2 restart e4c-website
```

Make executable:
```bash
chmod +x ~/webhook-deploy.sh
```

Create webhook config:

```bash
nano ~/hooks.json
```

Add:
```json
[
  {
    "id": "deploy-e4c",
    "execute-command": "/home/USERNAME/webhook-deploy.sh",
    "command-working-directory": "/home/USERNAME/e4c/e4c",
    "response-message": "Deploying E4C...",
    "trigger-rule": {
      "match": {
        "type": "payload-hash-sha1",
        "secret": "YOUR_WEBHOOK_SECRET",
        "parameter": {
          "source": "header",
          "name": "X-Hub-Signature"
        }
      }
    }
  }
]
```

Start webhook listener:
```bash
webhook -hooks ~/hooks.json -verbose -port 9000
```

---

## GitHub Webhook Configuration (For You):

If server person sets up webhook listener:

1. Go to: https://github.com/jayrweg/e4c/settings/hooks
2. Click **Add webhook**
3. **Payload URL:** `http://uk-fast-web1373.main-hosting.eu:9000/hooks/deploy-e4c`
4. **Content type:** `application/json`
5. **Secret:** Enter the same secret from `hooks.json`
6. **Which events:** Just the push event
7. Click **Add webhook**

Now every push to GitHub will auto-deploy! 🚀

---

## Daily Workflow:

### For You:
```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main
```

### For Server Person (if no webhook):
```bash
# Update the site
~/update-e4c.sh
```

### With Webhook:
- Automatic! Just push to GitHub

---

## Comparison: Push vs Pull

### GitHub Actions Push (Current Setup):
**Pros:**
- ✅ GitHub does the building (faster)
- ✅ No build dependencies on server
- ✅ Works with any hosting

**Cons:**
- ❌ Requires your private key in GitHub
- ❌ Needs server details in GitHub Secrets

### Server Pull (This Setup):
**Pros:**
- ✅ Server controls everything
- ✅ Can customize build process
- ✅ Server person has full control

**Cons:**
- ❌ Server needs Node.js and build tools
- ❌ Builds on server (uses server resources)
- ❌ Server person must set up webhook

---

## Which Should You Use?

### Use GitHub Actions Push if:
- You have server SSH access details
- Server has limited resources
- You want faster deployments

### Use Server Pull if:
- Server person prefers to control deployment
- Server has good resources
- Server person already set up Git access

### Use BOTH if:
- You want redundancy
- Server person wants to do manual updates sometimes
- GitHub Actions as backup

---

## Verify It's Working:

```bash
# On server, check PM2 status
pm2 status

# View logs
pm2 logs e4c-website

# Check if site is running
curl http://localhost:3000

# See which commit is deployed
cd ~/e4c/e4c
git log -1
```

---

## Troubleshooting:

### Can't Clone from GitHub?
```bash
# Test SSH connection to GitHub
ssh -T git@github.com
# Should say: "Hi jayrweg! You've successfully authenticated"
```

If fails:
- Make sure deploy key is added to GitHub
- Make sure private key is on server: `~/.ssh/id_rsa` or `~/.ssh/id_ed25519`

### Build Fails?
```bash
# Check Node version (needs 20.x)
node --version

# Install correct version
nvm install 20
nvm use 20
```

### PM2 Not Restarting?
```bash
# Delete and recreate
pm2 delete e4c-website
pm2 start npm --name "e4c-website" -- start
pm2 save
```

---

## Summary:

**What server person needs to do:**
1. ✅ Clone repo on server
2. ✅ Install dependencies
3. ✅ Build the app
4. ✅ Start with PM2
5. ✅ (Optional) Set up webhook for auto-deploy

**What happens when you push:**
- With webhook: Auto-deploys
- Without webhook: Server person runs update script
- GitHub Actions can still work as backup
