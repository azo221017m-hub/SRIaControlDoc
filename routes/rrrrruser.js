const express = require('express');
const router = express.Router();

// Panel usuario protegido
router.get('/panel', (req, res) => {
  if (!req.session.user) {
    req.flash('error_msg', 'Debes iniciar sesión');
    return res.redirect('/auth/login');
  }
  res.render('user-panel');
});

module.exports = router;
