import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT!,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Create a modern HTML email template with the website's primary color (hsl(330, 80%, 60%))
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #333333;
          line-height: 1.6;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          background-color: #e83e8c; /* Primary pink color */
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        
        .content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .message-box {
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 6px;
          margin-top: 20px;
          margin-bottom: 20px;
          border-left: 4px solid #e83e8c;
        }
        
        .sender-info {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid #eeeeee;
          font-size: 14px;
        }
        
        .label {
          color: #e83e8c;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .footer {
          text-align: center;
          padding-top: 20px;
          font-size: 12px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>FutureWiseTech</h1>
        </div>
        <div class="content">
          <p>You've received a new message from your website contact form.</p>
          
          <p class="label">Message:</p>
          <div class="message-box">
            ${message.replace(/\n/g, "<br>")}
          </div>
          
          <div class="sender-info">
            <p><span class="label">From:</span> ${name}</p>
            <p><span class="label">Email:</span> ${email}</p>
            <p><span class="label">Sent on:</span> ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} FutureWiseTech. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  // Send the email with the HTML template
  await transporter.sendMail({
    from: process.env.SMTP_USER, // Use your configured email as the sender
    to: process.env.CONTACT_EMAIL, // Where you want to receive the emails
    replyTo: email, // Allow replying directly to the sender
    subject: "New Contact Form Submission - FutureWiseTech",
    html: htmlTemplate,
    text: `Message from ${name} (${email}):\n\n${message}`, // Plain text alternative
  });

  return NextResponse.json({ success: true });
}
