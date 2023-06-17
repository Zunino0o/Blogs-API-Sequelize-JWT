const { Router } = require('express');
const { categoryController } = require('../controllers');
const { checkToken } = require('../Middlewares/jwtValidation');

const categoryRouter = Router();

// REQ 08
categoryRouter.post('/', checkToken, categoryController.createCategory);

module.exports = categoryRouter;
