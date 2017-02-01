var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TIQC Ticket System', isLoggedIn: false });
});

router.get('/ticketForm', function(req, res) {
  res.render('ticketForm', { isLoggedIn: true });
});

router.get('/logout', function(req, res) {
  res.redirect('/');
});

module.exports = router;
