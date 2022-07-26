const controller = {};
const User = require('./models/userModel.js')

controller.loginController = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await User.find({ username: req.body.username }).exec();
    if (result.length === 0) {
      res.locals.success = false;
      res.locals.reason = 'userNotFound'
      return next();
    }

    if (result[0].password !== req.body.password) {
      res.locals.success = false;
      res.locals.reason = 'wrongPassword'
    } else {
      res.locals.user = result;
      res.locals.success = true;
    }

    return next();
  } catch (error) {
    return next(error)
  }
}

controller.signupController = async (req, res, next) => {
  try {
    console.log(req.body)
    const createdUser = await User.create({ username: req.body.username, password: req.body.password })

    res.locals.newUser = createdUser;
    
    return next();
  } catch (error) {
    return next({ log: 'controller.signupController', message: `${error} Fiailed to create` })
  }
}

module.exports = controller;