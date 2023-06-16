const { UserService } = require('../services');
const generateToken = require('../utils/generateToken');

const HTTP_STATUS_CREATED = 201;

const createUser = async (req, res) => {
    const { type, message } = await UserService.createUser(req.body);
    if (type) return res.status(type).json({ message });

    const token = generateToken(message);

    return res.status(HTTP_STATUS_CREATED).json({ token });
};

module.exports = {
    createUser,
  };