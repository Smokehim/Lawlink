const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "law_link"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting:', err);
        process.exit(1);
    }
    db.query('SELECT email, password, verification_status FROM admins', (err, results) => {
        if (err) {
            console.error('Error querying:', err);
            process.exit(1);
        }
        console.log(JSON.stringify(results, null, 2));
        db.end();
    });
});
