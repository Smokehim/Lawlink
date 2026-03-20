import db from './backend/database/database.js';

const steps = [
    // 1. Add new columns
    "ALTER TABLE messages ADD COLUMN conversation_id INT NULL AFTER message_id",
    "ALTER TABLE messages ADD COLUMN sender_role ENUM('client', 'lawyer', 'admin') NULL AFTER sender_id",

    // 2. Map old sender_type to new sender_role
    "UPDATE messages SET sender_role = 'client' WHERE sender_type = 'user'",
    "UPDATE messages SET sender_role = 'lawyer' WHERE sender_type = 'lawyer'",

    // 3. Populate conversation_id for existing messages
    // Case 1: Sender is user, receiver is lawyer
    `UPDATE messages m
     JOIN conversations c ON c.participant_id = m.sender_id 
                         AND c.participant_role = 'client' 
                         AND c.lawyer_id = m.receiver_id
     SET m.conversation_id = c.conversation_id
     WHERE m.sender_type = 'user' AND m.receiver_type = 'lawyer' AND m.conversation_id IS NULL`,

    // Case 2: Sender is lawyer, receiver is user
    `UPDATE messages m
     JOIN conversations c ON c.participant_id = m.receiver_id 
                         AND c.participant_role = 'client' 
                         AND c.lawyer_id = m.sender_id
     SET m.conversation_id = c.conversation_id
     WHERE m.sender_type = 'lawyer' AND m.receiver_type = 'user' AND m.conversation_id IS NULL`,

    // 4. Final touches: drop old columns and apply constraints
    "ALTER TABLE messages MODIFY COLUMN conversation_id INT NOT NULL",
    "ALTER TABLE messages MODIFY COLUMN sender_role ENUM('client', 'lawyer', 'admin') NOT NULL",
    "ALTER TABLE messages DROP COLUMN receiver_id",
    "ALTER TABLE messages DROP COLUMN sender_type",
    "ALTER TABLE messages DROP COLUMN receiver_type",
    "ALTER TABLE messages ADD INDEX idx_conversation (conversation_id)",
    "ALTER TABLE messages ADD INDEX idx_sender (sender_id, sender_role)"
];

async function runMigration() {
    console.log('Starting messages migration...');
    for (const sql of steps) {
        console.log(`Running: ${sql}`);
        try {
            await new Promise((resolve, reject) => {
                db.query(sql, (err) => {
                    if (err) {
                        // Ignore common errors for idempotency
                        if (err.code === 'ER_DUP_COLUMN_NAME' || err.code === 'ER_CANT_DROP_FIELD_OR_KEY' || err.code === 'ER_DUP_KEYNAME') {
                            console.warn(`  Warning: ${err.message}`);
                            resolve();
                        } else {
                            reject(err);
                        }
                    } else {
                        resolve();
                    }
                });
            });
        } catch (error) {
            console.error(`  Migration failed at: ${sql}`);
            console.error(error);
            // Optionally continue or stop. Since this is critical, we stop.
            process.exit(1);
        }
    }
    console.log('Messages migration complete!');
    db.end();
    process.exit(0);
}

runMigration();
