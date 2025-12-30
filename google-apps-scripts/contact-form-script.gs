/**
 * Google Apps Script for E4C Contact Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New project"
 * 3. Name it: E4C-Contact-Form-Handler
 * 4. Copy this entire script and paste it
 * 5. Update NOTIFICATION_EMAIL below with your email
 * 6. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy" and copy the Web App URL
 * 7. Paste the Web App URL into your contact page.tsx (line 67)
 */

// Configuration
const NOTIFICATION_EMAIL = 'empoweredforchangetz@gmail.com'; // Email to receive notifications

/**
 * Handles POST requests from the contact form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return createResponse(false, 'Missing required fields');
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return createResponse(false, 'Invalid email address');
    }

    const timestamp = new Date();

    // Send email notification
    try {
      sendContactNotification(data, timestamp);
    } catch (emailError) {
      // Log error and fail the request since email is the only storage
      console.error('Failed to send email notification:', emailError);
      return createResponse(false, 'Failed to send message. Please try again or contact us directly at ' + NOTIFICATION_EMAIL);
    }

    // Return success response
    return createResponse(true, 'Thank you for your message! We will get back to you soon.');

  } catch (error) {
    // Log the error
    console.error('Error processing contact form:', error);

    // Return error response
    return createResponse(false, 'An error occurred while sending your message. Please try again or contact us directly.');
  }
}

/**
 * Handles OPTIONS requests for CORS preflight
 */
function doOptions(e) {
  return createCORSResponse();
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'success',
      message: 'E4C Contact Form Script is running. Use POST to submit messages.'
    })
  ).setMimeType(ContentService.MimeType.JSON)
   .setHeader('Access-Control-Allow-Origin', '*')
   .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
   .setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Creates a CORS preflight response
 */
function createCORSResponse() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Validates email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sends email notification about new contact message
 */
function sendContactNotification(data, timestamp) {
  const subject = `📧 Contact Form: ${data.subject}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ff6600; border-bottom: 3px solid #ff6600; padding-bottom: 10px;">
        New Contact Message Received
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

      <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Contact Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5; width: 30%;"><strong>👤 Name:</strong></td>
          <td style="padding: 8px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5;"><strong>📧 Email:</strong></td>
          <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f5f5f5;"><strong>📝 Subject:</strong></td>
          <td style="padding: 8px;"><strong>${data.subject}</strong></td>
        </tr>
      </table>

      <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px;">💬 Message</h3>
      <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; margin: 10px 0; line-height: 1.6;">
        ${data.message.replace(/\n/g, '<br>')}
      </div>

      <div style="background-color: #e7f3ff; border: 1px solid #2196F3; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p style="margin: 0;"><strong>💡 Quick Reply:</strong> Click the "Reply" button in your email client to respond directly to <a href="mailto:${data.email}">${data.email}</a></p>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <p style="color: #666; font-size: 12px; text-align: center;">
        This email was automatically generated from the E4C website contact form.<br>
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
function testContactScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Message',
        message: 'This is a test message to verify the contact form script is working correctly.'
      })
    }
  };

  const response = doPost(testData);
  Logger.log(response.getContent());
}
