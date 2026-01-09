import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, donationType, selectedAmount, customAmount, message } = body;

    // Validate required fields
    if (!fullName || !email || !donationType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine the final donation amount
    const donationAmount = customAmount || selectedAmount || 'Not specified';

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'E4C Donations <onboarding@resend.dev>',
      to: 'empoweredforchangetz@gmail.com',
      replyTo: email,
      subject: `New Donation Inquiry: ${donationType} - $${donationAmount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Donation Inquiry</h2>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Donor Information</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Donation Details</h3>
            <p><strong>Donation Type:</strong> ${donationType}</p>
            <p><strong>Amount:</strong> $${donationAmount}</p>
            ${message ? `<p><strong>Message:</strong></p><p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px; margin: 10px 0;">${message}</p>` : ''}
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Next Steps</h3>
            <p style="color: #92400e; margin: 0;">
              Please contact the donor within 24 hours to discuss their donation and provide payment information.
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This donation inquiry was submitted from the EMPOWERED FOR CHANGE (E4C) website.
            </p>
          </div>
        </div>
      `,
      text: `New Donation Inquiry

Donor Information:
- Name: ${fullName}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}

Donation Details:
- Type: ${donationType}
- Amount: $${donationAmount}
${message ? `- Message: ${message}` : ''}

Next Steps:
Please contact the donor within 24 hours to discuss their donation and provide payment information.

---
This donation inquiry was submitted from the EMPOWERED FOR CHANGE (E4C) website.`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to process donation pledge' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Donation pledge received successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing donation:', error);
    return NextResponse.json(
      { error: 'Failed to process donation pledge' },
      { status: 500 }
    );
  }
}
