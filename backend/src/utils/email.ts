import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '../config/env';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

// simple HTML email for ticket
export const sendTicketEmail = async (to: string, subject: string, html: string) => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('EMAIL_USER or EMAIL_PASS not configured; skipping email send.');
    return null;
  }
  const info = await transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    html
  });
  return info;
};
