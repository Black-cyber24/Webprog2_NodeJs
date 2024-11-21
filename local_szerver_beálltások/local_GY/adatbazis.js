var express=require("express")
const mysql = require('mysql')
var app=express();

// MySQL kapcsolat létrehozása 
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'xyz456',
    database: 'utazas'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Hiba az adatbázishoz való csatlakozáskor: ' + err.stack);
      return;
    }
    console.log('Sikeres csatlakozás az adatbázishoz.');
  });