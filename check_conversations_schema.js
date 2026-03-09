import db from './backend/database/database.js';
import fs from 'fs';

db.query('DESCRIBE messages', (err, results) => {
    if (err) {
        fs.writeFileSync('schema_error.txt', JSON.stringify(err, null, 2));
    } else {
        fs.writeFileSync('messages_describe.json', JSON.stringify(results, null, 2));
    }
    db.end();
    process.exit();
});
