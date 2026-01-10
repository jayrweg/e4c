# Quick Start: Deploy to Evolution Hosting

## Current Status

✅ **Build completed successfully locally**
✅ **Standalone package ready at**: `.next/standalone/`
✅ **All environment variables configured**

## Next Steps (Follow in order)

### 1. Compress the Standalone Folder

**On Windows**:
1. Navigate to `C:\Users\USER\Desktop\Empower4Change\.next\`
2. Right-click on the `standalone` folder
3. Select "Send to" → "Compressed (zipped) folder"
4. Name it `standalone.zip`

### 2. Upload to Evolution Server

**Using cPanel File Manager**:
1. Go to https://vda6000.main-hosting.eu:2083 (or your cPanel URL)
2. Login with your credentials
3. Click "File Manager"
4. Navigate to `/home/olamtecc/`
5. Click "Upload" button (top right)
6. Select and upload `standalone.zip`
7. Wait for upload to complete
8. Right-click `standalone.zip` → "Extract"
9. Delete `standalone.zip` after extraction
10. Rename the `standalone` folder to `e4c-production`

### 3. Configure Node.js Application in cPanel

1. In cPanel, find "Setup Node.js App" (under Software section)
2. Click "Create Application"
3. Fill in the form:
   - **Node.js version**: `20.18.1` (or latest 20.x - NOT 22!)
   - **Application mode**: `Production`
   - **Application root**: `e4c-production`
   - **Application URL**: Select your domain (empoweredforchange.or.tz)
   - **Application startup file**: `server.js`

4. Add Environment Variables (click "Add Variable" for each):
   ```
   NODE_ENV = production
   PORT = 3000
   ```

5. Click "Create"

### 4. Start the Application

1. After creation, you'll see your application listed
2. Click the "Start" button (play icon)
3. Wait for status to change to "Running"

### 5. Test Your Website

Visit: **https://empoweredforchange.or.tz**

Check:
- ✅ Homepage loads
- ✅ Images display
- ✅ Projects page shows Sanity data
- ✅ Contact form works
- ✅ All navigation works

## If Something Goes Wrong

### Application won't start
```bash
# SSH into server
ssh olamtecc@vda6000.main-hosting.eu

# Check if files are there
cd ~/e4c-production
ls -la

# Try running manually to see errors
source /home/olamtecc/nodevenv/e4c-production/20/bin/activate
NODE_ENV=production node server.js
```

### Need to update after code changes
1. Run `npm run build:standalone` locally
2. Upload new `standalone.zip`
3. Extract and replace old files
4. Restart application in cPanel

## File Structure on Server

```
/home/olamtecc/e4c-production/
├── .env.production          (✓ Already included)
├── .next/                   (✓ Build output)
│   ├── static/             (✓ Static assets)
│   └── server/             (✓ Server bundles)
├── node_modules/            (✓ Production deps only)
├── public/                  (✓ Images, fonts, etc)
├── package.json             (✓ Package info)
└── server.js               (✓ Startup script)
```

## Estimated Time
- Compress: 1 minute
- Upload: 5-10 minutes (depending on internet speed)
- Configure: 2 minutes
- **Total: ~15 minutes**

## Support
If you encounter issues:
1. Check cPanel error logs
2. Verify Node.js version is 20.x
3. Ensure `.env.production` exists in e4c-production folder
4. Check file permissions: `chmod -R 755 ~/e4c-production`

## Success! 🎉
Once running, your E4C website will be live at https://empoweredforchange.or.tz with:
- Dynamic content from Sanity CMS
- Working contact/volunteer/donation forms
- Fast performance with optimized build
- All images and assets loaded correctly
