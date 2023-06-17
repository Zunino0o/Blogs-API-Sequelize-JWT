// const jwt = require('jsonwebtoken');
const { decodeToken } = require('../utils/generateToken');

const HTTP_STATUS_UNAUTHORIZED = 401;
const MISSING_TOKEN_MESSAGE = { message: 'Token not found' };
const PORBLEMATIC_TOKEN_MESSAGE = { message: 'Expired or invalid token' };

// const TOKEN_SECRET = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  if (!authorization) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json(MISSING_TOKEN_MESSAGE);
  }

  next();
};

const validateJwtToken = (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = decodeToken(authorization);
  if (!decoded) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json(PORBLEMATIC_TOKEN_MESSAGE);
  }
  next();
};

module.exports = {
  checkToken,
  validateJwtToken,
};
