const { Router } = require('express');
const { userController } = require('../controllers');
const {
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('../Middlewares/userValidation');
const {
  checkToken,
//   validateJwtToken,
} = require('../Middlewares/jwtValidation');

const userRouter = Router();

// REQ 04
userRouter.post(
  '/',
  displayNameValidation,
  emailValidation,
  passwordValidation,
  userController.createUser,
);

// REQ 05
userRouter.get('/', checkToken, userController.getAllUsers);

// REQ 06
userRouter.get('/:id', checkToken, userController.getUserById);

module.exports = userRouter;
