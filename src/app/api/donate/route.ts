import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, amount, frequency, message, anonymous } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.DONATION_EMAIL || 'donations@empowerforchange.org',
      subject: `New Donation Pledge: $${amount} ${frequency === 'one-time' ? 'one-time' : frequency}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Donation Pledge</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Donor Information</h3>
            <p><strong>Name:</strong> ${anonymous ? 'Anonymous' : `${firstName} ${lastName}`}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Anonymous Donation:</strong> ${anonymous ? 'Yes' : 'No'}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Donation Details</h3>
            <p><strong>Amount:</strong> $${amount}</p>
            <p><strong>Frequency:</strong> ${frequency === 'one-time' ? 'One-time' : frequency.charAt(0).toUpperCase() + frequency.slice(1)}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Next Steps</h3>
            <p style="color: #92400e; margin: 0;">
              Please contact the donor within 24 hours to process this donation. 
              ${frequency !== 'one-time' ? 'Set up recurring donation processing.' : ''}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This donation pledge was submitted through the EMPOWER FOR CHANGE website.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Donation pledge received successfully' },
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
