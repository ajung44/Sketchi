const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/', controller.loginController, (req, res) => {
  res.status(200).json({ ...res.locals });
});

router.post('/signup', controller.signupController, (req, res) => res.status(200).json(res.locals.newUser));

router.post('/drawings', controller.getFiles, controller.fileToDrawings, (req, res) => res.status(200).json(res.locals.drawings));

router.post('/save', controller.saveFile, controller.updateUser, (req, res) => res.status(200).json(res.locals.createdDrawing));

router.post('/loadDrawing', controller.loadFile, (req, res) => res.status(200).json(res.locals.point));

router.post('/postDrawing', controller.postDrawing, (req, res) => res.status(200).json(res.locals.createdPost));

router.delete('/deleteFile', controller.deleteFile, controller.updateDelUser, (req, res) => res.status(200).json(res.locals.deletedFile));

router.get('/postings', controller.getPosts, (req, res) => res.status(200).json(res.locals.postings));

module.exports = router;
