# 🔐 SSH Deployment Guide for Traditional Hosting

Complete guide for deploying E4C to your hosting company via SSH with GitHub auto-deployment.

---

## 🎯 Overview

Your hosting company provides:
- ✅ SSH access to your server
- ✅ Ability to run Node.js applications
- ✅ A domain or IP address

This guide will help you:
1. Set up SSH keys for secure deployment
2. Configure GitHub for automatic deployments
3. Deploy your application to the server

---

## 📋 What You Need From Your Hosting Company

Ask your hosting provider for these details:

| Information | Example | Your Value |
|------------|---------|------------|
| **Server IP/Hostname** | `123.45.67.89` or `server.yourhost.com` | _________ |
| **SSH Username** | `username` or `cpanel_username` | _________ |
| **SSH Port** | `22` (default) or custom | _________ |
| **Web Root Path** | `/home/username/public_html` | _________ |
| **Node.js Version** | Should be 18.x or 20.x | _________ |

---

## 🔑 Part 1: Generate SSH Keys

### Step 1: Generate SSH Key Pair on Your Computer

**On Windows (using Git Bash or PowerShell):**
```bash
ssh-keygen -t ed25519 -C "e4c-github-deploy"
```

**When prompted:**
- File location: Press Enter (use default)
- Passphrase: Press Enter (no passphrase for automation)

This creates two files:
- `~/.ssh/id_ed25519` (private key - keep secret!)
- `~/.ssh/id_ed25519.pub` (public key - safe to share)

### Step 2: View Your Keys

