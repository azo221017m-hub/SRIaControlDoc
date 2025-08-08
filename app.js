const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));


// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



module.exports = app;
