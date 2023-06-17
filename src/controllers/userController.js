const { UserService } = require('../services');
const { generateToken } = require('../utils/generateToken');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;

const createUser = async (req, res) => {
    const { type, message } = await UserService.createUser(req.body);
    if (type) return res.status(type).json({ message });

    const token = generateToken(message);

    return res.status(HTTP_STATUS_CREATED).json({ token });
};

const getAllUsers = async (_req, res) => {
    const { type, message } = await UserService.getAll();
    if (type) return res.status(type).json({ message });

    return res.status(HTTP_STATUS_OK).json(message);
};

const getUserById = async (req, res) => {
    const { type, message } = await UserService.getUserById(req.params.id);
    if (type) return res.status(type).json({ message });

    return res.status(HTTP_STATUS_OK).json(message);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
  };