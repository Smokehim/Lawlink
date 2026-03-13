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
    
    console.log('--- Users Table ---');
    db.query("SELECT user_id, email, profile_picture FROM users", (err, users) => {
        if (err) console.error(err);
        else console.log(JSON.stringify(users, null, 2));

        console.log('\n--- Lawyers Table ---');
        db.query("SELECT lawyer_id, email, profile_picture FROM lawyers", (err, lawyers) => {
            if (err) console.error(err);
            else console.log(JSON.stringify(lawyers, null, 2));
            db.end();
        });
    });
});
