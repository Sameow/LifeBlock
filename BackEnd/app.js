var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

var indexRouter = require('./routes/index');
var truffleRouter = require('./routes/truffle');
var authRouter = require('./routes/auth');

var app = express();

var corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.options('*', cors(corsOptions))


app.use('/', indexRouter);
app.use('/truffle', truffleRouter);
app.use('/auth', authRouter);

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


// import startNetwork from ;
var devTools = require('./development.js');
var IPFSTools = require('./IPFS.js');

IPFSTools.createIPFS().then((res) => global.IPFS = res);
devTools.startNetwork();

module.exports = app;


module.exports = app;
