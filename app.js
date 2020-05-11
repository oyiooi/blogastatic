var createError = require('http-errors');
var compression = require('compression');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const authRouter = require('./routes/auth');
const loginpassRouter = require('./routes/loginpass');
const changepwRouter = require('./routes/changepw');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use('/',express.static('homepage'));
app.use('/index',express.static('index'));
app.use('/login',express.static('login'));
app.use('/images',express.static('images'));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});
app.use('/loginpass', loginpassRouter);
app.use('/backend', authRouter);
app.use('/backend',express.static('backend'));

app.use('/changepw',changepwRouter);

//刷新
app.use(function(req,res,next){
  console.log('backendddd')
  if(req.url.indexOf('/backend')>-1){
    res.sendFile(path.resolve(__dirname,'backend','index.html'));
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
