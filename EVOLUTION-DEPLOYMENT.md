# Evolution Hosting Deployment Guide

## Overview
Since Evolution server has resource limitations that prevent building Next.js on the server, we build locally and upload the pre-built standalone package.

## Prerequisites
- Local build completed (✓ Done)
- Standalone package created in `.next/standalone/` (✓ Done)
- Evolution hosting credentials

## Step 1: Prepare Environment File

Before uploading, ensure `.next/standalone/.env.production` has the correct values:

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

## Step 2: Upload Standalone Package to Server

### Option A: Using cPanel File Manager

1. **Compress the standalone folder**:
   - On Windows, right-click `.next/standalone` folder
   - Select "Send to" > "Compressed (zipped) folder"
   - Name it `standalone.zip`

2. **Upload via cPanel**:
   - Log into Evolution cPanel
   - Go to File Manager
   - Navigate to your home directory `/home/olamtecc/`
   - Click "Upload" button
   - Upload `standalone.zip`
   - Right-click `standalone.zip` > "Extract"
   - Rename extracted folder from `standalone` to `e4c-production`

### Option B: Using SCP/SFTP (Faster for large files)

```bash
# On your local machine (Git Bash or WSL)
cd "C:\Users\USER\Desktop\Empower4Change\.next"
scp -r standalone olamtecc@vda6000.main-hosting.eu:~/e4c-production
```

## Step 3: Configure on Evolution Server

SSH into the server:

```bash
ssh olamtecc@vda6000.main-hosting.eu
```

Then run these commands:

```bash
# Navigate to the deployment directory
cd ~/e4c-production

# Verify files are there
ls -la
# Should see: .env.production, .next/, node_modules/, package.json, public/, server.js

# Activate Node.js 20 environment (IMPORTANT: Use Node 20, not 22!)
source /home/olamtecc/nodevenv/e4c-production/20/bin/activate

# The node_modules are already included from the build
# If any production dependencies are missing, run:
npm install --production

# Test the server locally
NODE_ENV=production PORT=3000 node server.js
```

## Step 4: Configure in cPanel Node.js Application

1. **Log into cPanel**
2. **Go to "Setup Node.js App"**
3. **Click "Create Application"** with these settings:
   - **Node.js version**: 20.x.x (Use 20 LTS, NOT 22!)
   - **Application mode**: Production
   - **Application root**: `e4c-production`
   - **Application URL**: Your domain (e.g., empoweredforchange.or.tz)
   - **Application startup file**: `server.js`
   - **Environment variables**: Click "Add Variable" and add:
     ```
     NODE_ENV=production
     PORT=3000
     ```

4. **Click "Create"**

5. **Start the application** by clicking the "Start" button

## Step 5: Verify Deployment

Visit your website:
- https://empoweredforchange.or.tz

Check that:
- ✓ Homepage loads
- ✓ Images display correctly
- ✓ Navigation works
- ✓ Sanity content loads (projects, resources, events)
- ✓ Contact form works

## Updating the Deployment

When you make code changes:

1. **Build locally**:
   ```bash
   npm run build:standalone
   ```

2. **Upload new standalone folder** following Step 2

3. **Restart application** in cPanel Node.js App Manager

## Troubleshooting

### Application won't start
- Check Node.js version is 20.x.x (not 22!)
- Verify `.env.production` file exists and has correct values
- Check cPanel error logs

### Images not loading
- Verify `public/` folder was copied to standalone
- Check file permissions: `chmod -R 755 ~/e4c-production/public`

### Sanity content not loading
- Verify SANITY_API_TOKEN in `.env.production`
- Check Sanity project ID matches

### Port conflicts
- cPanel assigns ports automatically - use the port shown in cPanel
- Update PORT environment variable if needed

## Notes

- **Always use Node 20 LTS** - Node 22 has compatibility issues with Next.js 15
- **Standalone build includes**:
  - Compiled application code
  - Production dependencies only
  - Static files
  - Server startup script
- **File size**: Approximately 50-100 MB (much smaller than full build)
- **Build time**: 1-2 minutes locally vs impossible on shared hosting

## Success Criteria

✓ Application builds successfully locally
✓ Standalone package created
✓ Files uploaded to server
✓ Node.js 20 environment configured
✓ Application starts without errors
✓ Website accessible at domain
✓ All features working (navigation, forms, Sanity content)
