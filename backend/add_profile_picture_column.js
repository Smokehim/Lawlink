import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "law_link"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to DB:', err);
        return;
    }
    console.log('Connected to database.');

    const queries = [
        "ALTER TABLE users ADD COLUMN profile_picture VARCHAR(255) AFTER gender",
        "ALTER TABLE lawyers ADD COLUMN profile_picture VARCHAR(255) AFTER bar_number"
    ];

    let completed = 0;
    queries.forEach(sql => {
        db.query(sql, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_COLUMN_NAME') {
                    console.log(`Column already exists in table.`);
                } else {
                    console.error('Error executing query:', err.message);
                }
            } else {
                console.log('Query executed successfully:', sql);
            }
            completed++;
            if (completed === queries.length) {
                db.end();
                console.log('Database migration completed.');
            }
        });
    });
});
