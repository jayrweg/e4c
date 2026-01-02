# Resend Email Setup Guide

## What Changed?

Your contact and donate forms now use **Resend** instead of Google Apps Scripts. This eliminates CORS errors and provides reliable email delivery.

## Why This Is Better

- **No CORS issues**: API routes are same-origin
- **More reliable**: Professional email service
- **Easier to manage**: No Google Scripts deployment
- **Better tracking**: Email delivery monitoring
- **Free tier**: 3,000 emails/month

## Quick Setup (5 minutes)

### 1. Create Resend Account

1. Go to https://resend.com/signup
2. Sign up with your email
3. Verify your email address

### 2. Get Your API Key

1. Login to https://resend.com
2. Go to **API Keys** in the sidebar
3. Click **Create API Key**
4. Name it: `E4C-Website`
5. Copy the API key (starts with `re_`)

### 3. Add API Key to Your Project

1. Open `e4c/.env.local`
2. Find the line: `RESEND_API_KEY=your_resend_api_key_here`
3. Replace `your_resend_api_key_here` with your actual API key
4. Save the file

Example:
```
RESEND_API_KEY=re_AbCdEfGh_1234567890
```

### 4. Test Your Forms

1. Restart your development server:
   ```bash
   cd e4c
   npm run dev
   ```

2. Open http://localhost:3000/contact

3. Fill out and submit the form

4. Check your email at `rwegasirajackson11@gmail.com`

## That's It!

Your forms should now work perfectly with no CORS errors.

## What's Configured

- **From email**: `onboarding@resend.dev` (Resend's test domain)
- **To email**: `rwegasirajackson11@gmail.com`
- **Reply-To**: User's email (so you can reply directly)

## Optional: Use Your Own Domain

Once you have a domain for E4C:

1. Go to https://resend.com/domains
2. Click **Add Domain**
3. Enter your domain (e.g., `empowerforchange.org`)
4. Add the DNS records shown
5. Update the API routes in:
   - `src/app/api/contact/route.ts` (line 21)
   - `src/app/api/donate/route.ts` (line 21)

   Change from:
   ```typescript
   from: 'E4C Contact Form <onboarding@resend.dev>'
   ```

   To:
   ```typescript
   from: 'E4C Contact Form <noreply@empowerforchange.org>'
   ```

## Troubleshooting

### Forms not working?

1. **Check API key**: Make sure it's in `.env.local` without quotes
2. **Restart server**: Run `npm run dev` again
3. **Check console**: Look for errors in browser console

### Not receiving emails?

1. Check spam folder
2. Verify API key is correct
3. Check Resend dashboard for delivery logs

### Still having issues?

- Check Resend logs: https://resend.com/logs
- Verify your Resend account is active
- Make sure you've verified your email with Resend

## Files Changed

- `src/app/api/contact/route.ts` - Contact form API
- `src/app/api/donate/route.ts` - Donate form API
- `src/app/contact/page.tsx` - Updated to use local API
- `src/app/donate/page.tsx` - Updated to use local API
- `.env.local` - Added RESEND_API_KEY

## Old Google Scripts (No Longer Needed)

You can safely ignore:
- `google-apps-scripts/contact-form-script.gs`
- `google-apps-scripts/donate-form-script.gs`
- All Google Apps Script URLs

These are kept for reference but are no longer used.
