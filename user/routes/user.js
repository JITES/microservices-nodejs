const express = require('express');
const ErrorHandler = require('../error/errorhandler');
const user = require('../models/user');

const router = express.Router();

router.get('/', (req, res, next) => {
  next(ErrorHandler.NotFound());
});

router.get('/user', async (req, res) => {
  try {
    const allUser = await user.find();
    res.send(allUser);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post('/user', (req, res) => {
  try {
    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
    });
    newUser.save().then((item) => res.redirect('/user'));
  } catch (error) {
    console.log(error.message);
    throw new ErrorHandler(442, error.message);
  }
});

module.exports = router;
