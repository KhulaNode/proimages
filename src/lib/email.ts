// Email service using Plunk
// Docs: https://docs.useplunk.com
import Plunk from '@plunk/node';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  // Initialize Plunk client
  const plunk = new Plunk(process.env.PLUNK_API_KEY || '');
  
  try {
    await plunk.emails.send({
      to,
      subject,
      body: html,
      from: process.env.EMAIL_FROM || 'noreply@proimages.co.za',
    });
    
    console.log('✅ Email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
}

export function generateBookingConfirmationEmail(booking: {
  bookingNumber: string;
  clientName: string;
  serviceName: string;
  bookingDate: string;
  startTime: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FF6B35; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ProImages Creative House</h1>
          </div>
          <div class="content">
            <h2>Booking Confirmation</h2>
            <p>Hi ${booking.clientName},</p>
            <p>Thank you for booking with ProImages Creative House! Your booking has been received.</p>
            <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
            <p><strong>Service:</strong> ${booking.serviceName}</p>
            <p><strong>Date:</strong> ${booking.bookingDate}</p>
            <p><strong>Time:</strong> ${booking.startTime}</p>
            <p><strong>Status:</strong> Pending Confirmation</p>
            <p>We will review your booking and send you a confirmation within 24 hours.</p>
          </div>
          <div class="footer">
            <p>ProImages Creative House | molavovic@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateAdminNotificationEmail(booking: {
  bookingNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  bookingDate: string;
  startTime: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Booking Received</h2>
          <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
          <p><strong>Client:</strong> ${booking.clientName}</p>
          <p><strong>Email:</strong> ${booking.clientEmail}</p>
          <p><strong>Phone:</strong> ${booking.clientPhone}</p>
          <p><strong>Service:</strong> ${booking.serviceName}</p>
          <p><strong>Date:</strong> ${booking.bookingDate}</p>
          <p><strong>Time:</strong> ${booking.startTime}</p>
          <p>Log in to the admin dashboard to confirm or manage this booking.</p>
        </div>
      </body>
    </html>
  `;
}
