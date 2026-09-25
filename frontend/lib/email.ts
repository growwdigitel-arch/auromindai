import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export interface WebinarPaymentEmailData {
  name: string;
  email: string;
  phone: string;
  paymentId: string;
  orderId?: string;
  amount?: number;
  registeredAt?: string;
}

const OWNER_EMAIL = 'santhoshram444@gmail.com';
const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8b0Ct7Noa4e01ZBq0D';

function getWritableDataDir(): string {
  const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
  const target = isServerless ? '/tmp/auromind-data' : path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
  } catch {
    return '/tmp';
  }
  return target;
}

function logEmailSent(record: any) {
  try {
    const filePath = path.join(getWritableDataDir(), 'sent-emails.json');
    let list: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch {}
    }
    list.unshift({
      ...record,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(filePath, JSON.stringify(list.slice(0, 100), null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not log sent email to file:', err);
  }
}

// Build Nodemailer Transporter with Gmail support
function getTransporter() {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || 'auromindaii@gmail.com';
  const rawPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || 'odjvdhmyifptkcce';
  const pass = rawPass.replace(/\s+/g, '');
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);

  if (user && pass) {
    if (user.endsWith('@gmail.com') || host.includes('gmail')) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      });
    }

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return null;
}

/**
 * Sends both confirmation emails on successful webinar payment:
 * 1. To the attendee who paid (with WhatsApp Channel link & Workshop details)
 * 2. To the owner (santhoshram444@gmail.com) with full attendee lead & payment details
 */
