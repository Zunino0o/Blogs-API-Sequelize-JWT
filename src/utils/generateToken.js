const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '1d',
};

/* Recebe um objeto */
const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

/* Recebe uma string */
const decodeToken = (token) => jwt.verify(token, TOKEN_SECRET);

module.exports = {
  generateToken,
  decodeToken,
};
