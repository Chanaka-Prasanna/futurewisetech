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

  await transporter.sendMail({
    from: `"${name}" <${email}>`,
    to: process.env.CONTACT_EMAIL,
    subject: "New message from FutureWiseTech",
    html: `<p>${message}</p><p>— ${name} (${email})</p>`,
  });

  return NextResponse.json({ success: true });
}
