var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require("express-fileupload");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts')
var cors = require('cors')

var dotenv = require('dotenv');

dotenv.config({path: './config/config.env'})

//Models
const Post = require('./models/Posts/Post');

//MongoDB Middleware
var mongoose = require('mongoose');
var MongoStore = require("connect-mongo"); //For sessions
const {connectDB} = require("./config/db"); 
connectDB();


var app = express();

app.use(fileUpload())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts',postRouter)

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
  
});

module.exports = app;
