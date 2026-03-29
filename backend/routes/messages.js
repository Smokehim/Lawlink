import db from '../database/database.js';

export default function Messages(app) {
    
    // Send a message between user and lawyer
    app.post('/messages', (req, res) => {
        const { conversation_id, sender_id, sender_role, message_text } = req.body;
        console.log(`Sending message in conversation: ${conversation_id} from: ${sender_id} (${sender_role})`);
        
        if (!conversation_id || !sender_id || !sender_role || !message_text) {
            console.warn("Missing required fields for message");
            return res.status(400).json({ message: "conversation_id, sender_id, sender_role, and message_text are required" });
        }

        // NEW: Verify if sender is participant in the conversation
        const verifySql = `
            SELECT conversation_id, participant_id, lawyer_id FROM conversations 
            WHERE conversation_id = ? AND (
                (participant_id = ? AND participant_role = ?) OR 
                (lawyer_id = ? AND ? = 'lawyer')
            )
        `;
        db.query(verifySql, [conversation_id, sender_id, sender_role, sender_id, sender_role], (vErr, vResults) => {
            if (vErr) return res.status(500).json({ message: "Database error" });
            if (vResults.length === 0) {
                return res.status(403).json({ message: "You are not a participant in this conversation." });
            }

            const conversation = vResults[0];

            // NEW: If client sender, check if the request is accepted
            if (sender_role === 'client') {
                const checkReqSql = "SELECT status FROM client_requests WHERE client_id = ? AND lawyer_id = ? AND status = 'accepted'";
                db.query(checkReqSql, [sender_id, conversation.lawyer_id], (creqErr, creqResults) => {
                    if (creqErr) return res.status(500).json({ message: "Database error" });
                    if (creqResults.length === 0) {
                        return res.status(403).json({ message: "You cannot send messages until your request is accepted by the lawyer." });
                    }
                    proceed();
                });
            } else {
                proceed();
            }

            function proceed() {
                const sql = "INSERT INTO messages (conversation_id, sender_id, sender_role, message_text) VALUES (?, ?, ?, ?)";
                db.query(sql, [conversation_id, sender_id, sender_role, message_text], (err, result) => {
                    if (err) {
                        console.error("Error inserting message:", err);
                        return res.status(500).json({ message: "Database error", error: err.message });
                    }
                    console.log(`Message successfully sent. ID: ${result.insertId}`);
                    
                    res.status(201).json({ 
                        message: "Message sent successfully",
                        message_id: result.insertId
                    });
                });
            }
        });
    });

    // Get all messages for a conversation
    app.get('/messages/:conversation_id', (req, res) => {
        const { conversation_id } = req.params;
        console.log(`Fetching messages for conversation_id: ${conversation_id}`);
        
        const sql = `
            SELECT * FROM messages 
            WHERE conversation_id = ?
            ORDER BY created_at ASC
        `;
        db.query(sql, [conversation_id], (err, result) => {
            if (err) {
                console.error("Error fetching messages:", err);
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            console.log(`Successfully fetched ${result.length} messages`);
            
            res.status(200).json(result);
        });
    });

    // Mark a message as read
    app.patch('/messages/:message_id/read', (req, res) => {
        const { message_id } = req.params;
        
        const sql = "UPDATE messages SET is_read = TRUE WHERE message_id = ?";
        db.query(sql, [message_id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Message not found" });
            }
            
            res.status(200).json({ message: "Message marked as read" });
        });
    });
}
