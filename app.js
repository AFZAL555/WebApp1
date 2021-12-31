var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db=require('./config/DBconnection')
var session=require('express-session')

var userRouter = require('./routes/user/user');
var adminRouter = require('./routes/admin/admin');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'veryofficialsecret',saveUninitialized:true,resave:false,cookie:{secure:false ,maxAge:6000000}}));

app.use(function(req,res,next)
{
  res.set('cache-control','no-cache,no-store,must-revalidate')
  next()
});



db.connect((err)=>{
  if(err) console.log('DataBase Not Connected .....>>'+err);
  else console.log('DataBase Connected....')

});

app.use('/', userRouter);
app.use('/adminlog8714', adminRouter);

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


