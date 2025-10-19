import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      age, 
      interests, 
      availability, 
      experience, 
      motivation, 
      emergencyContact, 
      emergencyPhone 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !age || !availability || !motivation) {
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
      to: process.env.VOLUNTEER_EMAIL || 'volunteers@empoweredforchange.or.tz',
      subject: `New Volunteer Application: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Volunteer Application</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Personal Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Age:</strong> ${age}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Volunteer Interests</h3>
            <p><strong>Areas of Interest:</strong> ${interests.length > 0 ? interests.join(', ') : 'None specified'}</p>
            <p><strong>Availability:</strong> ${availability}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Background & Motivation</h3>
            <p><strong>Relevant Experience:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px; margin: 10px 0;">${experience || 'Not provided'}</p>
            <p><strong>Motivation:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px; margin: 10px 0;">${motivation}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Emergency Contact</h3>
            <p><strong>Name:</strong> ${emergencyContact}</p>
            <p><strong>Phone:</strong> ${emergencyPhone}</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Next Steps</h3>
            <p style="color: #92400e; margin: 0;">
              Please contact the volunteer within 48 hours to schedule an interview and discuss next steps.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This volunteer application was submitted through the EMPOWERED FOR CHANGE (E4C) website.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Volunteer application received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing volunteer application:', error);
    return NextResponse.json(
      { error: 'Failed to process volunteer application' },
      { status: 500 }
    );
  }
}
