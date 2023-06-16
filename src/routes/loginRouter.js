const { Router } = require('express');
const { loginController } = require('../controllers');
const { bodyValidations } = require('../Middlewares/loginValidation');

const loginRouter = Router();
loginRouter.post('/', bodyValidations, loginController.login);

module.exports = loginRouter;