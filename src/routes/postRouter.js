const { Router } = require('express');
const { postController } = require('../controllers');
const { checkToken } = require('../Middlewares/jwtValidation');

const postRouter = Router();

// REQ 12
postRouter.post(
  '/',
  checkToken,
  postController.createPost,
);

module.exports = postRouter;