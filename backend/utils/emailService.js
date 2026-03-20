import nodemailer from 'nodemailer';

// Reuse existing transporter pattern found into other routes.
// We fall back to standard local credentials or dummy ones
// User can replace with SendGrid / actual credentials
const transport = nodemailer.createTransport({
    service: 'gmail', // Standard fallback assuming they use gmail as in other files
    auth: {
        user: 'process.env.EMAIL_USER', // Usually populated by env vars
        pass: 'process.env.EMAIL_PASS'
    }
});

/**
 * Sends an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body text
 */
export const sendEmail = async (to, subject, text) => {
    try {
        if(!to) return;
        const info = await transport.sendMail({
            from: 'noreply@lawlink.com',
            to,
            subject,
            text
        });
        console.log(`Email sent to ${to}: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error.message);
        // Do not throw so it doesn't break the main flow
    }
};
