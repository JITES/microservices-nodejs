const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/user');
const ErrorHandler = require('./error/errorhandler');
const mongoose = require('mongoose');

const app = express();

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
  console.log('Error', err.message);
  next();
});

app.use(mainRouter);

app.listen(4000, () => {
  console.log('Listening on 4000');
});
