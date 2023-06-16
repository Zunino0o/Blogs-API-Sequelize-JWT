const { decodeToken } = require('../utils/generateToken');

const HTTP_STATUS_UNAUTHORIZED = 401;
const MISSING_TOKEN_MESSAGE = { message: 'Token not found' };
const PORBLEMATIC_TOKEN_MESSAGE = { message: 'Expired or invalid token' };

const validateJwt = (req, res, next) => {
  const { authorization: token } = req.headers;

  console.log(token);

  if (!token) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json(MISSING_TOKEN_MESSAGE);
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json(PORBLEMATIC_TOKEN_MESSAGE);
  }
  next();
};

module.exports = {
  validateJwt,
};
