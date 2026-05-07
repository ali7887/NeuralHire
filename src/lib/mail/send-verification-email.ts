import nodemailer from "nodemailer";

export async function sendVerificationEmail({
  to,
  token,
}: {
  to: string;
  token: string;
}) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    to,
    from: process.env.SMTP_FROM,
    subject: "Verify your email",
    html: `
      <p>Please verify your email address.</p>
      <p><a href="${verifyUrl}">Verify Email</a></p>
      <p>If you didn’t request this, you can ignore this email.</p>
    `,
  });
}
