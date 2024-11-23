const mysql = require('mysql2');

// MySQL kapcsolat létrehozása 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'xyz456',
    database: 'db014'
});

// Kapcsolódás az adatbázishoz
db.connect((err) => {
    if (err) {
        console.error('Hiba az adatbázishoz való csatlakozáskor: ' + err.stack);
        process.exit(1);
    }
    console.log('Sikeres csatlakozás az adatbázishoz.');
});

module.exports = db;
