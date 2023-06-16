const { User } = require('../models');
const { getByEmail } = require('./LoginService');

// const HTTP_STATUS_BAD_REQ = 400;
const HTTP_STATUS_DUPLICATED_EMAIL = 409;

const getAll = async () => {
  const users = await User.findAll();

  return { type: null, message: users };
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

module.exports = {
  getAll,
  createUser,
};
