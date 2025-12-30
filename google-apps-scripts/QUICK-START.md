# Quick Start Guide

**Super simple setup - No Google Sheets needed!**

## 🚀 Quick Setup (5 minutes)

### 1. Create Donate Script
```
1. Go to: https://script.google.com
2. Click "New project"
3. Name it: E4C-Donate-Form-Handler
4. Copy/paste code from: donate-form-script.gs
5. Deploy → New deployment → Web app → Anyone → Deploy
6. Copy the Web App URL
```

### 2. Create Contact Script
```
1. Go to: https://script.google.com
2. Click "New project"
3. Name it: E4C-Contact-Form-Handler
4. Copy/paste code from: contact-form-script.gs
5. Deploy → New deployment → Web app → Anyone → Deploy
6. Copy the Web App URL
```

### 3. Update Website
```
Donate page (line 83):
const scriptURL = 'YOUR_DONATE_SCRIPT_URL_HERE';

Contact page (line 67):
const scriptURL = 'YOUR_CONTACT_SCRIPT_URL_HERE';
```

### 4. Test It
```
1. Run: npm run dev
2. Go to: http://localhost:3000/donate
3. Fill form & submit
4. Check your email! 📧
```

## ✅ What You Get

- Beautiful formatted emails sent to: empoweredforchangetx@gmail.com (or empoweredforchangetz@gmail.com)
- Success/failure notifications on website
- No database setup needed
- All info comes via email

## ⚠️ Common Issues

**Not receiving emails?**
→ Check spam folder!

**Form shows error?**
→ Make sure you deployed as "Anyone" can access

**Authorization error?**
→ Grant email permissions when deploying

## 📖 Need More Help?

Read: `SETUP-INSTRUCTIONS.md` for detailed step-by-step guide

---

That's it! 🎉
