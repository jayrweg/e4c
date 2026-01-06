# 🏢 Hosting Company Setup - Quick Start Guide

Simple guide for deploying E4C to your hosting company with GitHub auto-deployment.

---

## 🎯 What You'll Do

1. Get SSH details from your hosting company
2. Generate SSH keys
3. Add keys to GitHub and your server
4. Push code → Automatically deploys! ✅

**Time needed: ~15-20 minutes**

---

## 📋 Step 1: Get Information From Your Hosting Company

Contact your hosting provider and ask for:

```
I need to deploy a Node.js application. Please provide:

1. SSH access details:
   - Server IP address or hostname
   - SSH username
   - SSH port (if not 22)

2. Node.js information:
   - Is Node.js 18 or 20 installed?
   - If not, can you install it?

3. Application directory:
   - Where should I deploy my app?
   - Full path needed (e.g., /home/username/myapp)

4. Domain setup:
   - Can you configure a reverse proxy from my domain to port 3000?
```

**Write down the answers:**
- Server IP: ___________________
- SSH Username: ___________________
- SSH Port: ___________________ (default: 22)
- App Directory: ___________________
- Domain: ___________________

---

## 🔑 Step 2: Generate SSH Keys

### On Windows:

**Option A: Using Git Bash** (Recommended)
1. Open Git Bash
2. Run:
   ```bash
   ssh-keygen -t ed25519 -C "e4c-deploy"
   ```
3. Press Enter 3 times (use defaults, no passphrase)

**Option B: Using PowerShell**
1. Open PowerShell
2. Run:
   ```powershell
   ssh-keygen -t ed25519 -C "e4c-deploy"
   ```
3. Press Enter 3 times

### View Your Keys:

**Private key** (keep secret!):
```bash
cat ~/.ssh/id_ed25519
```

**Public key** (safe to share):
```bash
cat ~/.ssh/id_ed25519.pub
```

**📝 Copy both keys somewhere safe!**

---

## 🖥️ Step 3: Add Public Key to Your Server

### Method 1: Ask Your Hosting Company (Easiest)

Send them this message:
```
Please add this SSH public key to my account:

[Paste your PUBLIC key here - the one ending in .pub]

This is for automated deployment from GitHub.
```

### Method 2: Add It Yourself (If you have SSH access)

```bash
# Connect to server
ssh your-username@your-server-ip

# Create SSH directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
# Paste your PUBLIC key, save (Ctrl+X, Y, Enter)

# Set permissions
chmod 600 ~/.ssh/authorized_keys

# Exit
exit
```

### Test Connection:
```bash
ssh your-username@your-server-ip
```

If you connect without a password, it works! ✅

---

## 🐙 Step 4: Add Secrets to GitHub

1. Go to: https://github.com/jayrweg/e4c
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### Add These 8 Secrets:

#### 1. SSH_PRIVATE_KEY
```
Name: SSH_PRIVATE_KEY
Value: [Paste your ENTIRE private key]
```
**Include the `-----BEGIN` and `-----END` lines!**

#### 2. REMOTE_HOST
```
Name: REMOTE_HOST
Value: [Your server IP or hostname]
```
Example: `123.45.67.89`

#### 3. REMOTE_USER
```
Name: REMOTE_USER
Value: [Your SSH username]
```
Example: `username`

#### 4. REMOTE_TARGET
```
Name: REMOTE_TARGET
Value: [Full path to your app directory]
```
Example: `/home/username/e4c`

#### 5. REMOTE_PORT (Optional - only if NOT 22)
```
Name: REMOTE_PORT
Value: [Your SSH port]
```
Only add if your port is not 22!

