const express = require('express');
const app = express();
var path = require('path');
const db = require('./adatbazis');

// Sablonmotor beállítása
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'NodeJs/views'));

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'NodeJs/public')));

// Útvonalak
app.get('/', (req, res) => {
    res.render('pages/index');
    
});

app.get('/database', (req, res) => {
    res.render("pages/database", {title: "database"});
});

app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

app.get('/messages', (req, res) => {
    res.render('pages/messages');
});

app.get('/crud', (req, res) => {
    res.render('pages/crud');
});

app.get('/oop', (req, res) => {
    res.render('pages/oop');
});

  // Lekérdezés a nyelv táblából 10 rekordra limitálva.
  app.get('/utazas', (req, res) => {
    const szallodaQuery = 'SELECT * FROM szalloda LIMIT 10';
    
  
    // Több lekérdezés végrehajtása
    db.query(szallodaQuery, (err, szallodaResults) => {
      if (err) throw err;
  
    
  
          // Továbbítjuk az adatokat az EJS fájlnak
          res.render('utazas', {
            szalloda: szallodaResults,
           
          });
        });
      });



// A szerver ind�t�sa helyi IP-n �s egy szabad porton
const port = 8010; // V�laszthatsz m�sik szabad portot is
const serverIP = '10.0.0.253'; // A szerver helyi IP c�me

app.listen(port, serverIP, () => {
    console.log(`The server is running at http://${serverIP}:${port}`);
});