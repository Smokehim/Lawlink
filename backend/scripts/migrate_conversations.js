import db from './backend/database/database.js';

const steps = [
    "ALTER TABLE conversations DROP INDEX unique_conversation",
    "ALTER TABLE conversations DROP INDEX idx_client",
    "ALTER TABLE conversations ADD COLUMN participant_id INT NULL AFTER conversation_id",
    "ALTER TABLE conversations ADD COLUMN participant_role ENUM('client', 'admin') NULL AFTER participant_id",
    "UPDATE conversations SET participant_id = client_id, participant_role = 'client' WHERE participant_id IS NULL",
    "ALTER TABLE conversations MODIFY COLUMN participant_id INT NOT NULL",
    "ALTER TABLE conversations MODIFY COLUMN participant_role ENUM('client', 'admin') NOT NULL",
    "ALTER TABLE conversations DROP COLUMN client_id",
    "ALTER TABLE conversations ADD UNIQUE KEY unique_conversation (participant_id, participant_role, lawyer_id)",
    "ALTER TABLE conversations ADD INDEX idx_participant (participant_id, participant_role)",
    "ALTER TABLE conversations ADD INDEX idx_lawyer (lawyer_id)"
];

async function runMigration() {
    console.log('Starting migration...');
    for (const sql of steps) {
        console.log(`Running: ${sql}`);
        try {
            await new Promise((resolve, reject) => {
                db.query(sql, (err) => {
                    if (err) {
                        // Ignore errors like "column already exists" or "index doesn't exist" to make it idempotent
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
            process.exit(1);
        }
    }
    console.log('Migration complete!');
    db.end();
    process.exit(0);
}

runMigration();
