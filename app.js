var express = require('express');
var path = require('path');
require('dotenv').config();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var stormpath = require('express-stormpath');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(stormpath.init(app, {
  application: {
    href: process.env.STORMPATH_APPLICATION_HREF,
  },
  web:{
    login:{
      enabled: true,
      nextUri: "/ticketForm"
    },
    logout:{
      enabled: true
    },
    me: {
      enabled: false
    },
    register: {
      enabled: false
    }
  },
  client: {
    apiKey: {
      id: process.env.STORMPATH_CLIENT_APIKEY_ID,
      secret: process.env.STORMPATH_CLIENT_APIKEY_SECRET,
    }
  },
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);

app.on('stormpath.ready', function () {
  console.log('Stormpath Ready');
  app.listen(3000);
});


// MONGO START
MongoClient.connect('mongodb://localhost:27017/tiqcTickets', function (err, db) {
  if (err) throw err

  db.collection('tickets').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})
//MONGO end



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
