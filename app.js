const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth');



const app = express();
const PORT = 3000;

// Middleware para parsear formularios y JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración sesiones y flash
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use('/', authRoutes);

// Middleware para pasar mensajes flash a las vistas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Motor de vistas y carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));


// Página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Inicio del servidor


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

