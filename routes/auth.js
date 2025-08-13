const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models/database');

// GET formulario registro
router.get('/register', (req, res) => {
  res.render('register', { errors: [], old: {}, error_msg: [], success_msg: [] });
});

// POST registro
router.post('/register',
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('correo').isEmail().withMessage('Correo inválido'),
  body('empresa').notEmpty().withMessage('La empresa es obligatoria'),
  body('total_agentes').isInt({ min: 1 }).withMessage('Total de agentes debe ser un número mayor a 0'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('register', { errors: errors.array(), old: req.body, error_msg: [], success_msg: [] });
    }

    const { nombre, correo, empresa, total_agentes } = req.body;

    const sql = `INSERT INTO usuarios (nombre, correo, empresa, total_agentes) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nombre, correo, empresa, total_agentes], function(err) {
      if (err) {
        let dbErrors = [];
        if (err.message.includes('UNIQUE constraint failed')) {
          dbErrors.push({ msg: 'El correo ya está registrado' });
        } else {
          dbErrors.push({ msg: 'Error al registrar usuario' });
        }
        return res.render('register', { errors: dbErrors, old: req.body, error_msg: [], success_msg: [] });
      }
      req.flash('success_msg', 'Registro exitoso, inicia sesión.');
      res.redirect('/login');
    });
  }
);

// GET formulario login
router.get('/login', (req, res) => {
  res.render('login', {
    old: {},                // para que la vista no falle si accede a old
    errors: [],
    success_msg: req.flash('success_msg'),
    error_msg: req.flash('error_msg'),
  });
});

// POST login
router.post('/login',
  body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
  body('empresa').notEmpty().withMessage('La empresa es obligatoria'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Enviar errores y datos antiguos para que la vista los muestre
      return res.render('login', {
        errors: errors.array(),
        old: req.body,
        success_msg: [],
        error_msg: []
      });
    }

    const { usuario, empresa } = req.body;
    // Aquí implementa tu lógica de autenticación real
    // Por ahora, simulamos éxito:
    req.session.user = { usuario, empresa };
    res.redirect('/user/panel');
  }
);

module.exports = router;
