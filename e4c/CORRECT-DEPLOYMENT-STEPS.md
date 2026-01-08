# ✅ CORRECT Deployment Steps - Fix for Server Person

## 🚨 Issue 1: Double Folder Problem (e4c/e4c)

### ❌ WRONG WAY (Creates /e4c/e4c):
```bash
mkdir e4c
cd e4c
git clone git@github.com:jayrweg/e4c.git
# This creates: e4c/e4c/ (DOUBLE NESTING!)
```

### ✅ CORRECT WAY (Creates just /e4c):
```bash
# Don't create folder first! Git clone creates it automatically
cd /var/www   # Or wherever your web root is
git clone git@github.com:jayrweg/e4c.git
# This creates: e4c/ (SINGLE LAYER!)
```

---

## 🚨 Issue 2: No Built Static Files Visible

### Why You Don't See .next/ Folder:

**Built files (`.next/` folder) are NOT in Git repository!**

This is **NORMAL** and **CORRECT** for Next.js projects because:
- Built files are generated, not source code
- Different servers need different builds
- Keeps repository clean and small
- Standard practice for all Next.js projects

### ✅ You Build AFTER Cloning:

```bash
# 1. Clone repository
cd /var/www
git clone git@github.com:jayrweg/e4c.git

# 2. Navigate to project
cd e4c

# 3. Create environment file
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

```bash
# 4. Install dependencies (this creates node_modules/)
npm install

# 5. BUILD THE PROJECT (this creates .next/ folder with static files!)
npm run build

# 6. Now you'll see the built files:
ls -la .next
# Output: Shows built static files, server files, etc.

# 7. Start with PM2
pm2 start npm --name "e4c-website" -- start
pm2 save
```

---

## 📁 What You'll See After Building:

### Before Build:
```
e4c/
├── package.json       ✅ (source files)
├── next.config.ts     ✅ (source files)
├── src/               ✅ (source code)
├── public/            ✅ (static assets)
└── ...
```

### After npm install + npm run build:
```
e4c/
├── package.json
├── next.config.ts
├── src/
├── public/
├── node_modules/      ✅ NEW (created by npm install)
└── .next/             ✅ NEW (created by npm run build)
    ├── static/        (built static files)
    ├── server/        (server files)
    └── ...
```

---

## 🌐 Web Server Configuration

### URL: https://empoweredforchange.or.tz

**Point web server document root to:**
```
/var/www/e4c
```

**NOT:**
```
/var/www/e4c/e4c  ❌ (wrong - double nesting)
/var/www           ❌ (wrong - too high)
```

### For Apache (.htaccess):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

### For Nginx:
```nginx
server {
    listen 80;
    server_name empoweredforchange.or.tz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔄 Update Process (After Initial Setup):

```bash
cd /var/www/e4c

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild (this updates .next/ folder)
npm run build

# Restart application
pm2 restart e4c-website

# Verify
pm2 status
```

---

## ✅ Complete Fresh Setup (Step by Step):

```bash
# Step 1: Remove wrong setup (if exists)
rm -rf /var/www/e4c

# Step 2: Clone repository correctly
cd /var/www
git clone git@github.com:jayrweg/e4c.git

# Step 3: Navigate to project
cd e4c
pwd
# Should show: /var/www/e4c (NOT /var/www/e4c/e4c!)

# Step 4: Verify files
ls -la
# Should see: package.json, next.config.ts, src/, public/, etc.

# Step 5: Create environment file
nano .env.production
# (Add environment variables as shown above)

# Step 6: Install Node.js 20 (if not installed)
node --version
# If not 20.x:
nvm install 20
nvm use 20

# Step 7: Install dependencies
npm install
# This creates node_modules/

# Step 8: Build project
npm run build
# This creates .next/ with all built static files!

# Step 9: Verify build files exist
ls -la .next
# Should see folders: static/, server/, cache/, etc.

# Step 10: Install PM2
npm install -g pm2

# Step 11: Start application
pm2 start npm --name "e4c-website" -- start

# Step 12: Save PM2 config
pm2 save

# Step 13: Setup PM2 startup
pm2 startup
# Run the command it gives you

# Step 14: Check status
pm2 status
# Should show: e4c-website | online

# Step 15: Test locally
curl http://localhost:3000
# Should return HTML

# Step 16: Configure web server
# Point domain to localhost:3000 using reverse proxy
```

---

## 🎯 Summary for Server Person:

### The Problem:
1. ❌ You created `e4c` folder then cloned inside it → creates `e4c/e4c`
2. ❌ You expected built files in Git → they're generated after clone

### The Solution:
1. ✅ Clone directly (git clone creates folder automatically)
2. ✅ Build after cloning (`npm run build` creates `.next/` folder)
3. ✅ Point web server to `/var/www/e4c` (not `/var/www/e4c/e4c`)

### Final Structure:
```
/var/www/e4c/          ← Web server points HERE
├── package.json
├── next.config.ts
├── src/
├── public/
├── node_modules/      ← Created by: npm install
└── .next/             ← Created by: npm run build (BUILT FILES ARE HERE!)
```

### URL Result:
```
https://empoweredforchange.or.tz  ✅ Correct!
```

**NOT:**
```
https://empoweredforchange.or.tz/e4c/e4c  ❌ Wrong!
```

---

## 📞 If Still Having Issues:

**Check these:**

```bash
# 1. Verify you're in the right place
pwd
# Should show: /var/www/e4c

# 2. Verify source files exist
ls -la package.json
# Should exist

# 3. Verify build completed
ls -la .next
# Should exist and contain files

# 4. Verify app is running
pm2 status
# Should show: online

# 5. Test locally
curl http://localhost:3000
# Should return HTML

# 6. Check web server config
# Make sure reverse proxy points to localhost:3000
```

---

## 💡 Important Notes:

1. **DO NOT commit .next/ folder to Git** - It's generated
2. **DO run `npm run build` on the server** - This creates .next/
3. **Clone directly** - Don't create folder first
4. **Point web server to /var/www/e4c** - Single layer

---

This is the **CORRECT** and **STANDARD** way to deploy Next.js applications!
