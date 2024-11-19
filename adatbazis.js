const mysql = require('mysql2');

// MySQL kapcsolat létrehozása 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'studb010',
    password: 'xyz456',
    database: 'db010'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Hiba az adatbázishoz való csatlakozáskor: ' + err.stack);
      return;
    }
    console.log('Sikeres csatlakozás az adatbázishoz.');
  });