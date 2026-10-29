// [Experiment 8] Automated Official Email Notification Service (Gmail SMTP via Nodemailer)
const nodemailer = require('nodemailer');

/**
 * Formats a clean, executive-grade Plain Text notification in proper formal English
 */
const formatBookingEnglishText = (booking) => {
  const ticket = booking.ticketCode || booking._id || 'SP-PASS';
  const location = booking.locationName || 'SmartPark Central Parking Facility';
  const slot = booking.slotNumber || booking.slotId || 'Bay 01';
  const floor = booking.floor ? `Floor ${booking.floor}` : 'Ground Floor';
  const vehicle = booking.vehicleNumber || 'N/A';
  const vehicleType = booking.vehicleType || '4-wheeler';
  const duration = booking.durationHours || 1;
  const amount = booking.totalAmount || 0;
  const paymentMethod = (booking.paymentMethod || 'UPI').toUpperCase();
  const txnId = booking.transactionId || `TXN-${Date.now().toString().slice(-6)}`;

  return [
    'SMARTPARK - PARKING RESERVATION CONFIRMED',
    '--------------------------------------------------',
    'Dear Valued Customer,',
    '',
    'Thank you for using SmartPark. Your parking slot reservation has been successfully processed and confirmed.',
    '',
    'RESERVATION SUMMARY:',
    `• Ticket Pass ID: ${ticket}`,
    `• Parking Facility: ${location}`,
    `• Assigned Bay: Slot ${slot} (${floor})`,
    `• Vehicle Number: ${vehicle} (${vehicleType})`,
    `• Reserved Duration: ${duration} Hour(s)`,
    `• Total Amount Paid: ₹${amount}`,
    `• Payment Mode: ${paymentMethod}`,
    `• Transaction Reference: ${txnId}`,
    '• Reservation Status: CONFIRMED & ACTIVE',
    '',
    'ENTRY & PARKING GUIDELINES:',
    `1. Please drive to the entrance barrier at ${location}.`,
    '2. Display this Ticket ID or scan your Digital QR Pass at the boom barrier scanner.',
    `3. Park exclusively within your reserved bay: Slot ${slot}.`,
    '',
    'For any queries or modifications, please reach out to our 24/7 Help Desk at support@smartpark.com or call +91 98765 43210.',
    '',
    'We wish you a pleasant and safe journey!',
    '',
    'Warm regards,',
    'Customer Operations Team',
    'SmartPark Parking Solutions'
  ].join('\n');
};

/**
 * Formats a rich, professional HTML email template
 */