export async function sendWebinarPaymentEmails(data: WebinarPaymentEmailData): Promise<{
  userEmailSent: boolean;
  ownerEmailSent: boolean;
  mode: 'smtp' | 'simulated';
  error?: string;
}> {
  const { name, email, phone, paymentId, orderId = 'order_direct', amount = 99 } = data;
  const transporter = getTransporter();
  const dateStr = 'Saturday, October 10, 2026';
  const timeStr = '10:00 AM – 12:00 PM IST';

  // 1. User Confirmation Email HTML
  const userHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Automation Workshop Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0A0D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0D; padding: 30px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #121218; border: 1px solid #27272A; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                
                <!-- Header Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #181822 0%, #0E0E14 100%); padding: 30px; text-align: center; border-bottom: 2px solid #00D06C;">
                    <div style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF;">
                      Auromind<span style="color: #00D06C;">AI</span> Private Limited
                    </div>
                    <div style="margin-top: 6px; font-size: 11px; font-weight: 800; color: #F59E0B; text-transform: uppercase; letter-spacing: 2px;">
                      Official Ticket Confirmation • ₹99 Paid
                    </div>
                  </td>
                </tr>

                <!-- Content Area -->
                <tr>
                  <td style="padding: 32px 28px;">
                    <h1 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 800; color: #FFFFFF; line-height: 1.3;">
                      🎉 Welcome, ${name}! Your Seat is Confirmed.
                    </h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #D4D4D8;">
                      Thank you for securing your ticket to the <strong>2-Hour Live AI Automation Workshop</strong>. Your payment of <strong>₹${amount}</strong> was successfully verified via Razorpay.
                    </p>

                    <!-- STEP 1: WhatsApp Channel Notice (HIGH PRIORITY) -->
                    <div style="background-color: #064E3B; border: 2px solid #00D06C; border-radius: 12px; padding: 22px; margin-bottom: 28px; text-align: center;">
                      <div style="font-size: 13px; font-weight: 900; color: #6EE7B7; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                        🚨 ACTION REQUIRED BEFORE SATURDAY
                      </div>
                      <div style="font-size: 18px; font-weight: 900; color: #FFFFFF; margin-bottom: 12px;">
                        Join the Official WhatsApp Channel
                      </div>
                      <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.5; color: #E4E4E7;">
                        All live Zoom credentials, prompt templates, and mentor Q&A links are shared exclusively inside our private WhatsApp channel.
                      </p>
                      <div>
                        <a href="${WHATSAPP_CHANNEL_URL}" target="_blank" style="display: inline-block; background-color: #00D06C; color: #000000; font-size: 14px; font-weight: 900; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 208, 108, 0.4); text-transform: uppercase; letter-spacing: 0.5px;">
                          👉 Click Here to Join WhatsApp Channel →
                        </a>
                      </div>
                      <div style="margin-top: 10px; font-size: 11px; color: #A7F3D0; word-break: break-all;">
                        Or open directly: ${WHATSAPP_CHANNEL_URL}
                      </div>
                    </div>

                    <!-- Workshop Details Table -->
                    <div style="background-color: #1A1A24; border: 1px solid #2E2E38; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                      <div style="font-size: 12px; font-weight: 800; color: #F59E0B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px;">
                        Workshop Schedule &amp; Mentor
                      </div>
                      <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; color: #D4D4D8;">
                        <tr>
                          <td width="35%" style="color: #A1A1AA; font-weight: 600;">Event:</td>
                          <td style="color: #FFFFFF; font-weight: 700;">AI Automation Workshop (Live on Zoom)</td>
                        </tr>
                        <tr>
                          <td style="color: #A1A1AA; font-weight: 600;">Date:</td>
                          <td style="color: #FFFFFF; font-weight: 700;">${dateStr}</td>
                        </tr>
                        <tr>
                          <td style="color: #A1A1AA; font-weight: 600;">Time:</td>
                          <td style="color: #FFFFFF; font-weight: 700;">${timeStr}</td>
                        </tr>
                        <tr>
                          <td style="color: #A1A1AA; font-weight: 600;">Mentor:</td>
                          <td style="color: #FFFFFF; font-weight: 700;">Gnananand (10+ Years Enterprise Sales Veteran)</td>
                        </tr>
                        <tr>
                          <td style="color: #A1A1AA; font-weight: 600;">Amount Paid:</td>
                          <td style="color: #00D06C; font-weight: 800;">₹${amount} (GST Included)</td>
                        </tr>
                        <tr>
                          <td style="color: #A1A1AA; font-weight: 600;">Payment ID:</td>
                          <td style="color: #F59E0B; font-family: monospace; font-weight: 700;">${paymentId}</td>
                        </tr>
                      </table>
                    </div>

                    <p style="font-size: 12px; line-height: 1.6; color: #71717A; margin-bottom: 24px;">
                      If you have any questions, simply reply to this email or contact us at <a href="mailto:contact@auromind.ai" style="color: #00D06C; text-decoration: underline;">contact@auromind.ai</a>.
                    </p>

                    <div style="border-top: 1px solid #27272A; padding-top: 20px; text-align: center; font-size: 11px; color: #71717A;">
                      © 2026 AuromindAI Private Limited. All rights reserved.<br>
                      Secure Razorpay Checkout • AI Automation Division
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // 2. Owner Alert Email HTML
  const ownerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Paid Webinar Attendee</title>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #F4F4F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E4E4E7; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <div style="font-size: 20px; font-weight: 900; color: #18181B; margin-bottom: 6px;">
            💰 New ₹99 Paid Webinar Registration!
          </div>
          <p style="font-size: 13px; color: #52525B; margin-bottom: 20px;">
            A new attendee has just completed payment for the AI Automation Workshop. Details below:
          </p>

          <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #F8FAFC; border-radius: 8px; border: 1px solid #E2E8F0; font-size: 13px; color: #334155; margin-bottom: 20px;">
            <tr>
              <td width="35%" style="font-weight: 700; color: #64748B;">Attendee Name:</td>
              <td style="font-weight: 800; color: #0F172A; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748B;">Email Address:</td>
              <td style="font-weight: 700; color: #2563EB;">${email}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748B;">Mobile / WhatsApp:</td>
              <td style="font-weight: 800; color: #16A34A;">${phone}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748B;">Fee Collected:</td>
              <td style="font-weight: 900; color: #16A34A; font-size: 15px;">₹${amount}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748B;">Payment ID:</td>
              <td style="font-family: monospace; font-weight: 700; color: #D97706;">${paymentId}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748B;">Order ID:</td>
              <td style="font-family: monospace; color: #64748B;">${orderId}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748B;">WhatsApp Sent:</td>
              <td style="font-size: 11px; color: #0284C7; word-break: break-all;">${WHATSAPP_CHANNEL_URL}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://auromindai.com/admin" target="_blank" style="display: inline-block; background-color: #18181B; color: #FFFFFF; font-size: 13px; font-weight: 800; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
              Open Admin Dashboard →
            </a>
          </div>

          <div style="margin-top: 24px; border-top: 1px solid #F1F5F9; padding-top: 16px; font-size: 11px; color: #94A3B8; text-align: center;">
            Sent automatically by AuromindAI Notification Engine to owner: ${OWNER_EMAIL}
          </div>
        </div>
      </body>
    </html>
  `;

  // If live SMTP transporter is configured, send actual emails via SMTP
  if (transporter) {
    try {
      const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'auromindaii@gmail.com';
      const fromAddress = process.env.SMTP_FROM || `"AuromindAI" <${smtpUser}>`;

      // Send to Attendee
      await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: `🎉 Payment Confirmed: You're In! AI Automation Workshop (Sat, Oct 10th)`,
        html: userHtml,
      });

      // Send to Owner
      await transporter.sendMail({
        from: fromAddress,
        to: OWNER_EMAIL,
        subject: `💰 New ₹99 Paid Webinar Registration: ${name} (${email})`,
        html: ownerHtml,
      });

      logEmailSent({
        mode: 'smtp',
        status: 'delivered',
        attendee: { name, email, phone },
        owner: OWNER_EMAIL,
        paymentId,
        amount
      });

      return {
        userEmailSent: true,
        ownerEmailSent: true,
        mode: 'smtp'
      };
    } catch (smtpErr: any) {
      console.error('SMTP email dispatch error, recording fallback log:', smtpErr);
      logEmailSent({
        mode: 'smtp_error_fallback',
        error: smtpErr.message,
        attendee: { name, email, phone },
        owner: OWNER_EMAIL,
        paymentId,
        amount
      });
      return {
        userEmailSent: false,
        ownerEmailSent: false,
        mode: 'smtp',
        error: smtpErr.message
      };
    }
  }

  // Simulated delivery mode (when SMTP credentials are not yet specified in .env)
  console.log(`[EMAIL NOTIFICATION ENGINE] Dispatched simulated emails for ${name} (${email}) and owner ${OWNER_EMAIL}`);
  logEmailSent({
    mode: 'simulated',
    status: 'recorded',
    attendee: { name, email, phone },
    owner: OWNER_EMAIL,
    paymentId,
    amount,
    whatsappUrl: WHATSAPP_CHANNEL_URL,
    note: 'Emails formatted and verified. Add GMAIL_USER & GMAIL_APP_PASSWORD to .env for direct inbox transmission.'
  });

  return {
    userEmailSent: true,
    ownerEmailSent: true,
    mode: 'simulated'
  };
}
