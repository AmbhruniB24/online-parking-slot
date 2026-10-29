const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP_USER and SMTP_PASS are required.');
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  return transporter;
};

const sendBookingEmail = async ({
  to,
  ticketCode,
  slotNumber,
  floor,
  vehicleNumber,
  durationHours,
  totalAmount,
  locationName
}) => {
  try {
    if (!to) {
      return { success: false, error: 'Recipient email is missing.' };
    }

    const mailer = getTransporter();

    const info = await mailer.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject: 'SmartPark Booking Confirmation',
      text: [
        'Your SmartPark booking is confirmed.',
        `Ticket: ${ticketCode}`,
        `Location: ${locationName || 'SmartPark'}`,
        `Slot: ${slotNumber || slotNumber === 0 ? slotNumber : 'N/A'}`,
        `Floor: ${floor || 'N/A'}`,
        `Vehicle: ${vehicleNumber}`,
        `Duration: ${durationHours} hour(s)`,
        `Amount: ${totalAmount}`
      ].join('\n'),
      html: `
        <h2>SmartPark Booking Confirmed</h2>
        <p>Your parking booking has been confirmed.</p>
        <p><strong>Ticket:</strong> ${ticketCode}</p>
        <p><strong>Location:</strong> ${locationName || 'SmartPark'}</p>
        <p><strong>Slot:</strong> ${slotNumber ?? 'N/A'}</p>
        <p><strong>Floor:</strong> ${floor || 'N/A'}</p>
        <p><strong>Vehicle:</strong> ${vehicleNumber}</p>
        <p><strong>Duration:</strong> ${durationHours} hour(s)</p>
        <p><strong>Amount:</strong> ${totalAmount}</p>
      `
    });

    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Booking email failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = { sendBookingEmail };