const { Router } = require('express');
const { postController } = require('../controllers');
const { checkToken } = require('../Middlewares/jwtValidation');
const { bodyValidations } = require('../Middlewares/postValidation');
const { updateValidation } = require('../Middlewares/updateValidation');

const postRouter = Router();

// REQ 12
postRouter.post(
  '/',
  checkToken,
  bodyValidations,
  postController.createPost,
);

// REQ 13
postRouter.get(
  '/',
  checkToken,
  postController.getAllPosts,
);

// REQ 14
postRouter.get(
  '/:id',
  checkToken,
  postController.getPostsById,
);

// REQ 15
postRouter.put(
  '/:id',
  checkToken,
  updateValidation,
  postController.updatePostById,
);

module.exports = postRouter;