# IMPORTANT: Redeploy Your Google Apps Scripts

I've updated both scripts to fix the CORS error you were experiencing on localhost. You need to **redeploy** them for the changes to take effect.

## What Was Fixed

Added CORS (Cross-Origin Resource Sharing) headers to allow your localhost website to communicate with Google Apps Script. This fixes the error:
```
Access to fetch... has been blocked by CORS policy
```

Also corrected the email address from `empoweredforchangetx@gmail.com` to `empoweredforchangetz@gmail.com`.

---

## How to Redeploy (Takes 2 minutes)

### Step 1: Redeploy Contact Form Script

1. Go to https://script.google.com
2. Open your **"E4C-Contact-Form-Handler"** project
3. **Delete all the code** in the editor
4. Open the file `contact-form-script.gs` from your project folder
5. **Copy ALL the code** and paste it into the Google Apps Script editor
6. Click **Save** (💾 icon)
7. Click **Deploy** → **Manage deployments**
8. Click the **pencil/edit icon** ✏️ next to your existing deployment
9. In the "Version" dropdown, select **"New version"**
10. Click **Deploy**
11. Click **Done**

### Step 2: Redeploy Donate Form Script

1. Still on https://script.google.com
2. Open your **"E4C-Donate-Form-Handler"** project
3. **Delete all the code** in the editor
4. Open the file `donate-form-script.gs` from your project folder
5. **Copy ALL the code** and paste it into the Google Apps Script editor
6. Click **Save** (💾 icon)
7. Click **Deploy** → **Manage deployments**
8. Click the **pencil/edit icon** ✏️ next to your existing deployment
9. In the "Version" dropdown, select **"New version"**
10. Click **Deploy**
11. Click **Done**

---

## Test Your Forms

After redeploying BOTH scripts:

1. **Refresh your website** in the browser (or restart the dev server)
2. Go to the Contact page and submit a test message
3. Go to the Donate page and submit a test donation

You should now see **success messages** instead of connection errors!

---

## What the Scripts Now Do

Both scripts now:
- ✅ Handle CORS preflight requests (OPTIONS method)
- ✅ Include proper CORS headers in all responses
- ✅ Allow requests from any origin (including localhost)
- ✅ Send emails to the correct address: `rwegasirajackson11@gmail.com`

---

## Still Having Issues?

If you still get errors after redeploying:

1. **Clear your browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Check the browser console (F12) for any new error messages
4. Verify both scripts were redeployed with "New version"
5. Make sure deployment "Who has access" is still set to **"Anyone"**

---

Made with ❤️ for Empowered for Change (E4C)
