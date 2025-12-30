# Google Apps Script Setup Instructions

This guide will help you set up the Google Apps Scripts for your E4C website's Contact and Donate forms.

## Overview

You have two scripts:
1. **donate-form-script.gs** - Handles donation inquiries
2. **contact-form-script.gs** - Handles contact messages

Both scripts will:
- ✅ Send beautiful email notifications to your team
- ✅ Return proper success/failure responses to the website
- ✅ Validate form data
- ✅ No Google Sheets needed - everything via email!

---

## Step 1: Set Up Donate Form Script

1. Go to https://script.google.com
2. Click **"New project"** (top left)
3. You'll see a blank code editor
4. Name your project: Click "Untitled project" at the top and rename it to **"E4C-Donate-Form-Handler"**
5. Delete any default code in the editor
6. Open **`donate-form-script.gs`** from your project folder
7. Copy the ENTIRE contents and paste it into the Google Apps Script editor
8. (Optional) Update the email on line 20 if different:
   ```javascript
   const NOTIFICATION_EMAIL = 'empoweredforchangetz@gmail.com';
   ```
9. Click the **Save** icon (💾)

### Deploy the Donate Script:
10. Click **Deploy** > **New deployment**
11. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
12. Configure the deployment:
    - **Description:** "E4C Donate Form Handler"
    - **Execute as:** Me (your email)
    - **Who has access:** **Anyone**
13. Click **Deploy**
14. If prompted, click **Authorize access** and grant permissions (this allows the script to send emails on your behalf)
15. **IMPORTANT:** Copy the **Web App URL** (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)
16. Click **Done**

---

## Step 2: Set Up Contact Form Script

1. Go back to https://script.google.com
2. Click **"New project"** again (this creates a separate script)
3. Name this project: **"E4C-Contact-Form-Handler"**
4. Delete the default code
5. Open **`contact-form-script.gs`** from your project folder
6. Copy the ENTIRE contents and paste it into the editor
7. (Optional) Update the email on line 20 if different:
   ```javascript
   const NOTIFICATION_EMAIL = 'empoweredforchangetz@gmail.com';
   ```
8. Click the **Save** icon (💾)

### Deploy the Contact Script:
9. Click **Deploy** > **New deployment**
10. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
11. Configure the deployment:
    - **Description:** "E4C Contact Form Handler"
    - **Execute as:** Me (your email)
    - **Who has access:** **Anyone**
12. Click **Deploy**
13. If prompted, click **Authorize access** and grant permissions
14. **IMPORTANT:** Copy the **Web App URL**
15. Click **Done**

---

## Step 3: Update Your Website Code

### Update Donate Page:
1. Open `e4c/src/app/donate/page.tsx`
2. Find line 83: `const scriptURL = 'YOUR_DONATE_SCRIPT_URL_HERE';`
3. Replace `YOUR_DONATE_SCRIPT_URL_HERE` with the Web App URL from Step 1
4. Example:
   ```typescript
   const scriptURL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```

### Update Contact Page:
1. Open `e4c/src/app/contact/page.tsx`
2. Find line 67: `const scriptURL = 'YOUR_CONTACT_SCRIPT_URL_HERE';`
3. Replace `YOUR_CONTACT_SCRIPT_URL_HERE` with the Web App URL from Step 2

---

## Step 4: Test Your Forms

### Test the Donate Form:
1. Run your website locally: `npm run dev`
2. Navigate to the donate page: http://localhost:3000/donate
3. Fill out the form with test data:
   - Use your real email for testing
   - Select a donation type and amount
4. Click **"Submit Donation Inquiry"**
5. ✅ You should see a **green success message**
6. ✅ Check your email inbox - you should receive a beautiful formatted notification

### Test the Contact Form:
1. Navigate to the contact page: http://localhost:3000/contact
2. Fill out the form with test data
3. Click **"Send Message"**
4. ✅ You should see a **green success message**
5. ✅ Check your email inbox - you should receive the contact notification

### Test Error Handling:
- Try submitting forms with missing fields → Should see red error message
- Try submitting with invalid email → Should see validation error
- The form should prevent submission if required fields are empty

---

## Troubleshooting

### "Authorization required" error:
- Make sure you clicked **"Authorize access"** during deployment
- Go to Apps Script > Deploy > Manage deployments > Edit deployment > Re-authorize
- Grant permission for the script to send emails

### Forms not submitting / Getting error messages:
- Open browser console (Press F12 > Console tab) and check for errors
- Verify the Web App URLs are correct in your code (line 83 in donate page, line 67 in contact page)
- Make sure you deployed as **"Anyone"** can access (not just "Me")
- Make sure the URL ends with `/exec` not `/dev`

### Not receiving emails:
- **Check your spam/junk folder** (this is the most common issue!)
- Verify the `NOTIFICATION_EMAIL` is correct in both scripts
- Check Apps Script execution logs:
  1. Go to https://script.google.com
  2. Open your project
  3. Click on "Executions" icon on the left
  4. Look for any error messages
- Make sure you granted email permissions during authorization

### "Failed to send notification" error on website:
- This means the email couldn't be sent
- Check Apps Script execution logs for the exact error
- Verify you have email sending permissions
- Try re-authorizing the script

---

## What You'll Receive via Email

### Donate Form Emails Include:
- 💰 Professional formatted email with E4C branding
- 👤 Full donor information (name, email, phone)
- 💵 Donation type (one-time or monthly) and amount
- 💬 Optional message from donor
- 📅 Timestamp with full date/time
- ✉️ Direct reply-to link to donor's email

### Contact Form Emails Include:
- 📧 Professional formatted email
- 👤 Sender's name and email (clickable)
- 📝 Subject line
- 💬 Full message content
- 📅 Timestamp
- 💡 One-click reply functionality

---

## Security & Privacy

- ✅ Scripts run under YOUR Google account only
- ✅ Email notifications go ONLY to the address you specify
- ✅ No data is stored in databases or spreadsheets
- ✅ Form data is validated before sending
- ✅ No sensitive payment information is collected (donation inquiries only)
- ✅ HTTPS encrypted communication
- ✅ All submissions are timestamped

---

## Need Help?

If you encounter any issues:
1. Read the **Troubleshooting** section above (covers 90% of issues)
2. Check Apps Script execution logs: https://script.google.com > Your Project > Executions
3. Verify Web App URLs are correctly copied
4. Ensure authorization permissions were granted
5. Check spam folder for notification emails

---

## Next Steps (Optional Enhancements)

1. **Auto-Reply Emails:** Add code to send confirmation emails to donors/contacts
2. **Custom Email Templates:** Modify the HTML styling in the notification functions
3. **SMS Notifications:** Integrate with Twilio for text message alerts
4. **Connect Payment Gateway:** For actual payment processing, integrate Stripe or PayPal
5. **Analytics Tracking:** Add Google Analytics event tracking to form submissions
6. **Database Integration:** Connect to Airtable or Firebase for additional storage
7. **Slack Integration:** Send notifications to a Slack channel

---

## Support

For questions about:
- **Google Apps Script:** https://developers.google.com/apps-script
- **Email Delivery:** Check your Google Account email sending limits
- **Website Integration:** Review the Next.js fetch implementation in the page files

Made with ❤️ for Empowered for Change (E4C)
