const { Router } = require('express');
const { postController } = require('../controllers');
const { checkToken } = require('../Middlewares/jwtValidation');
// const { bodyValidations } = require('../Middlewares/postValidation');

const postRouter = Router();

// REQ 12
postRouter.post(
  '/',
  checkToken,
  // bodyValidations,
  postController.createPost,
);

module.exports = postRouter;