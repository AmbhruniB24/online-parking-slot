// [Experiment 8] Automated Official Email Notification Service (Gmail SMTP via Nodemailer)
const nodemailer = require('nodemailer');

/**
 * Formats a clean, executive-grade Plain Text notification in attractive, proper formal English
 */
const formatBookingEnglishText = (booking) => {
  const ticket = booking.ticketCode || booking._id || 'SP-PASS';
  const location = booking.locationName || 'SmartPark Central Parking Facility';
  const slot = booking.slotNumber || booking.slotId || 'Bay A-01';
  const floor = booking.floor ? `Floor ${booking.floor}` : 'Deck 1';
  const vehicle = booking.vehicleNumber || 'MH 01 AB 1234';
  const vehicleType = booking.vehicleType || '4-wheeler';
  const duration = booking.durationHours || 1;
  const amount = booking.totalAmount || 60;
  const paymentMethod = (booking.paymentMethod || 'UPI').toUpperCase();
  const txnId = booking.transactionId || `TXN-${Date.now().toString().slice(-6)}`;

  return [
    '==================================================',
    '🚗 SMARTPARK - PARKING RESERVATION CONFIRMED',
    '==================================================',
    'Dear Valued Motorist,',
    '',
    'Great news! Your parking reservation at SmartPark is officially confirmed.',
    'Your parking bay has been locked exclusively for your vehicle and is ready for arrival.',
    '',
    '📋 RESERVATION & PASS DETAILS:',
    `• Assigned Bay: Bay ${slot} (${floor})`,
    `• Parking Facility: ${location}`,
    `• Digital Pass ID: ${ticket}`,
    `• Vehicle Plate: ${vehicle} (${vehicleType})`,
    `• Booked Duration: ${duration} Hour(s)`,
    `• Total Amount Paid: ₹${amount}`,
    `• Payment Mode: ${paymentMethod}`,
    `• Transaction Reference: ${txnId}`,
    '• Status: GUARANTEED & ACTIVE',
    '',
    '🚦 EASY GATE ENTRY GUIDELINES:',
    `1. Drive to the entrance barrier at ${location}.`,
    '2. Show this Fast-Pass ticket code or scan your Digital QR barcode at the barrier optical reader.',
    '3. The boom barrier will automatically lift in under 1.2 seconds.',
    `4. Proceed directly to your assigned Bay ${slot}.`,
    '',
    'Need help? Our 24/7 Support Desk is available at support@smartpark.com or +91 98765 43210.',
    '',
    'Thank you for parking with SmartPark. We wish you a safe and pleasant journey!',
    '',
    'Warm regards,',
    'Customer Operations Team',
    'SmartPark Autonomous Parking Systems'
  ].join('\n');
};

/**
 * Formats a rich, modern, and attractive HTML email template in proper English
 */
