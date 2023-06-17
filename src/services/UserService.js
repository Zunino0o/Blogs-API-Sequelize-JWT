const { User } = require('../models');
const { getByEmail } = require('./LoginService');

// const HTTP_STATUS_BAD_REQ = 400;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_DUPLICATED_EMAIL = 409;

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  const payload = users.map((u) => u.dataValues);
  
  return { type: null, message: payload };
};

const createUser = async (user) => {
  const { email } = user;

  const findUser = await getByEmail(email);
  if (findUser) {
    return {
          type: HTTP_STATUS_DUPLICATED_EMAIL,
          message: 'User already registered',
        };
      }

  const newUser = await User.create(user);
  return {
    type: null,
    message: newUser,
  };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    return {
      type: HTTP_STATUS_NOT_FOUND,
      message: 'User does not exist',
    };
  }
  
  const payload = user.dataValues;

  return { type: null, message: payload };
};

module.exports = {
  getAll,
  createUser,
  getUserById,
};
