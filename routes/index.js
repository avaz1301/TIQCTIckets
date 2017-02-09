var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');

/* GET home page. */
router.get('/', stormpath.getUser, function(req, res) {
  res.render('index', { title: 'TIQC Ticket System', isLoggedIn: req.user });
});

router.get('/ticketForm',stormpath.authenticationRequired, function(req, res) {
  res.render('ticketForm');
});

router.get('/logout', function(req, res) {
  res.redirect('/');
});

module.exports = router;