const formatBookingEmailHtml = (booking) => {
  const ticket = booking.ticketCode || booking._id || 'SP-PASS';
  const location = booking.locationName || 'SmartPark Central Parking Facility';
  const slot = booking.slotNumber || booking.slotId || 'Bay A-01';
  const floor = booking.floor ? `Floor ${booking.floor}` : 'Deck 1';
  const vehicle = booking.vehicleNumber || 'MH 01 AB 1234';
  const duration = booking.durationHours || 1;
  const amount = booking.totalAmount || 60;
  const paymentMethod = (booking.paymentMethod || 'UPI').toUpperCase();
  const txnId = booking.transactionId || `TXN-${Date.now().toString().slice(-6)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(ticket)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartPark Parking Reservation Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080d1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #080d1a; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #0f172a; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 45px rgba(0,0,0,0.6); border: 1px solid #1e293b;">
          
          <!-- Modern Top Hero Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%); padding: 36px 28px; text-align: center; color: #ffffff;">
              <div style="display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); padding: 6px 16px; border-radius: 30px; font-size: 11px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.3);">
                🚗 SMARTPARK IOT FAST-PASS
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px;">Reservation Confirmed!</h1>
              <p style="margin: 0; font-size: 15px; font-weight: 500; opacity: 0.95;">
                Your parking bay is reserved and ready for your arrival.
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 28px 24px;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #e2e8f0;">
                Dear <strong>Valued Motorist</strong>,<br>
                Thank you for reserving with <strong>SmartPark</strong>. Your parking spot has been secured and your digital gate pass has been activated.
              </p>

              <!-- Highlight Bay Card with QR -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #131d33 0%, #1e293b 100%); border: 1px solid #334155; border-radius: 18px; margin-bottom: 24px; padding: 20px;">
                <tr>
                  <td width="65%" style="vertical-align: middle; padding-right: 12px;">
                    <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #38bdf8; letter-spacing: 1px;">● RESERVED PARKING BAY</span>
                    <div style="font-size: 34px; font-weight: 900; color: #ffffff; line-height: 1.1; margin: 4px 0;">
                      Bay ${slot}
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #94a3b8;">
                      ${floor} &bull; ${location}
                    </div>

                    <div style="margin-top: 14px;">
                      <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; display: block;">PASS VOUCHER CODE</span>
                      <span style="font-family: monospace; font-size: 14px; font-weight: 800; color: #38bdf8; background: #0b1120; padding: 5px 10px; border-radius: 8px; display: inline-block; margin-top: 3px; border: 1px solid #1e293b;">
                        ${ticket}
                      </span>
                    </div>
                  </td>
                  <td width="35%" align="center" style="vertical-align: middle;">
                    <img src="${qrUrl}" alt="Gate Pass QR" width="125" height="125" style="border-radius: 10px; border: 2px solid #38bdf8; background: #ffffff; padding: 4px; display: block;" />
                    <span style="display: block; font-size: 10px; color: #94a3b8; font-weight: 700; margin-top: 6px;">Scan at Gate</span>
                  </td>
                </tr>
              </table>

              <!-- Booking Specifications Table -->
              <h3 style="font-size: 14px; font-weight: 800; text-transform: uppercase; color: #38bdf8; letter-spacing: 0.5px; margin: 0 0 12px 0; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">
                Booking & Payment Summary
              </h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 13px; margin-bottom: 24px;">
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="color: #94a3b8; font-weight: 500;">Vehicle Registration</td>
                  <td align="right" style="font-weight: 800; color: #ffffff; font-family: monospace;">${vehicle}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="color: #94a3b8; font-weight: 500;">Reserved Duration</td>
                  <td align="right" style="font-weight: 700; color: #ffffff;">${duration} Hour(s)</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="color: #94a3b8; font-weight: 500;">Payment Mode</td>
                  <td align="right" style="font-weight: 700; color: #38bdf8;">${paymentMethod}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="color: #94a3b8; font-weight: 500;">Transaction ID</td>
                  <td align="right" style="font-family: monospace; font-size: 12px; color: #94a3b8;">${txnId}</td>
                </tr>
                <tr>
                  <td style="color: #ffffff; font-weight: 800; font-size: 15px;">Total Amount Paid</td>
                  <td align="right" style="color: #4ade80; font-weight: 900; font-size: 18px;">₹${amount}</td>
                </tr>
              </table>

              <!-- Step by Step Gate Entry Instructions -->
              <div style="background-color: #131d33; border-left: 4px solid #38bdf8; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
                <div style="font-weight: 800; font-size: 13px; color: #38bdf8; margin-bottom: 6px;">
                  🚦 Seamless Gate Entry Guidelines
                </div>
                <div style="font-size: 12px; color: #cbd5e1; line-height: 1.6;">
                  1. Drive up to the entry gate barrier at <strong>${location}</strong>.<br>
                  2. Scan the <strong>Digital QR Pass</strong> above or present your voucher code at the scanner.<br>
                  3. The automated barrier arm will lift for effortless access.<br>
                  4. Park comfortably within your reserved bay: <strong>Slot ${slot}</strong>.
                </div>
              </div>

              <!-- Assistance Footer Note -->
              <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0; text-align: center;">
                Need assistance? Our 24/7 Operations Desk is available at <a href="mailto:support@smartpark.com" style="color: #38bdf8; text-decoration: none;">support@smartpark.com</a>.<br>
                Safe travels and thank you for choosing SmartPark!
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0f1d; border-top: 1px solid #1e293b; padding: 18px 24px; text-align: center; font-size: 11px; color: #64748b;">
              &copy; 2026 SmartPark Autonomous Systems &bull; High-Tech Urban Mobility &bull; VESIT Practicum
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
    SMTP_USER = process.env.SMTP_USER || 'ambhrunibhakte1@gmail.com',
    SMTP_PASS = process.env.SMTP_PASS || 'vkhuxbonktdlzdgp',
    MAIL_FROM = process.env.MAIL_FROM || 'ambhrunibhakte1@gmail.com'
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
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 15000
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
