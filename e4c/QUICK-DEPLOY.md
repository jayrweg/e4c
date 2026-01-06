# 🚀 Quick Deploy Guide

## Already Deployed on Render?

**Good news! Auto-deploy is already configured!** ✅

Every time you push to the `main` branch, your site automatically deploys.

---

## 🎯 What You Need to Do

### 1. Push Your Code (That's It!)

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**What happens automatically:**
1. ✅ GitHub receives your push
2. ✅ Render detects the change
3. ✅ Builds your application
4. ✅ Deploys to production
5. ✅ Your site updates (2-5 minutes)

---

## 📋 First Time Setup (Only Once)

### Step 1: Go to Render

1. Visit: https://dashboard.render.com/
2. Login with GitHub

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect repository: `jayrweg/e4c`
3. Render auto-detects `render.yaml` ✅

### Step 3: Add Environment Variables

Add these in Render dashboard:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = xw1lpmj9
SANITY_API_TOKEN = sk8K8qVPoXcNezyENZnZLjzgehPpyNMAl9QVvCGgXf5rrr0m4zY3yTRCfRNDiD4m5f2dm4pMAjxE2gfSF6R1ZBK3siLom91hMbL6ovG3QXghSPBf3G56YhXff0mMTO5GyKit6wF58Tm8qBCtCE603WFEoWTKMgGMcPBrYVewEIgjltzcTrP1
RESEND_API_KEY = re_QxmYCzWt_8tThPcEg3aSh7wZfK2AuPCpn
```

### Step 4: Deploy

Click **"Create Web Service"** - Done! ✅

---

## 🔄 Daily Workflow

### Making Changes:

```bash
# 1. Make your changes to the code
# 2. Commit them
git add .
git commit -m "Describe your changes"

# 3. Push to GitHub
git push origin main

# 4. Wait 2-5 minutes
# ✅ Your site is now live with the changes!
```

---

## 🎛️ Manual Deploy (If Needed)

Sometimes you want to redeploy without code changes:

1. Go to Render dashboard
2. Select your service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🌐 Alternative: Deploy to Vercel (Easier!)

### Even Simpler Option:

1. Go to https://vercel.com
2. Click **"New Project"**
3. Import `jayrweg/e4c`
4. Add environment variables (same as above)
5. Click **"Deploy"**

**Auto-deploy enabled by default!** ✅

---

## 📱 Check Deployment Status

### Render:
- Dashboard: https://dashboard.render.com
- View logs in real-time
- See deployment history

### Vercel:
- Dashboard: https://vercel.com/dashboard
- Preview deployments for PRs
- Instant rollbacks

### GitHub Actions:
- Check: https://github.com/jayrweg/e4c/actions
- See build status
- View logs if build fails

---

## ✅ Deployment Checklist

Before pushing:

- [ ] Tested changes locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables are correct
- [ ] Committed all changes
- [ ] Ready to deploy!

---

## 🆘 Troubleshooting

### Build Failed?

1. **Check logs** in Render/Vercel dashboard
2. **Common issues:**
   - Missing environment variable
   - Syntax error in code
   - TypeScript error

3. **Fix and push again:**
   ```bash
   # Fix the error
   git add .
   git commit -m "Fix build error"
   git push origin main
   ```

### Site Not Updating?

1. Check Render/Vercel dashboard for deployment status
2. Verify push was successful: `git log`
3. Try manual deploy in dashboard
4. Check deployment logs for errors

---

## 🎉 You're All Set!

From now on, just:

1. **Code** → Make changes
2. **Commit** → `git commit -m "..."`
3. **Push** → `git push origin main`
4. **Done!** → Site auto-updates

---

## 📚 Need More Details?

See full guide: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

**Happy Deploying! 🚀**
