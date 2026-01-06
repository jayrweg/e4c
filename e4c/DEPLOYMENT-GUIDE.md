# E4C Deployment Guide

Complete guide for deploying the E4C website with automatic deployments from GitHub.

---

## 🚀 Quick Start - Choose Your Platform

This project supports multiple deployment platforms. Choose the one that best fits your needs:

1. **Render** (Recommended - Already configured) ✅
2. **Vercel** (Easiest for Next.js)
3. **Custom Server** (VPS, AWS, DigitalOcean, etc.)

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub repository connected
- ✅ Environment variables ready:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `SANITY_API_TOKEN`
  - `RESEND_API_KEY`
- ✅ Node.js 20.x installed (for local builds)

---

## 🎯 Option 1: Deploy to Render (Recommended)

### Why Render?
- ✅ Free tier available
- ✅ Auto-deploys on every push to `main` branch
- ✅ Easy environment variable management
- ✅ Built-in SSL certificates
- ✅ Already configured in this project

### Setup Steps:

#### 1. Connect GitHub Repository

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select repository: `jayrweg/e4c`
5. Render will detect the `render.yaml` file automatically

#### 2. Configure Environment Variables

In Render dashboard, add these environment variables:

**Required:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID = xw1lpmj9
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = sk8K8qVPoXcNezyENZnZLjzgehPpyNMAl9QVvCGgXf5rrr0m4zY3yTRCfRNDiD4m5f2dm4pMAjxE2gfSF6R1ZBK3siLom91hMbL6ovG3QXghSPBf3G56YhXff0mMTO5GyKit6wF58Tm8qBCtCE603WFEoWTKMgGMcPBrYVewEIgjltzcTrP1
RESEND_API_KEY = re_QxmYCzWt_8tThPcEg3aSh7wZfK2AuPCpn
```

**Optional (Contact emails are already set in render.yaml):**
```
CONTACT_EMAIL = info@empowerforchange.org
DONATION_EMAIL = info@empowerforchange.org
VOLUNTEER_EMAIL = info@empowerforchange.org
```

#### 3. Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Build your application
   - Deploy to production
   - Assign you a URL (e.g., `empower4change.onrender.com`)

#### 4. Automatic Deployments

**Already Configured!** ✅

The `render.yaml` file has `autoDeploy: true` enabled.

**Every time you push to `main` branch:**
1. GitHub triggers Render
2. Render automatically pulls latest code
3. Runs build process
4. Deploys new version
5. Zero downtime deployment

**To trigger manual deploy:**
- Go to Render dashboard → Your service → Click **"Manual Deploy"**

---

## 🎯 Option 2: Deploy to Vercel

### Why Vercel?
- ✅ Made specifically for Next.js
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Preview deployments for PRs
- ✅ Free tier generous

### Setup Steps:

#### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

#### 2. Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import from GitHub: `jayrweg/e4c`
4. Vercel auto-detects Next.js configuration
5. Configure environment variables (see below)
6. Click **"Deploy"**

#### 3. Environment Variables

Add these in Vercel dashboard under **Settings → Environment Variables**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = xw1lpmj9
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = [your-token]
RESEND_API_KEY = [your-key]
```

#### 4. Configure Auto-Deploy

**Already Configured!** ✅

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every pull request

### Using Vercel CLI (Alternative)

```bash
cd e4c
vercel --prod
```

---

## 🎯 Option 3: Deploy to Custom Server (VPS/Cloud)

### Platforms Supported:
- AWS EC2
- DigitalOcean Droplets
- Google Cloud Compute Engine
- Azure Virtual Machines
- Any Linux VPS

### Method A: Using Docker (Recommended)

#### 1. Install Docker on Server

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

#### 2. Clone Repository on Server

```bash
git clone https://github.com/jayrweg/e4c.git
cd e4c/e4c
```

#### 3. Create Environment File

```bash
nano .env.local
```

Add:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xw1lpmj9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
RESEND_API_KEY=your_key_here
CONTACT_EMAIL=info@empowerforchange.org
DONATION_EMAIL=info@empowerforchange.org
VOLUNTEER_EMAIL=info@empowerforchange.org
```

#### 4. Build and Run with Docker Compose

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

Your site will be available at `http://your-server-ip:3000`

#### 5. Setup Auto-Deploy with GitHub Webhooks

Create a webhook script on your server:

```bash
# /var/www/deploy.sh
#!/bin/bash
cd /path/to/e4c/e4c
git pull origin main
docker-compose down
docker-compose up -d --build
```

Make it executable:
```bash
chmod +x /var/www/deploy.sh
```

