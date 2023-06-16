const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

/* Recebe um objeto */
const generateToken = (payload) => jwt.sign(payload, secret);

const decodeToken = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  decodeToken,
};
