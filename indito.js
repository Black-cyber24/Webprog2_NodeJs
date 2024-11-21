const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');
const db = require('./adatbazis');


// Alkalmazás beállításai
app.use(bodyParser.urlencoded({ extended: true }));


// Sablonmotor beÃ¡llÃ­tÃ¡sa
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'NodeJs/views'));

// Statikus fÃ¡jlok kiszolgÃ¡lÃ¡sa
app.use(express.static(path.join(__dirname, 'NodeJs/public')));

// Ãštvonalak
app.get('/', (req, res) => {
    res.render('pages/index');
    
});

app.get('/database', (req, res) => {
    res.render("pages/database", {title: "database page"});
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

  // LekÃ©rdezÃ©s a nyelv tÃ¡blÃ¡bÃ³l 10 rekordra limitÃ¡lva.
  app.get('/db014', (req, res) => {
    const szallodaQuery = 'SELECT * FROM szalloda LIMIT 10';
    
  
    // TÃ¶bb lekÃ©rdezÃ©s vÃ©grehajtÃ¡sa
    db.query(szallodaQuery, (err, szallodaResults) => {
      if (err) throw err;
  
    
  
          // TovÃ¡bbÃ­tjuk az adatokat az EJS fÃ¡jlnak
          res.render('database page', {
            szalloda: szallodaResults,
           
          });
        });
      });



// A szerver indítása helyi IP-n és egy szabad porton
const port = 8010; // Választhatsz másik szabad portot is
const serverIP = '127.0.0.1'; // A szerver helyi IP címe

app.listen(port, serverIP, () => {
    console.log(`The server is running at http://${serverIP}:${port}`);
});