Setup GitHub webhook:
1. Go to GitHub repository → Settings → Webhooks
2. Add webhook URL: `http://your-server-ip:9000/hooks/deploy`
3. Install webhook listener: [webhook](https://github.com/adnanh/webhook)

### Method B: Using PM2 (Node Process Manager)

#### 1. Install PM2

```bash
npm install -g pm2
```

#### 2. Clone and Build

```bash
git clone https://github.com/jayrweg/e4c.git
cd e4c/e4c
npm install
npm run build
```

#### 3. Start with PM2

```bash
pm2 start npm --name "e4c" -- start
pm2 save
pm2 startup
```

#### 4. Setup Auto-Deploy

Create deployment script:

```bash
# deploy.sh
#!/bin/bash
cd /path/to/e4c/e4c
git pull origin main
npm install
npm run build
pm2 restart e4c
```

---

## 🔄 GitHub Actions (Auto-Deploy on Push)

### Already Configured! ✅

The `.github/workflows/deploy.yml` file runs automatically on every push to `main`.

### What it does:

1. ✅ Checks out code
2. ✅ Installs dependencies
3. ✅ Runs build
4. ✅ Verifies build success
5. ✅ Triggers deployment (via platform integration)

### Setup GitHub Secrets

For custom server deployment, add these secrets:

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Add secrets:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `SANITY_API_TOKEN`
   - `RESEND_API_KEY`

**For SSH deployment (custom server), also add:**
   - `SSH_PRIVATE_KEY` - Your SSH private key
   - `REMOTE_HOST` - Server IP address
   - `REMOTE_USER` - SSH username (e.g., `ubuntu`)
   - `REMOTE_TARGET` - Deploy path (e.g., `/var/www/e4c`)

---

## 🔧 Build Commands Reference

### Local Development
```bash
cd e4c
npm install
npm run dev
```

### Production Build
```bash
cd e4c
npm install
npm run build
npm start
```

### Standalone Build (for VPS)
```bash
cd e4c
npm run build:standalone
```

### Docker Build
```bash
docker build -t e4c-web .
docker run -p 3000:3000 e4c-web
```

---

## 🌍 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | `xw1lpmj9` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | `production` |
| `SANITY_API_TOKEN` | Sanity API token | `sk8K8qV...` |
| `RESEND_API_KEY` | Resend email API key | `re_QxmYCzWt...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CONTACT_EMAIL` | Contact form recipient | `info@empowerforchange.org` |
| `DONATION_EMAIL` | Donation form recipient | `info@empowerforchange.org` |
| `VOLUNTEER_EMAIL` | Volunteer form recipient | `info@empowerforchange.org` |
| `NODE_VERSION` | Node.js version | `20.11.0` |

---

## 🔍 Troubleshooting

### Build Fails

**Check:**
1. ✅ All environment variables are set
2. ✅ Node version is 20.x
3. ✅ `npm install` completed successfully
4. ✅ No TypeScript errors

**View build logs:**
- **Render:** Dashboard → Your service → Logs
- **Vercel:** Dashboard → Deployments → Click deployment
- **Docker:** `docker-compose logs -f`

### Auto-Deploy Not Working

**Render:**
1. Check `render.yaml` has `autoDeploy: true`
2. Verify GitHub integration is connected
3. Check repository has webhook set up

**Vercel:**
1. Check Vercel GitHub App has repository access
2. Verify deployment settings in Vercel dashboard

**GitHub Actions:**
1. Check `.github/workflows/deploy.yml` exists
2. Verify secrets are set correctly
3. Check Actions tab for error logs

### Environment Variables Not Working

1. Restart your service after adding variables
2. Check variable names match exactly (case-sensitive)
3. For `NEXT_PUBLIC_*` variables, rebuild is required

---

## 📊 Deployment Status Monitoring

### Check Deployment Status

**Render:**
```
https://dashboard.render.com/web/[your-service-id]
```

**Vercel:**
```
https://vercel.com/[username]/e4c
```

**GitHub Actions:**
```
https://github.com/jayrweg/e4c/actions
```

### Health Check Endpoints

After deployment, verify:
```
https://your-domain.com/
https://your-domain.com/api/health (if implemented)
```

---

## 🎉 Success!

Your E4C website is now set up for automatic deployments!

### What Happens Now:

1. **You push code to GitHub** (`git push origin main`)
2. **GitHub triggers deployment** (via webhook or Actions)
3. **Platform builds and deploys** (Render/Vercel/Custom)
4. **New version goes live** (usually 2-5 minutes)
5. **Zero downtime** (seamless rollout)

### Next Steps:

- ✅ Set up custom domain
- ✅ Configure SSL certificate (auto on Render/Vercel)
- ✅ Monitor deployment logs
- ✅ Set up error tracking (Sentry, LogRocket, etc.)

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## 🆘 Need Help?

- Check deployment logs first
- Review environment variables
- Verify build commands
- Check GitHub repository settings
- Contact platform support

**Happy Deploying! 🚀**
