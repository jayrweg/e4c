import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      areaOfInterest,
      message
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !areaOfInterest || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'E4C Volunteer Applications <onboarding@resend.dev>',
      to: 'rwegasirajackson11@gmail.com',
      replyTo: email,
      subject: `New Volunteer Application: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Volunteer Application</h2>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Personal Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Volunteer Interest</h3>
            <p><strong>Area of Interest:</strong> ${areaOfInterest}</p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px; margin: 10px 0;">
              ${message}
            </p>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Next Steps</h3>
            <p style="color: #92400e; margin: 0;">
              Please contact the volunteer within 48 hours to schedule an interview and discuss next steps.
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This volunteer application was submitted from the EMPOWERED FOR CHANGE (E4C) website.
            </p>
          </div>
        </div>
      `,
      text: `New Volunteer Application

Personal Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Volunteer Interest:
- Area of Interest: ${areaOfInterest}

Message:
${message}

Next Steps:
Please contact the volunteer within 48 hours to schedule an interview and discuss next steps.

---
This volunteer application was submitted from the EMPOWERED FOR CHANGE (E4C) website.`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to process volunteer application' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Volunteer application received successfully', id: data?.id },
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
