const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // MySQL csatlakoz�
const connection = require('./adatbazis'); // Import�ljuk a helyes v�ltoz�t
const fs = require('fs');
const readline = require('readline');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Alkalmaz�s be�ll�t�sai
app.use(bodyParser.urlencoded({ extended: true }));

// Sablonmotor be�ll�t�sa
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'NodeJs/views'));

// Statikus f�jlok kiszolg�l�sa
app.use(express.static(path.join(__dirname, 'NodeJs/public')));

// Kapcsol�d�s ellen�rz�se
connection.connect(err => {
    if (err) {
        console.error('Hiba a kapcsol�d�sban: ' + err.stack);
        return;
    }
    console.log('Kapcsol�dva az adatb�zishoz, ID: ' + connection.threadId);
});

// �tvonalak
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

// Lek�rdez�s a nyelv t�bl�b�l 10 rekordra limit�lva.
app.get('/utazas', (req, res) => {
    const szallodaQuery = 'SELECT * FROM szalloda LIMIT 10';

    // T�bb lek�rdez�s v�grehajt�sa
    connection.query(szallodaQuery, (err, szallodaResults) => {
        if (err) throw err;

        // Tov�bb�tjuk az adatokat az EJS f�jlnak
        res.render('utazas', {
            szalloda: szallodaResults,
        });
    });
});

// A szerver ind�t�sa a megadott IP-n �s porton
const port = '8010'; // V�lassz szabad portot
const serverIP = '127.0.0.1'; // Cser�ld ki a megfelel� IP-re

app.listen(port, serverIP, () => {
    console.log(`The server is running at http://${serverIP}:${port}`);
});
