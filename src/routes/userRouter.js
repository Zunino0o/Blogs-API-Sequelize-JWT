const { Router } = require('express');
const { userController } = require('../controllers');
const { 
    displayNameValidation, 
    emailValidation, 
    passwordValidation, 
} = require('../Middlewares/userValidation');
// const { checkToken, validateJwtToken } = require('../Middlewares/jwtValidation');

const userRouter = Router();
userRouter.post(
'/', 
displayNameValidation,
emailValidation,
passwordValidation, 
userController.createUser,
);

// userRouter.get('/', checkToken, validateJwtToken, userController.getAllUsers);
userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;