**Private key** (you'll add this to GitHub):
```bash
cat ~/.ssh/id_ed25519
```

**Public key** (you'll add this to your server):
```bash
cat ~/.ssh/id_ed25519.pub
```

Copy both of these somewhere safe!

---

## 🖥️ Part 2: Add Public Key to Your Server

### Method A: Using SSH (If you can already connect)

```bash
# Connect to your server
ssh username@your-server-ip

# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Exit
exit
```

### Method B: Using cPanel/Web Interface

1. Login to your hosting control panel (cPanel, Plesk, etc.)
2. Look for "SSH Keys" or "SSH Access"
3. Find "Import Public Key" or "Add SSH Key"
4. Paste your public key (`id_ed25519.pub` content)
5. Save

### Method C: Contact Hosting Support

Send them your **public key** and ask them to add it to your account for SSH access.

### Test SSH Connection

```bash
ssh username@your-server-ip
```

If you can connect without password, SSH keys are working! ✅

---

## 🔐 Part 3: Add Secrets to GitHub

### Step 1: Go to GitHub Repository Settings

1. Go to: `https://github.com/jayrweg/e4c`
2. Click **Settings** tab
3. Go to **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Step 2: Add These Secrets

Add each secret one by one:

#### Secret 1: SSH_PRIVATE_KEY
```
Name: SSH_PRIVATE_KEY
Value: [Paste the ENTIRE content of your private key file]
```
**Important:** Include the `-----BEGIN` and `-----END` lines!

#### Secret 2: REMOTE_HOST
```
Name: REMOTE_HOST
Value: your-server-ip-or-hostname
```
Example: `123.45.67.89` or `server.yourhost.com`

#### Secret 3: REMOTE_USER
```
Name: REMOTE_USER
Value: your-ssh-username
```
Example: `username` or `cpanel_user`

#### Secret 4: REMOTE_TARGET
```
Name: REMOTE_TARGET
Value: /path/to/your/website/directory
```
Example: `/home/username/e4c` or `/var/www/e4c`

**Note:** NOT your public_html! Create a separate directory for the app.

#### Secret 5: REMOTE_PORT (Optional)
```
Name: REMOTE_PORT
Value: 22
```
Only add this if your SSH port is NOT 22.

#### Secret 6-8: Sanity & Resend Keys

```
Name: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: xw1lpmj9

Name: SANITY_API_TOKEN
Value: sk8K8qVPoXcNezyENZnZLjzgehPpyNMAl9QVvCGgXf5rrr0m4zY3yTRCfRNDiD4m5f2dm4pMAjxE2gfSF6R1ZBK3siLom91hMbL6ovG3QXghSPBf3G56YhXff0mMTO5GyKit6wF58Tm8qBCtCE603WFEoWTKMgGMcPBrYVewEIgjltzcTrP1

Name: RESEND_API_KEY
Value: re_QxmYCzWt_8tThPcEg3aSh7wZfK2AuPCpn
```

---

## 🚀 Part 4: Prepare Your Server

### Step 1: Connect to Your Server

```bash
ssh username@your-server-ip
```

### Step 2: Install Node.js (if not installed)

**Check if Node.js is installed:**
```bash
node --version
```

**If not installed, install Node.js 20:**
```bash
# Using NVM (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

**Or ask your hosting provider to enable Node.js 20**

### Step 3: Install PM2 Process Manager

```bash
npm install -g pm2
```

### Step 4: Create Application Directory

```bash
# Create directory for your app
mkdir -p ~/e4c
cd ~/e4c

# This is your REMOTE_TARGET path!
pwd
# Example output: /home/username/e4c
```

**Important:** Use this path as your `REMOTE_TARGET` secret in GitHub!

### Step 5: Set Up Environment Variables on Server

```bash
cd ~/e4c
nano .env.production
```

Add:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xw1lpmj9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk8K8qVPoXcNezyENZnZLjzgehPpyNMAl9QVvCGgXf5rrr0m4zY3yTRCfRNDiD4m5f2dm4pMAjxE2gfSF6R1ZBK3siLom91hMbL6ovG3QXghSPBf3G56YhXff0mMTO5GyKit6wF58Tm8qBCtCE603WFEoWTKMgGMcPBrYVewEIgjltzcTrP1
RESEND_API_KEY=re_QxmYCzWt_8tThPcEg3aSh7wZfK2AuPCpn
NODE_ENV=production
PORT=3000
```

Save: `Ctrl+X`, then `Y`, then `Enter`

---

## 🎯 Part 5: Test Auto-Deployment

### Enable the SSH Deployment Workflow

The file `.github/workflows/deploy-ssh.yml` is already in your repository!

### Trigger Your First Deployment

```bash
# Make a small change
echo "# Test deploy" >> README.md

# Commit and push
git add README.md
git commit -m "Test SSH auto-deployment"
git push origin main
```

### Monitor the Deployment

1. Go to: `https://github.com/jayrweg/e4c/actions`
2. Click on the latest workflow run
3. Watch the deployment in real-time!

### Verify on Your Server

```bash
ssh username@your-server-ip
cd ~/e4c
ls -la
# You should see all your files!

# Check PM2 status
pm2 status
```

---

## 🌐 Part 6: Point Your Domain to the App

### Option A: Using Reverse Proxy (Recommended)

Ask your hosting provider to set up a reverse proxy from your domain to port 3000.

**Example for Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

**Example for Nginx:**
```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Option B: Change Port to 80/443

**Warning:** This usually requires root access. Ask your hosting provider.

```bash
# Edit ecosystem.config.js
nano ~/e4c/ecosystem.config.js
```

Change `PORT: 3000` to `PORT: 80`

Restart:
```bash
pm2 restart e4c-website
```

---

## 🔄 Daily Workflow (After Setup)

From now on, every time you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Automatically happens:**
1. ✅ GitHub Actions builds your app
2. ✅ Connects to your server via SSH
3. ✅ Uploads the build
4. ✅ Restarts the application
5. ✅ Your site updates! (2-5 minutes)

---

## 📊 Manual Deployment (Backup Method)

If GitHub Actions fails or you want to deploy manually:

### Method 1: Using the Deploy Script

```bash
# On your computer
cd e4c
chmod +x deploy.sh
./deploy.sh
```

This creates `deploy-package/` and `e4c-deploy-TIMESTAMP.tar.gz`

Upload the tar.gz file to your server and extract:
```bash
# On your server
cd ~/e4c
tar -xzf e4c-deploy-TIMESTAMP.tar.gz
pm2 restart e4c-website
```

### Method 2: Using SCP to Upload

```bash
# On your computer, after running deploy.sh
scp e4c-deploy-TIMESTAMP.tar.gz username@server-ip:~/e4c/

# On your server
cd ~/e4c
tar -xzf e4c-deploy-TIMESTAMP.tar.gz
pm2 restart e4c-website
```

---

## 🔍 Troubleshooting

### SSH Connection Issues

**Problem:** Can't connect via SSH
```bash
ssh -v username@server-ip
```
Check:
- Is the username correct?
- Is the IP/hostname correct?
- Is port 22 open (or your custom port)?
- Did you add the public key to the server?

### GitHub Actions Failing

**Check logs:**
1. Go to Actions tab on GitHub
2. Click failed workflow
3. Check error messages

**Common issues:**
- SSH key not added correctly (check secret format)
- Wrong REMOTE_TARGET path
- Server port blocked
- Node.js not installed on server

### Application Not Starting

**Check PM2 logs:**
```bash
ssh username@server-ip
pm2 logs e4c-website
```

**Common issues:**
- Environment variables missing
- Port already in use
- Node.js version too old
- Missing dependencies

**Restart the app:**
```bash
pm2 restart e4c-website
```

### Site Not Accessible

**Check if app is running:**
```bash
pm2 status
curl http://localhost:3000
```

**Check reverse proxy:**
- Is your domain pointing to the server?
- Is the reverse proxy configured?
- Check web server logs (Apache/Nginx)

---

## 📦 Server Commands Cheat Sheet

```bash
# Connect to server
ssh username@server-ip

# Check app status
pm2 status

# View logs
pm2 logs e4c-website

# Restart app
pm2 restart e4c-website

# Stop app
pm2 stop e4c-website

# Start app
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# View app URL
curl http://localhost:3000
```

---

## ✅ Deployment Checklist

Setup (One-time):
- [ ] Generate SSH keys
- [ ] Add public key to server
- [ ] Add secrets to GitHub
- [ ] Install Node.js on server
- [ ] Install PM2 on server
- [ ] Create app directory
- [ ] Test SSH connection
- [ ] Configure reverse proxy

First Deployment:
- [ ] Push code to GitHub
- [ ] Watch GitHub Actions
- [ ] Verify files on server
- [ ] Check PM2 status
- [ ] Test website URL

Daily Use:
- [ ] Make changes locally
- [ ] Commit and push
- [ ] Auto-deploys! ✅

---

## 🆘 Need Help?

### Contact Your Hosting Provider For:
- SSH access credentials
- Node.js installation
- Reverse proxy setup
- Domain configuration
- Firewall/port access

### Check These Resources:
- GitHub Actions logs: `https://github.com/jayrweg/e4c/actions`
- PM2 documentation: `https://pm2.keymetrics.io/`
- This guide: `SSH-DEPLOYMENT-GUIDE.md`

---

## 🎉 Success!

Once set up, your deployment workflow is:

```
Code → Commit → Push → GitHub → SSH Deploy → Live Site
```

**Fully automated! Just push and relax!** 🚀
