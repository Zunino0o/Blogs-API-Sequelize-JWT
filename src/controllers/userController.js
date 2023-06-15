const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const HTTP_STATUS_CREATED = 201;

const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
    const { type, message } = await UserService.createUser(req.body);
    if (type) return res.status(type).json({ message });

    const token = jwt.sign({ data: message }, secret, {
        algorithm: 'HS256',
      });
    return res.status(HTTP_STATUS_CREATED).json({ token });
};

module.exports = {
    createUser,
  };