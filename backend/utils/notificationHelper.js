import db from '../database/database.js';
import { sendEmail } from './emailService.js';

/**
 * Creates a notification in the database and optionally sends an email
 */
export const createNotification = (recipient_id, recipient_role, type, message, emailRecipient = null, emailSubject = null, emailHtml = null) => {
    const sql = `
        INSERT INTO notifications (recipient_id, recipient_role, type, message)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [recipient_id, recipient_role, type, message], (err) => {
        if (err) {
            console.error('Error creating notification:', err);
        } else if (emailRecipient) {
            sendEmail(emailRecipient, emailSubject || 'New Notification', emailHtml || message);
        }
    });
};
