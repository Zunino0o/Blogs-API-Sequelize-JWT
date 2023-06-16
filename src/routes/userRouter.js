const { Router } = require('express');
const { userController } = require('../controllers');
const { 
    displayNameValidation, 
    emailValidation, 
    passwordValidation, 
} = require('../Middlewares/userValidation');
const { validateJwt } = require('../Middlewares/jwtValidation');

const userRouter = Router();
userRouter.post(
'/', 
displayNameValidation,
emailValidation,
passwordValidation, 
userController.createUser,
);

userRouter.get('/', validateJwt, userController.getAllUsers);

module.exports = userRouter;