const formatBookingEmailHtml = (booking) => {
  const ticket = booking.ticketCode || booking._id || 'SP-PASS';
  const location = booking.locationName || 'SmartPark Central Parking Facility';
  const slot = booking.slotNumber || booking.slotId || 'Bay 01';
  const floor = booking.floor ? `Floor ${booking.floor}` : 'Ground Floor';
  const vehicle = booking.vehicleNumber || 'N/A';
  const duration = booking.durationHours || 1;
  const amount = booking.totalAmount || 0;
  const paymentMethod = (booking.paymentMethod || 'UPI').toUpperCase();
  const txnId = booking.transactionId || `TXN-${Date.now().toString().slice(-6)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(ticket)}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SmartPark Parking Reservation Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #111827; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.5); border: 1px solid #1f2937;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #4f46e5 100%); padding: 36px 30px; text-align: center; color: #ffffff;">
              <div style="display: inline-block; background: rgba(255,255,255,0.18); padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.25);">
                🚗 SMARTPARK IOT FAST-PASS
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px;">Reservation Confirmed</h1>
              <p style="margin: 0; font-size: 15px; opacity: 0.95;">Your parking bay has been locked & gate pass activated.</p>
            </td>
          </tr>

          <!-- Pass Details Box -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #1f2937; border: 1px solid #374151; border-radius: 16px; margin-bottom: 24px; padding: 20px;">
                <tr>
                  <td width="65%" style="vertical-align: top; padding-right: 15px;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #10b981; letter-spacing: 1px;">● ASSIGNED BAY</div>
                    <div style="font-size: 36px; font-weight: 900; color: #60a5fa; line-height: 1.1; margin: 4px 0;">${slot}</div>
                    <div style="font-size: 14px; font-weight: 600; color: #9ca3af;">${floor} • ${location}</div>

                    <div style="margin-top: 18px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px;">DIGITAL PASS ID</div>
                      <div style="font-family: monospace; font-size: 15px; font-weight: 800; color: #38bdf8; background: #0f172a; padding: 6px 12px; border-radius: 8px; display: inline-block; margin-top: 4px; border: 1px solid #334155;">
                        ${ticket}
                      </div>
                    </div>
                  </td>
                  <td width="35%" align="center" style="vertical-align: middle;">
                    <img src="${qrUrl}" alt="Digital Pass QR" width="130" height="130" style="border-radius: 12px; border: 2px solid #38bdf8; background: #ffffff; padding: 5px; display: block;" />
                    <span style="display: block; font-size: 10px; color: #94a3b8; font-weight: 700; margin-top: 6px;">Scan at Boom Barrier</span>
                  </td>
                </tr>
              </table>

              <!-- Specification Table -->
              <h3 style="font-size: 15px; font-weight: 800; color: #f8fafc; margin: 0 0 14px 0; border-bottom: 1px solid #374151; padding-bottom: 8px;">
                Reservation Specifications
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 14px; margin-bottom: 24px;">
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #9ca3af; font-weight: 500;">Vehicle Registration</td>
                  <td align="right" style="font-weight: 800; color: #ffffff; font-family: monospace;">${vehicle}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #9ca3af; font-weight: 500;">Duration of Stay</td>
                  <td align="right" style="font-weight: 700; color: #ffffff;">${duration} Hour(s)</td>
                </tr>
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #9ca3af; font-weight: 500;">Payment Channel</td>
                  <td align="right" style="font-weight: 700; color: #38bdf8;">${paymentMethod}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #9ca3af; font-weight: 500;">Transaction ID</td>
                  <td align="right" style="font-family: monospace; font-size: 12px; color: #9ca3af;">${txnId}</td>
                </tr>
                <tr>
                  <td style="color: #ffffff; font-weight: 800; font-size: 16px;">Total Amount Paid</td>
                  <td align="right" style="color: #4ade80; font-weight: 900; font-size: 20px;">₹${amount}</td>
                </tr>
              </table>

              <!-- Entry Instructions Banner -->
              <div style="background-color: #1e293b; border-left: 4px solid #3b82f6; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px;">
                <div style="font-weight: 800; font-size: 13px; color: #60a5fa; margin-bottom: 4px;">Gate Entry Guidelines</div>
                <div style="font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                  Pull up to the entry gate barrier at <strong>${location}</strong>. Scan this QR code or show the ticket code to the gate reader for automatic barrier arm lifting.
                </div>
              </div>

              <!-- Support -->
              <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0; text-align: center;">
                Need help? Contact SmartPark Support at <a href="mailto:support@smartpark.com" style="color: #60a5fa; text-decoration: none;">support@smartpark.com</a> or call <strong>+91 98765 43210</strong>.<br>
                Thank you for choosing SmartPark!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; border-top: 1px solid #1f2937; padding: 16px 30px; text-align: center; font-size: 11px; color: #64748b;">
              © 2026 SmartPark Solutions • Autonomous IoT Parking System • VESIT Lab Practicum
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/**
 * Sends booking confirmation email via Nodemailer Gmail SMTP
 */
async function sendEmail(email, booking) {
  if (!email) {
    return { sent: false, error: 'Recipient email is missing.' };
  }

  const {
    SMTP_HOST = 'smtp.gmail.com',
    SMTP_PORT = 587,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn('[Notification] Email skipped: SMTP_USER or SMTP_PASS not set.');
    return {
      sent: false,
      error: 'SMTP credentials are not configured in backend/.env'
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const subject = `Parking Pass Confirmed: Bay ${booking.slotNumber || 'Reserved'} (${booking.ticketCode || 'SP-PASS'})`;
    const textContent = formatBookingEnglishText(booking);
    const htmlContent = formatBookingEmailHtml(booking);

    const result = await transporter.sendMail({
      from: `"SmartPark Reservations" <${MAIL_FROM || SMTP_USER}>`,
      to: email,
      subject,
      text: textContent,
      html: htmlContent
    });

    console.log(`[Notification] ✅ Email successfully sent to ${email} (MessageId: ${result.messageId})`);

    return {
      sent: true,
      messageId: result.messageId,
      recipient: email
    };
  } catch (err) {
    console.error('[Notification] Email error:', err.message);
    return {
      sent: false,
      error: err.message
    };
  }
}

/**
 * Orchestrates notifications for Experiment 8 (Direct Email Notification)
 */
async function sendBookingNotifications({ booking, email }) {
  const targetEmail = email || booking.email;
  console.log(`[Experiment 8] Processing booking email notification for Ticket: ${booking.ticketCode} to: ${targetEmail}`);

  let emailResult = { sent: false, error: 'Recipient email missing' };
  if (targetEmail) {
    emailResult = await sendEmail(targetEmail, booking);
  }

  return {
    email: emailResult
  };
}

module.exports = {
  formatBookingEnglishText,
  formatBookingEmailHtml,
  sendEmail,
  sendBookingNotifications
};
