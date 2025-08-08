const express = require('express');
const path = require('path');

const app = express();


// Middleware para servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz para devolver index.html explícitamente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});




module.exports = app;
