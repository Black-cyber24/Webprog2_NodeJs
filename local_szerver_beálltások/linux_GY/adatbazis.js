const mysql = require('mysql2'); // MySQL csatlakoz�

// MySQL kapcsolat l�trehoz�sa
const connection = mysql.createConnection({
    host: '143.47.98.96',
    user: 'studb010',
    password: 'xyz456',
    database: 'db010'
});

// Kapcsolat tesztel�se
connection.connect((err) => {
    if (err) {
        console.error('Hiba az adatb�zishoz val� csatlakoz�skor: ' + err.stack);
        return;
    }
    console.log('Sikeres csatlakoz�s az adatb�zishoz.');
});

// Export�l�s, hogy m�s f�jlok is haszn�lhass�k a kapcsolatot
module.exports = connection;
