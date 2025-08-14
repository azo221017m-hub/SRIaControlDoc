const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


const fs = require('fs');
const pdf = require('pdf-parse');

app.get('/', (req, res) => {
  try {
    let dataBuffer = fs.readFileSync('public/pdf/archivo.pdf');
    pdf(dataBuffer).then(data => {
      res.render('index', { pdfText: data.text });
    });
  } catch (err) {
    res.render('index', { pdfText: "No se pudo cargar el PDF." });
  }
});


// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Ruta principal
app.get("/", (req, res) => {
    res.render("index");
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
