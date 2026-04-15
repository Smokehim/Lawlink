import db from '../database/database.js';

export default function Reviews(app) {
    // 1. Create a review (Client)
    app.post('/api/reviews', (req, res) => {
        const { client_id, lawyer_id, rating, review_text } = req.body;
        if (!client_id || !lawyer_id || !rating || !review_text) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const sql = `INSERT INTO reviews (client_id, lawyer_id, rating, review_text) VALUES (?, ?, ?, ?)`;
        db.query(sql, [client_id, lawyer_id, rating, review_text], (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err.message });
            res.status(201).json({ message: "Review added successfully", review_id: result.insertId });
        });
    });

    // 2. Get all reviews for a lawyer
    app.get('/api/reviews/lawyer/:lawyer_id', (req, res) => {
        const { lawyer_id } = req.params;
        const sql = `
            SELECT r.*, u.full_name as client_name, u.profile_picture as client_picture 
            FROM reviews r 
            JOIN users u ON r.client_id = u.user_id 
            WHERE r.lawyer_id = ?
            ORDER BY r.created_at DESC
        `;
        db.query(sql, [lawyer_id], (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err.message });
            res.status(200).json(results);
        });
    });

    // 3. Get all reviews (Admin)
    app.get('/api/reviews', (req, res) => {
        const sql = `
            SELECT r.*, u.full_name as client_name, l.full_name as lawyer_name
            FROM reviews r
            JOIN users u ON r.client_id = u.user_id
            JOIN lawyers l ON r.lawyer_id = l.lawyer_id
            ORDER BY r.created_at DESC
        `;
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err.message });
            res.status(200).json(results);
        });
    });

    // 4. Update a review (Admin moderation)
    app.put('/api/reviews/:review_id', (req, res) => {
        const { review_id } = req.params;
        const { review_text } = req.body;
        
        if (!review_text) {
            return res.status(400).json({ message: "Review text is required" });
        }

        const sql = `UPDATE reviews SET review_text = ? WHERE review_id = ?`;
        db.query(sql, [review_text, review_id], (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Review not found" });
            res.status(200).json({ message: "Review updated successfully" });
        });
    });

    // 5. Delete a review (Admin moderation)
    app.delete('/api/reviews/:review_id', (req, res) => {
        const { review_id } = req.params;
        const sql = `DELETE FROM reviews WHERE review_id = ?`;
        db.query(sql, [review_id], (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Review not found" });
            res.status(200).json({ message: "Review deleted successfully" });
        });
    });
}
