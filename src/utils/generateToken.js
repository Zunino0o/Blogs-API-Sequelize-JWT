const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

/* Recebe um objeto */
const generateToken = (payload) => {
    const token = jwt.sign({ data: payload }, secret, {
        algorithm: 'HS256',
      });
      return token;
};

module.exports = generateToken;