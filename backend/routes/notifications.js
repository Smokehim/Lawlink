import express from 'express';
import db from '../database/database.js';
import { sendEmail } from '../utils/emailService.js';

export default function NotificationsRoute(app) {
    // GET notifications for a specific user
    app.get('/notifications/:role/:id', (req, res) => {
        const { role, id } = req.params;
        
        // role validation
        if (!['client', 'lawyer', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const sql = `
            SELECT * FROM notifications 
            WHERE recipient_id = ? AND recipient_role = ? 
            ORDER BY created_at DESC 
            LIMIT 50
        `;
        
        db.query(sql, [id, role], (err, results) => {
            if (err) {
                console.error('Error fetching notifications:', err);
                return res.status(500).json({ error: 'Failed to fetch notifications' });
            }
            res.json(results);
        });
    });

    // PUT mark notification as read
    app.put('/notifications/:id/read', (req, res) => {
        const { id } = req.params;

        const sql = `UPDATE notifications SET is_read = TRUE WHERE notification_id = ?`;
        
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error('Error marking notification read:', err);
                return res.status(500).json({ error: 'Failed to mark notification as read' });
            }
            res.json({ success: true });
        });
    });

    // POST to create a newly integrated notification (and email logically)
    app.post('/notifications', (req, res) => {
        const { recipient_id, recipient_role, type, message, emailHtml, emailSubject, emailRecipient } = req.body;

        const sql = `
            INSERT INTO notifications (recipient_id, recipient_role, type, message)
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [recipient_id, recipient_role, type, message], (err, result) => {
            if (err) {
                console.error('Error creating notification:', err);
                return res.status(500).json({ error: 'Failed to create notification' });
            }

            // Fire & Forget email dispatch if email recipient is provided
            if (emailRecipient) {
                sendEmail(emailRecipient, emailSubject || 'New Notification from LawLink', emailHtml || message);
            }

            res.status(201).json({ success: true, notification_id: result.insertId });
        });
    });
}
