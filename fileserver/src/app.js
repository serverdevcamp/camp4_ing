const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./config/swagger');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const reviewRouter = require('./routes/review');
const laundryShopRouter = require('./routes/laundryShop');

const app = express();

const options = {
  swaggerDefinition,
  apis: ['./routes/profile.js','./routes/laundryShop.js','./routes/review.js']
};
console.log(options);

const swaggerSpec = swaggerJSDoc(options);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile',profileRouter);
app.use('/review',reviewRouter);
app.use('/laundryShop',laundryShopRouter);

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
