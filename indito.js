const express = require('express');
const app = express();
const path = require('path');
const db = require('./adatbazis');
const bodyParser = require('body-parser');


// Sablonmotor beállítása
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'NodeJs/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'NodeJs/public/assets')));


// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'NodeJs/public')));


// Útvonalak
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});


// Adatbázis tartalmának kiíratása
app.get('/database', (req, res) => {
    const szallodaQuery = 'SELECT * FROM szalloda INNER JOIN helyseg ON szalloda.helyseg_az = helyseg.az INNER JOIN tavasz ON szalloda.helyseg_az = tavasz.sorszam LIMIT 10';

    db.query(szallodaQuery, (err, szallodaResults) => {
        if (err) {
            console.error(err);
            res.status(500).send('Adatbázis hiba történt.');
            return;
        }

        // Továbbítjuk az adatokat az EJS sablonnak
        res.render('pages/database', {
            title: 'Adatbázis',
            szalloda: szallodaResults
        });
    });
});


app.get('/oop', (req, res) => {
    res.render('pages/oop');
});


  // Adatbázisból az üzenetek kiíratása csökkenő sorrendben
  app.get('/messages', (req, res) => {
    const sql = 'SELECT * FROM `uzenetek` ORDER BY datum DESC';

    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
            res.status(500).send('Adatbázis hiba történt.');
            return;
      }
      
      // Továbbítjuk az adatokat az EJS sablonnak
      res.render('pages/messages', {
        title: 'Üzenetek', 
        uzenetek: results
       }); 
    });
  });
  


  // Üzenetek importálása az adatbázisba
  app.post('/upload_message', (req, res) => {
    const { name, email, message } = req.body;
  
    const sql = 'INSERT INTO uzenetek (nev, email, uzenet) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
          console.error(err);
            res.status(500).send('Feltöltési hiba történt.');
            return;
        }
  
        console.log('Message sent:', result);
        res.redirect('/messages');
    });
  });


// CRUD Útvonalak
// Adatok listázása (Read)
app.get('/crud', (req, res) => {
  const query = 'SELECT * FROM helyseg'; // Adatbázis lekérdezés
  db.query(query, (err, results) => {
      if (err) {
          console.error('Adatbázis hiba történt:', err);
          res.status(500).send('Hiba történt az adatok lekérdezésekor.');
          return;
      }
      // Az EJS sablon számára az adatok átadása
      res.render('pages/crud', { helyseg_lista: results });
  });
});

app.post('/crud/add', async (req, res) => {
  try {
      const { nev, orszag } = req.body;

      // Ellenőrizd, hogy az összes mező ki van-e töltve
      if (!nev || !orszag) {
          return res.status(400).send('Minden mezőt ki kell tölteni!');
      }

      // Új rekord hozzáadása az adatbázishoz
      const query = 'INSERT INTO helyseg (nev, orszag) VALUES (?, ?)';
      db.query(query, [nev, orszag], (err, results) => {
          if (err) {
              console.error('Hiba az új rekord hozzáadásakor:', err.message);
              return res.status(500).send('Rekord hozzáadási hiba.');
          }
          res.redirect('/crud'); // Sikeres hozzáadás esetén irányítás
      });
  } catch (err) {
      console.error('Váratlan hiba történt:', err.message);
      res.status(500).send('Váratlan hiba történt.');
  }
});




// Rekord módosítása (Update)
app.post('/crud/update/:az', (req, res) => {
  const { az } = req.params;
  const { nev, orszag } = req.body;
  const query = 'UPDATE helyseg SET nev = ?, orszag = ? WHERE az = ?';
  db.query(query, [nev, orszag, az], (err) => {
      if (err) {
          console.error('Hiba a rekord módosításakor:', err);
          res.status(500).send('Rekord módosítási hiba.');
          return;
      }
      res.redirect('/crud');
  });
});

// Rekord törlése (Delete)
app.get('/crud/delete/:az', (req, res) => {
  const { az } = req.params;
  const query = 'DELETE FROM helyseg WHERE az = ?';
  db.query(query, [az], (err) => {
      if (err) {
          console.error('Hiba a rekord törlésekor:', err);
          res.status(500).send('Rekord törlési hiba.');
          return;
      }
      res.redirect('/crud');
  });
});



// A szerver ind�t�sa helyi IP-n �s egy szabad porton
//const port = 8014; // V�laszthatsz m�sik szabad portot is
//const serverIP = '10.0.0.253'; // A szerver helyi IP c�me

//app.listen(port, serverIP, () => {
//    console.log(`The server is running at http://${serverIP}:${port}`);
//});

// Szerver indítása
app.listen(4000, () => {
  var date = new Date();
  console.log(date);
  console.log('The server runs at port: 4000');
  console.log('http://localhost:4000');
  
  
});

