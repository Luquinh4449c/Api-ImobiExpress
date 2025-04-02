import express from 'express';
import upload from './middlewares/upload.js';
import UserController from './controllers/UserController.js';
import ImobiController from './controllers/ImobiController.js';
import MessageController from './controllers/MessageController.js';
import SessionController from './controllers/SessionController.js';

const router = express.Router();


router.post('/uploads', upload.single('file'), (req, res) => {
    return res.json({ file: req.file });
  });

  router.post('/creatusers', UserController.createUser);
  router.get('/listusers', UserController.findAllUser);
  router.get('/listusers/:userId', UserController.findAllUser);
  router.post('/session', SessionController.createSession);
  router.post('/createimobi', upload.single("thumb"), ImobiController.createImobi);
  router.get('/listimobi', ImobiController.findAllImobi);
  router.get('/listimobi/:slug', ImobiController.findImobi);
  router.post('/createmessage', MessageController.createMessage);
  router.get('/listmessage/:id', MessageController.findMessage);

  export { router };
  