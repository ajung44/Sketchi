const express = require('express');
const controller = require('./controller.js')

const router = express.Router();

router.post('/', controller.loginController, (req,res) => {
  res.status(200).json({...res.locals})
})

router.post('/signup', controller.signupController, (req, res) => res.status(200).json(res.locals.newUser))

module.exports = router;