const controller = {};
const model = require('./models/userModel.js')

controller.loginController = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await model.User.find({ username: req.body.username }).exec();
    if (result.length === 0) {
      res.locals.success = false;
      res.locals.reason = 'userNotFound';
      return next();
    }

    if (result[0].password !== req.body.password) {
      res.locals.success = false;
      res.locals.reason = 'wrongPassword'
    } else {
      res.locals.id = result[0]._id;
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
    const createdUser = await model.User.create({ username: req.body.username, password: req.body.password })

    res.locals.newUser = createdUser;
    
    return next();
  } catch (error) {
    return next({ log: 'controller.signupController', message: `${error} Fiailed to create` })
  }
}

controller.getFiles = async (req, res, next) => {
  try {
    console.log('????, ',req.body);
    const allFiles = await model.User.findById(req.body.id);
    console.log('allFiles /n', allFiles);
    res.locals.drawingId = allFiles.drawings;
    return next();
  } catch (error) {
    return next({ log: 'controller.getFiles', message: `${error} Failed to get Files` });
  }
}

controller.getPosts = async (req, res, next) => {
  try {
    const allPosts = await model.Post.find();
    res.locals.postings = allPosts;
    return next();
  } catch (error) {
    return next({ log: 'controller.getPosts', message: `${error} Failed to get posts` });
  }
}

controller.fileToDrawings = async (req, res, next) => {
  try {
    //[objid, objid]
    console.log('file To Drawings', res.locals.drawingId)
    const drawings = await model.Drawing.find({ _id: { $in: [...res.locals.drawingId] } });
    console.log('drawings here: ', drawings);
    res.locals.drawings = drawings;
    return next();
  } catch (error) {
    return next({ log: 'controller.fileToDrawings', message: `${error} Failed to get Drawings` });
  }
}

controller.saveFile = async (req, res, next) => {
  try {
    console.log('saving file...', req.body);
    const date = new Date();
    const createdFile = await model.Drawing.create({ fileName: date.toString(), point: req.body.point, user: req.body.id });
    res.locals.createdDrawing = createdFile;
    console.log('created', createdFile);
    return next();
  } catch (error) {
    return next({ log: `controller.saveFile ${error}`, message: `${error} Failed to create File` });
  }
}

controller.updateUser = async (req, res, next) => {
  try {
    const result = await model.User.findOneAndUpdate({ _id: req.body.id }, { "$push": { "drawings": res.locals.createdDrawing._id } });
    console.log(result);
    return next();
  } catch (error) {
    return next({ log: `controller.updateUser ${error}`, message: `${error} Failed to update user` });
  }
};

controller.loadFile = async (req, res, next) => {
  try {
    const result = await model.Drawing.findById(req.body.id);
    console.log('loaded file: ', result);
    res.locals.point = result.point;
    return next();
  } catch (error) {
    return next({ log: `controller.updateUser ${error}`, message: `${error} Failed to update user` });
  }
};

controller.postDrawing = async (req, res, next) => {
  try {
    console.log(req.body.image);
    console.log(req.body.user);
    const result = await model.Post.create({ image: req.body.image, user: req.body.user });
    console.log('created file: ', result);
    res.locals.createdPost = result;
    return next();
  } catch (error) {
    return next({ log: `controller.postDrawing ${error}`, message: `${error} Failed to post Art` });
  }
}

controller.deleteFile = async (req, res, next) => {
  try {
    console.log('id',req.body.id);
    console.log('user',req.body.user);
    const result = await model.Drawing.findByIdAndDelete(req.body.id);
    console.log('deleted file:', result);
    res.locals.deletedFile = result;
    return next();
  } catch (error) {
    return next({ log: `controller.deleteFile ${error}`, message: `${error} Failed to delete File` });
  }
}

controller.updateDelUser = async (req, res, next) => {
  try {
    console.log('here')
    console.log('delete', res.locals.deletedFile)
    const result = await model.User.findOneAndUpdate({ _id: req.body.user}, { "$pull": { "drawings": res.locals.deletedFile._id } });
    console.log(result);
    return next();
  } catch (error) {
    return next({ log: `controller.updateDelUser ${error}`, message: `${error} Failed to update deleted user` });
  }
}

module.exports = controller;
