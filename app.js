const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middleware para parsear JSON en requests
app.use(express.json());

// Conectar o crear base de datos SQLite
const db = new sqlite3.Database('./d/database.sqlite', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde Express con SQLite!');
});


module.exports = app;
