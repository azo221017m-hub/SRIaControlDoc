const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const modelsDir = path.join(__dirname);
const dbPath = path.join(modelsDir, 'sri.db');

// Crea la carpeta si no existe
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a SQLite:', err.message);
    throw err;
  } else {
    console.log('Conectado a la base de datos SQLite.');

    // Crear tabla usuarios si no existe
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL UNIQUE,
      empresa TEXT NOT NULL,
      total_agentes INTEGER NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error al crear tabla:', err.message);
      } else {
        console.log('Tabla usuarios lista.');
      }
    });
  }
});

module.exports = db;
