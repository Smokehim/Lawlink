import db from '../database/database.js';

export default function AppointmentRoutes(app) {

    // ── GET: Lawyer fetches their appointments ──
    app.get('/appointments/lawyer/:lawyer_id', (req, res) => {
        const { lawyer_id } = req.params;
        const sql = `
            SELECT a.*, u.full_name AS user_name, u.email AS user_email, u.phone_number AS user_phone
            FROM appointments a
            JOIN users u ON a.user_id = u.user_id
            WHERE a.lawyer_id = ?
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `;
        db.query(sql, [lawyer_id], (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            res.status(200).json(results);
        });
    });

    // ── GET: User fetches their own appointments ──
    app.get('/appointments/user/:user_id', (req, res) => {
        const { user_id } = req.params;
        const sql = `
            SELECT a.*, l.full_name AS lawyer_name, l.email AS lawyer_email,
                   l.specialization, l.phone_number AS lawyer_phone
            FROM appointments a
            JOIN lawyers l ON a.lawyer_id = l.lawyer_id
            WHERE a.user_id = ?
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `;
        db.query(sql, [user_id], (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            res.status(200).json(results);
        });
    });

    // ── POST: User books an appointment ──
    app.post('/appointments', (req, res) => {
        const { user_id, lawyer_id, appointment_date, appointment_time, reason } = req.body;

        if (!user_id || !lawyer_id || !appointment_date || !appointment_time) {
            return res.status(400).json({ message: 'user_id, lawyer_id, appointment_date, and appointment_time are required' });
        }

        // Check if lawyer has appointments enabled
        const checkSql = 'SELECT appointments_enabled FROM lawyers WHERE lawyer_id = ?';
        db.query(checkSql, [lawyer_id], (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Lawyer not found' });

            const lawyer = results[0];
            if (lawyer.appointments_enabled === 0) {
                return res.status(403).json({ message: 'This lawyer is not accepting appointments at this time' });
            }

            const insertSql = `
                INSERT INTO appointments (user_id, lawyer_id, appointment_date, appointment_time, reason, status)
                VALUES (?, ?, ?, ?, ?, 'pending')
            `;
            db.query(insertSql, [user_id, lawyer_id, appointment_date, appointment_time, reason || null], (insertErr, result) => {
                if (insertErr) return res.status(500).json({ message: 'Database error', error: insertErr.message });
                res.status(201).json({ message: 'Appointment booked successfully', id: result.insertId });
            });
        });
    });

    // ── PUT: Lawyer updates appointment status (accept/decline) ──
    app.put('/appointments/:id/status', (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        if (!['accepted', 'declined'].includes(status)) {
            return res.status(400).json({ message: "Status must be 'accepted' or 'declined'" });
        }

        const sql = 'UPDATE appointments SET status = ? WHERE id = ?';
        db.query(sql, [status, id], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Appointment not found' });
            res.status(200).json({ message: `Appointment ${status}` });
        });
    });

    // ── DELETE: User cancels a pending appointment ──
    app.delete('/appointments/:id', (req, res) => {
        const { id } = req.params;
        const { user_id } = req.body;

        const sql = "DELETE FROM appointments WHERE id = ? AND user_id = ? AND status = 'pending'";
        db.query(sql, [id, user_id], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Appointment not found or cannot be cancelled' });
            res.status(200).json({ message: 'Appointment cancelled' });
        });
    });

    // ── PUT: Lawyer toggles appointments on/off ──
    app.put('/appointments/toggle/:lawyer_id', (req, res) => {
        const { lawyer_id } = req.params;
        const { appointments_enabled } = req.body;

        if (appointments_enabled === undefined) {
            return res.status(400).json({ message: 'appointments_enabled (boolean) is required' });
        }

        const sql = 'UPDATE lawyers SET appointments_enabled = ? WHERE lawyer_id = ?';
        db.query(sql, [appointments_enabled ? 1 : 0, lawyer_id], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Lawyer not found' });
            res.status(200).json({ message: `Appointments ${appointments_enabled ? 'enabled' : 'disabled'}` });
        });
    });

    // ── GET: Check if a lawyer has appointments enabled ──
    app.get('/lawyers/appointments-status/:lawyer_id', (req, res) => {
        const { lawyer_id } = req.params;
        const sql = 'SELECT appointments_enabled FROM lawyers WHERE lawyer_id = ?';
        db.query(sql, [lawyer_id], (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (results.length === 0) return res.status(404).json({ message: 'Lawyer not found' });
            res.status(200).json({ appointments_enabled: results[0].appointments_enabled === 1 });
        });
    });
}
