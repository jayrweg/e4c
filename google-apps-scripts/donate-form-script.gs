/**
 * Google Apps Script for E4C Donate Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New project"
 * 3. Name it: E4C-Donate-Form-Handler
 * 4. Copy this entire script and paste it
 * 5. Update NOTIFICATION_EMAIL below with your email
 * 6. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy" and copy the Web App URL
 * 7. Paste the Web App URL into your donate page.tsx (line 83)
 */

// Configuration
const NOTIFICATION_EMAIL = 'rwegasirajackson11@gmail.com'; // Email to receive notifications

/**
 * Handles POST requests from the donate form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.donationType) {
      return createResponse(false, 'Missing required fields');
    }

    // Validate that an amount is provided
    const finalAmount = data.customAmount || data.selectedAmount;
    if (!finalAmount) {
      return createResponse(false, 'Please select or enter a donation amount');
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return createResponse(false, 'Invalid email address');
    }

    const timestamp = new Date();

    // Send email notification
    try {
      sendDonationNotification(data, finalAmount, timestamp);
    } catch (emailError) {
      // Log error and fail the request since email is the only storage
      console.error('Failed to send email notification:', emailError);
      return createResponse(false, 'Failed to send notification. Please try again or contact us directly at ' + NOTIFICATION_EMAIL);
    }

    // Return success response
    return createResponse(true, 'Donation inquiry received successfully! We will contact you shortly with payment instructions.');

  } catch (error) {
    // Log the error
    console.error('Error processing donation:', error);

    // Return error response
    return createResponse(false, 'An error occurred while processing your donation inquiry. Please try again or contact us directly.');
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return createResponse(true, 'E4C Donation Form Script is running. Use POST to submit donations.');
}

/**
 * Creates a JSON response with CORS headers
 */
function createResponse(success, message) {
  const response = {
    status: success ? 'success' : 'error',
    message: message
  };

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Validates email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sends email notification about new donation inquiry
 */
function sendDonationNotification(data, amount, timestamp) {
  const subject = '💰 New Donation Inquiry - E4C';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ff6600; border-bottom: 3px solid #ff6600; padding-bottom: 10px;">
        New Donation Inquiry Received
      </h2>

      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>📅 Received:</strong> ${timestamp.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })}</p>
      </div>

      <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Donor Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5;"><strong>👤 Full Name:</strong></td>
          <td style="padding: 8px;">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5;"><strong>📧 Email:</strong></td>
          <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5;"><strong>📱 Phone:</strong></td>
          <td style="padding: 8px;"><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
      </table>

      <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px;">Donation Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5;"><strong>💳 Type:</strong></td>
          <td style="padding: 8px;">${data.donationType === 'monthly' ? '🔄 Monthly Recurring' : '⚡ One-Time'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5;"><strong>💵 Amount:</strong></td>
          <td style="padding: 8px; font-size: 18px; color: #ff6600;"><strong>$${amount}${data.donationType === 'monthly' ? '/month' : ''}</strong></td>
        </tr>
      </table>

      ${data.message ? `
        <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px;">💬 Message from Donor</h3>
        <div style="background-color: #fff7f0; padding: 15px; border-left: 4px solid #ff6600; margin: 10px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
      ` : ''}

      <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p style="margin: 0;"><strong>⚠️ Action Required:</strong> Please follow up with the donor to provide payment instructions and complete the donation process.</p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <p style="color: #666; font-size: 12px; text-align: center;">
        This email was automatically generated from the E4C website donation form.<br>
        Empowered for Change (E4C) | <a href="mailto:${NOTIFICATION_EMAIL}">${NOTIFICATION_EMAIL}</a>
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    replyTo: data.email
  });
}

/**
 * Test function to verify the script works
 */
function testDonationScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+255123456789',
        donationType: 'one-time',
        selectedAmount: '50',
        customAmount: '',
        message: 'This is a test donation inquiry'
      })
    }
  };

  const response = doPost(testData);
  Logger.log(response.getContent());
}
