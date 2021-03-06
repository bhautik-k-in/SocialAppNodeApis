const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const colors = require("colors")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const xssClean = require("xss-clean")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const errorHandler = require("./middleware/errorHandler")
require("./model/connection")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require("./routes/posts")
const commentRouter = require("./routes/comments")

const app = express();


// SANITIZE DATA
app.use(mongoSanitize())

// SET SECURITY HEADERS
app.use(helmet())

// PREVENT CROSS SITE SCRIPTING ATTACK
app.use(xssClean())


// SWAGGER
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Social api',
      description: 'Social api information',
      contact: {
        name: "Bhautik Kevadiya"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ['.routes/*.js']
}

// SWAGGER DOCS 
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }), express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use(errorHandler)


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
  console.log(err.status.red)
  res.render('error');
});

module.exports = app;
