const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middleware para parsear JSON en requests
app.use(express.json());



// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola desde Express con SQLite!');
});


module.exports = app;
