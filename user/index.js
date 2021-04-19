const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const ErrorHandler = require('./error/errorhandler');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const logger = require('./config/logger');
app.use(bodyParser.json());

mongoose
  .connect('mongodb://mongo:27017/posts', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    res.status(404).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }
  logger.log('Error', err.message);
  next();
});

app.use(morgan('combined'));
app.use('/user', userRoute);

app.listen(4000, () => {
  logger.log('info', 'This is v3');
  logger.log('info', 'Listening on 4000');
});
