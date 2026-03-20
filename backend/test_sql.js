import mysql from 'mysql2';
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'law_link' });
db.query("DESCRIBE lawyers", (err, res) => {
    if (err) console.error(err);
    else console.log(JSON.stringify(res.map(c => c.Field)));
    db.end();
});
