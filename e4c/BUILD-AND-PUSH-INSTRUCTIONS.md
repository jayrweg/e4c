# 🏗️ Build and Push Instructions

## What You Need to Do:

You will build the project locally on your computer, then push the built files to GitHub.
The server person can then just clone and run without building!

---

## Step 1: Build the Project Locally

Open Command Prompt or PowerShell and run:

```bash
cd e4c

# Clean any old build files
rmdir /s /q .next

# Build the project (this takes 2-5 minutes)
npm run build
```

**Wait for build to complete!** You'll see:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                   ...      ...
└ ○ /about                              ...      ...
...

✓ Build completed
```

---

## Step 2: Verify Built Files Exist

```bash
# Check that .next folder was created
dir .next

# You should see folders like:
# - static/
# - server/
# - cache/
```

---

## Step 3: Commit Built Files to Git

```bash
# Add all files including .next folder
git add .

# Check what will be committed
git status

# You should see:
# - modified: .gitignore
# - new file: .env.production
# - new file: .next/... (many files)

# Commit
git commit -m "Add pre-built files for server deployment

- Built .next/ folder with all static assets
- Added .env.production for production config
- Updated .gitignore to include built files
- Server can now clone and run without building

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Step 4: Push to GitHub

```bash
git push origin main
```

---

## Step 5: Tell Server Person

Send them this message:

```
Hi,

I've pushed the pre-built files to GitHub!

You can now deploy with these simple steps:

1. Clone repository:
   cd /var/www
   git clone git@github.com:jayrweg/e4c.git

2. Navigate to project:
   cd e4c

3. Copy environment file:
   cp .env.production .env.production

4. Install ONLY runtime dependencies (no build tools needed!):
   npm install --production

5. Start application:
   npm install -g pm2
   pm2 start npm --name "e4c-website" -- start
   pm2 save

6. Configure web server reverse proxy to point domain to localhost:3000

NO BUILD NEEDED! The .next/ folder with all built files is already in the repository.

IMPORTANT: Use Node.js 20 LTS (NOT 22) to avoid memory issues:
   nvm install 20
   nvm use 20

URL will be: https://empoweredforchange.or.tz
```

---

## 🔄 For Future Updates:

When you make changes:

```bash
# 1. Make your code changes

# 2. Build locally
npm run build

# 3. Commit and push
git add .
git commit -m "Your changes"
git push origin main
```

Server person updates:

```bash
cd /var/www/e4c
git pull origin main
pm2 restart e4c-website
```

---

## ✅ Benefits of This Approach:

1. ✅ Server doesn't need build tools
2. ✅ Server doesn't need to run npm run build
3. ✅ Faster deployment (just git pull)
4. ✅ Less memory needed on server
5. ✅ No build errors on server
6. ✅ Server just runs pre-built files

---

## ⚠️ Important Notes:

1. **Always build before pushing** - Don't push code changes without building first
2. **Verify build succeeds** - Check that `npm run build` completes without errors
3. **Check .next folder size** - Should be ~50-200MB (normal for Next.js)
4. **Node 20 LTS required** - Both for building and running

---

This is your custom setup where YOU build and the server just runs! 🚀
