var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // esto lo ponemos cuando comenzamos

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { brotliCompress } = require('zlib');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// comienza codigo 1 generado por mi


// este codigo siempre debe estar arriba
app.use(session({
  secret: 'jlrtvralrsdr',
  resave: false,
  saveUninitialized: true

}));

// este codigo siempre debe estar arriba



//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.get('/', function (req, res) {
  var conocido = Boolean(req.session.nombre);

  res.render('index', {
    title: 'sesiones en express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
})

app.post('/ingresar', function (req, res) {

  if (req.body.nombre) {
    req.session.nombre = req.body.nombre
  }
  res.redirect('/');
});

app.get('/salir', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

// termina codigo 1 generado por mi


// comienza codigo 2 generado por mi

app.get('/', function (req, res) {
  var nacionalidad = Boolean(req.session.pais); 

  res.render('index', {
    //title: 'sesiones en express.js',
    nacionalidad: nacionalidad,
    pais: req.session.pais
  });
})

app.post('/ingresar', function (req, res) {

  if (req.body.pais) {
    req.session.pais = req.body.pais
  }
  res.redirect('/');
});

app.get('/salir', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});



//termina codigo 2 generado por mi

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