#### 6-8. API Keys
```
Name: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: xw1lpmj9

Name: SANITY_API_TOKEN
Value: sk8K8qVPoXcNezyENZnZLjzgehPpyNMAl9QVvCGgXf5rrr0m4zY3yTRCfRNDiD4m5f2dm4pMAjxE2gfSF6R1ZBK3siLom91hMbL6ovG3QXghSPBf3G56YhXff0mMTO5GyKit6wF58Tm8qBCtCE603WFEoWTKMgGMcPBrYVewEIgjltzcTrP1

Name: RESEND_API_KEY
Value: re_QxmYCzWt_8tThPcEg3aSh7wZfK2AuPCpn
```

---

## 🚀 Step 5: Prepare Your Server

Connect to your server:
```bash
ssh your-username@your-server-ip
```

### Install Node.js (if needed):
```bash
# Check if installed
node --version

# If not, install Node.js 20
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### Install PM2:
```bash
npm install -g pm2
```

### Create App Directory:
```bash
mkdir -p ~/e4c
cd ~/e4c
pwd
# Copy this path! Use it as REMOTE_TARGET in GitHub secrets
```

---

## 🎯 Step 6: Deploy!

### First Deployment (Manual):

On your computer:
```bash
cd e4c

# Make deploy script executable
chmod +x deploy.sh

# Run it
./deploy.sh
```

This creates a deployment package. Upload it to your server:

```bash
# Upload (replace with your details)
scp e4c-deploy-*.tar.gz username@server-ip:~/e4c/
```

On your server:
```bash
cd ~/e4c
tar -xzf e4c-deploy-*.tar.gz
pm2 start ecosystem.config.js
pm2 save
```

Your site is now running on port 3000! ✅

---

## 🔄 Step 7: Enable Auto-Deploy

Everything is already set up! Just push to GitHub:

```bash
git add .
git commit -m "Test auto-deploy"
git push origin main
```

**What happens:**
1. ✅ GitHub receives push
2. ✅ Builds your application
3. ✅ Connects to server via SSH
4. ✅ Uploads files
5. ✅ Restarts application
6. ✅ Site updated! (2-5 minutes)

**Monitor deployment:**
https://github.com/jayrweg/e4c/actions

---

## 🌐 Step 8: Connect Your Domain

Ask your hosting company to set up a reverse proxy:

```
Please configure a reverse proxy from my domain (yoursite.com)
to port 3000 on my server.

The application is running on localhost:3000
```

**Or if they give you access, add to .htaccess:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## ✅ Success Checklist

- [ ] Got SSH details from hosting company
- [ ] Generated SSH keys
- [ ] Added public key to server
- [ ] Added secrets to GitHub
- [ ] Installed Node.js and PM2 on server
- [ ] First deployment successful
- [ ] Auto-deploy tested
- [ ] Domain connected

---

## 🔍 Common Issues & Fixes

### "Permission denied (publickey)"
- Public key not added to server
- Wrong username or hostname
- Solution: Re-check Step 3

### GitHub Actions fails at "Deploy to Server"
- SSH_PRIVATE_KEY secret is incorrect
- REMOTE_HOST or REMOTE_USER is wrong
- Solution: Double-check all secrets

### App not accessible on domain
- Reverse proxy not configured
- App not running
- Solution: Check PM2 status, ask hosting company

### "npm: command not found" on server
- Node.js not installed
- Solution: Install Node.js (Step 5)

---

## 📞 Get Help From Your Hosting Company

If you're stuck, contact them and say:

```
I'm deploying a Next.js application that needs:

1. Node.js 20.x installed
2. Ability to run applications on port 3000
3. Reverse proxy from my domain to localhost:3000
4. SSH access with key authentication

Can you help me set this up?
```

---

## 🎉 Done!

Once set up, your workflow is:

```
1. Make changes to code
2. git push origin main
3. Wait 2-5 minutes
4. Site is live! ✅
```

**Fully automated! No more manual deployments!** 🚀

---

## 📚 More Details

Need more information? See:
- **SSH-DEPLOYMENT-GUIDE.md** - Complete SSH deployment guide
- **DEPLOYMENT-GUIDE.md** - All deployment options
- **deploy.sh** - Manual deployment script

**Questions?** Check GitHub Actions logs or contact your hosting provider.
