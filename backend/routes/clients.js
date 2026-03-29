import db from '../database/database.js';
import { createNotification } from '../utils/notificationHelper.js';

export default function ClientRequests(app) {
    // 1. Client sends a request to a lawyer
    app.post('/client-requests', (req, res) => {
        const { client_id, lawyer_id, request_details } = req.body;

        if (!client_id || !lawyer_id || !request_details) {
            return res.status(400).json({ message: "client_id, lawyer_id, and request_details are required" });
        }

        // Check if a request already exists
        const checkSql = "SELECT request_id, status FROM client_requests WHERE client_id = ? AND lawyer_id = ?";
        db.query(checkSql, [client_id, lawyer_id], (checkErr, checkResults) => {
            if (checkErr) return res.status(500).json({ message: "Database error" });
            if (checkResults.length > 0) {
                return res.status(400).json({ message: "A request already exists for this lawyer", status: checkResults[0].status });
            }

            // Step 1: Insert the client request record
            const requestSql = "INSERT INTO client_requests (client_id, lawyer_id, request_details) VALUES (?, ?, ?)";
            db.query(requestSql, [client_id, lawyer_id, request_details], (err, result) => {
                if (err) {
                    console.error("Error creating client request:", err);
                    return res.status(500).json({ message: "Database error", error: err.message });
                }

                const request_id = result.insertId;

                // Step 2: Create/Get conversation and send initial message
                const convSql = `
                    INSERT INTO conversations (participant_id, participant_role, lawyer_id) 
                    VALUES (?, 'client', ?)
                    ON DUPLICATE KEY UPDATE conversation_id = LAST_INSERT_ID(conversation_id)
                `;
                db.query(convSql, [client_id, lawyer_id], (convErr, convResult) => {
                    if (convErr) {
                        console.error("Error automated conversation creation:", convErr);
                        return;
                    }
                    
                    // In mysql2, insertId should be the value of LAST_INSERT_ID()
                    let conversation_id = convResult.insertId;
                    
                    const createMsg = (cid) => {
                        const msgSql = "INSERT INTO messages (conversation_id, sender_id, sender_role, message_text) VALUES (?, ?, 'client', ?)";
                        db.query(msgSql, [cid, client_id, request_details], (msgErr) => {
                            if (msgErr) console.error("Error automated message creation:", msgErr);
                        });
                    };

                    if (!conversation_id) {
                        // Fallback: fetch it if insertId is 0 for some reason
                        db.query("SELECT conversation_id FROM conversations WHERE participant_id = ? AND lawyer_id = ?", [client_id, lawyer_id], (fErr, fResults) => {
                            if (!fErr && fResults.length > 0) {
                                createMsg(fResults[0].conversation_id);
                            }
                        });
                    } else {
                        createMsg(conversation_id);
                    }

                    // Notify lawyer about the new request
                    const getLawyerSql = "SELECT full_name, email FROM lawyers WHERE lawyer_id = ?";
                    db.query(getLawyerSql, [lawyer_id], (errL, resultsL) => {
                        if (!errL && resultsL.length > 0) {
                            const lawyer = resultsL[0];
                            createNotification(
                                lawyer_id, 'lawyer', 'NEW_REQUEST',
                                `New request from client: "${request_details.substring(0, 50)}${request_details.length > 50 ? '...' : ''}"`,
                                lawyer.email, 'New Client Request - LawLink',
                                `Hello ${lawyer.full_name},\n\nYou have received a new client request on LawLink with the following details:\n\n"${request_details}"\n\nPlease log into your dashboard to review and accept/decline the request.\n\nBest regards,\nLawLink Team`
                            );
                        }
                    });
                });

                res.status(201).json({
                    message: "Request sent successfully",
                    request_id
                });
            });
        });
    });

    // 1.5 Get status of a request for a specific client and lawyer
    app.get('/client-requests/status/:client_id/:lawyer_id', (req, res) => {
        const { client_id, lawyer_id } = req.params;
        const sql = "SELECT status FROM client_requests WHERE client_id = ? AND lawyer_id = ?";
        db.query(sql, [client_id, lawyer_id], (err, results) => {
            if (err) return res.status(500).json({ message: "Database error" });
            if (results.length === 0) return res.status(200).json({ status: 'none' });
            res.status(200).json({ status: results[0].status });
        });
    });

    // 2. Lawyer fetches their requests
    app.get('/client-requests/lawyer/:lawyer_id', (req, res) => {
        const { lawyer_id } = req.params;
        console.log(`Fetching requests for lawyer ${lawyer_id}`);

        const sql = `
            SELECT cr.*, u.full_name as client_name, u.email as client_email, u.phone_number as client_phone
            FROM client_requests cr
            JOIN users u ON cr.client_id = u.user_id
            WHERE cr.lawyer_id = ?
            ORDER BY cr.created_at DESC
        `;
        db.query(sql, [lawyer_id], (err, results) => {
            if (err) {
                console.error("Error fetching client requests:", err);
                return res.status(500).json({ message: "Database error", error: err.message });
            }
            res.status(200).json(results);
        });
    });

    // 3. Lawyer accepts or rejects a request
    app.put('/client-requests/:request_id/action', (req, res) => {
        const { request_id } = req.params;
        const { action, initial_message } = req.body; // 'accepted' or 'rejected'
        console.log(`Action ${action} for request ${request_id}`);

        if (!['accepted', 'rejected'].includes(action)) {
            return res.status(400).json({ message: "Invalid action. Must be 'accepted' or 'rejected'." });
        }

        // First, get the request details (client info)
        const getRequestSql = `
            SELECT cr.*, u.full_name as client_name, u.email as client_email, l.full_name as lawyer_name
            FROM client_requests cr
            JOIN users u ON cr.client_id = u.user_id
            JOIN lawyers l ON cr.lawyer_id = l.lawyer_id
            WHERE cr.request_id = ?
        `;

        db.query(getRequestSql, [request_id], (err, results) => {
            if (err || results.length === 0) {
                console.error("Request not found:", err);
                return res.status(404).json({ message: "Request not found" });
            }

            const request = results[0];

            // Update request status
            const updateSql = "UPDATE client_requests SET status = ? WHERE request_id = ?";
            db.query(updateSql, [action, request_id], (updateErr) => {
                if (updateErr) {
                    console.error("Error updating request status:", updateErr);
                    return res.status(500).json({ message: "Database error", error: updateErr.message });
                }

                // If accepted, create a conversation
                if (action === 'accepted') {
                    const convSql = `
                        INSERT INTO conversations (participant_id, participant_role, lawyer_id) 
                        VALUES (?, 'client', ?)
                        ON DUPLICATE KEY UPDATE conversation_id = LAST_INSERT_ID(conversation_id)
                    `;
                    db.query(convSql, [request.client_id, request.lawyer_id], (convErr, convResult) => {
                        if (convErr) {
                            console.error("Error creating conversation on acceptance:", convErr);
                            return res.status(500).json({ message: "Error creating conversation" });
                        }

                        const conversation_id = convResult.insertId;

                        // Insert initial message if provided
                        if (initial_message) {
                            const msgSql = "INSERT INTO messages (conversation_id, sender_id, sender_role, message_text) VALUES (?, ?, 'lawyer', ?)";
                            db.query(msgSql, [conversation_id, request.lawyer_id, initial_message], (msgErr) => {
                                if (msgErr) console.error("Error sending initial message:", msgErr);
                            });
                        }

                        // Send email notification anyway
                        sendNotificationEmail(request, action);
                        res.status(200).json({ message: `Request ${action} successfully`, conversation_id });
                    });
                } else {
                    // Just send email for rejection
                    sendNotificationEmail(request, action);
                    res.status(200).json({ message: `Request ${action} successfully` });
                }
            });
        });
    });

    function sendNotificationEmail(request, action) {
        const subject = action === 'accepted' ? 'Request Accepted - LawLink' : 'Request Update - LawLink';
        const text = action === 'accepted'
            ? `Hello ${request.client_name},\n\nYour request to ${request.lawyer_name} has been accepted. You can now communicate via the Messaging section in your dashboard.\n\nBest regards,\nLawLink Team`
            : `Hello ${request.client_name},\n\nWe regret to inform you that your request to ${request.lawyer_name} has been rejected at this time.\n\nBest regards,\nLawLink Team`;
        
        const short_msg = action === 'accepted' ? `Your request to ${request.lawyer_name} was accepted` : `Your request to ${request.lawyer_name} was rejected`;

        createNotification(request.client_id, 'client', 'REQUEST_UPDATE', short_msg, request.client_email, subject, text);
    }

    // 4. Get all lawyers who have accepted a request from this client
    app.get('/client-requests/accepted/:client_id', (req, res) => {
        const { client_id } = req.params;
        const sql = `
            SELECT l.lawyer_id, l.full_name, l.specialization, l.province, l.district, l.email
            FROM client_requests cr
            JOIN lawyers l ON cr.lawyer_id = l.lawyer_id
            WHERE cr.client_id = ? AND cr.status = 'accepted'
        `;
        db.query(sql, [client_id], (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err.message });
            res.status(200).json(results);
        });
    });
}
