const mysql = require('mysql2');

// MySQL kapcsolat létrehozása 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: '',
    database: 'studb014'
  });
  
  // Kapcsolódás az adatbázishoz
db.connect((err) => {
  if (err) {
      console.error('Nem sikerült kapcsolódni az adatbázishoz:', err);
      process.exit(1);
  }
  console.log('Sikeresen csatlakoztunk az adatbázishoz.');
});

module.exports = db;

