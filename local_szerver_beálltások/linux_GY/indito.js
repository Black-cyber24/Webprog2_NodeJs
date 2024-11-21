const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // MySQL csatlakozó
const connection = require('./adatbazis'); // Importáljuk a helyes változót
const fs = require('fs');
const readline = require('readline');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Alkalmazás beállításai
app.use(bodyParser.urlencoded({ extended: true }));

// Sablonmotor beállítása
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'NodeJs/views'));

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'NodeJs/public')));

// Kapcsolódás ellenõrzése
connection.connect(err => {
    if (err) {
        console.error('Hiba a kapcsolódásban: ' + err.stack);
        return;
    }
    console.log('Kapcsolódva az adatbázishoz, ID: ' + connection.threadId);
});

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
    connection.query(szallodaQuery, (err, szallodaResults) => {
        if (err) throw err;

        // Továbbítjuk az adatokat az EJS fájlnak
        res.render('utazas', {
            szalloda: szallodaResults,
        });
    });
});

// A szerver indítása a megadott IP-n és porton
const port = '8010'; // Válassz szabad portot
const serverIP = '127.0.0.1'; // Cseréld ki a megfelelõ IP-re

app.listen(port, serverIP, () => {
    console.log(`The server is running at http://${serverIP}:${port}`);
});
