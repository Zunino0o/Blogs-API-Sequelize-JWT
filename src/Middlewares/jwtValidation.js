// const jwt = require('jsonwebtoken');
const { decodeToken } = require('../utils/generateToken');

const HTTP_STATUS_UNAUTHORIZED = 401;
const MISSING_TOKEN_MESSAGE = { message: 'Token not found' };
const PORBLEMATIC_TOKEN_MESSAGE = { message: 'Expired or invalid token' };

// const TOKEN_SECRET = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json(MISSING_TOKEN_MESSAGE);
  }

  try {
    const decoded = decodeToken(authorization);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json(PORBLEMATIC_TOKEN_MESSAGE);
  }
};

// const validateJwtToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   const decoded = decodeToken(token);
//   if (!decoded.id) {
//     return res.status(HTTP_STATUS_UNAUTHORIZED).json(PORBLEMATIC_TOKEN_MESSAGE);
//   }
//   next();
// };

module.exports = {
  checkToken,
  // validateJwtToken,
};
