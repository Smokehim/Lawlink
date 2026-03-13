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
    console.log('Connected to DB');
    
    // Add lawyer_type column to lawyers table
    const alterSql = "ALTER TABLE lawyers ADD COLUMN lawyer_type VARCHAR(50) DEFAULT 'lawyer' AFTER phone_number";
    
    db.query(alterSql, (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_COLUMN_NAME') {
                console.log('Column lawyer_type already exists.');
            } else {
                console.error('Error adding column:', err);
            }
        } else {
            console.log('Column lawyer_type added successfully.');
        }
        db.end();
    });
});
