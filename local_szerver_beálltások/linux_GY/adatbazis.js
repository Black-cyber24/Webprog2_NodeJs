const mysql = require('mysql2'); // MySQL csatlakozó

// MySQL kapcsolat létrehozása
const connection = mysql.createConnection({
    host: '143.47.98.96',
    user: 'studb010',
    password: 'xyz456',
    database: 'db010'
});

// Kapcsolat tesztelése
connection.connect((err) => {
    if (err) {
        console.error('Hiba az adatbázishoz való csatlakozáskor: ' + err.stack);
        return;
    }
    console.log('Sikeres csatlakozás az adatbázishoz.');
});

// Exportálás, hogy más fájlok is használhassák a kapcsolatot
module.exports = connection;
