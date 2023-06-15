const { User, BlogPost } = require('../models');

const HTTP_STATUS_BAD_REQ = 400;
const HTTP_STATUS_DUPLICATED_EMAIL = 409;

const getAll = async () => {
  const users = await User.findAll({
    include: {
      model: BlogPost,
      as: 'posts',
    },
  });

  return users;
};

const getByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const createUser = async (user) => {
  const { displayName, email, password } = user;

  if (!displayName || displayName.length < 8) {
    return {
      type: HTTP_STATUS_BAD_REQ,
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  if (!email || !emailRegex) {
    return {
      type: HTTP_STATUS_BAD_REQ,
      message: '"email" must be a valid email',
    };
  }

  if (!password || password.length < 6) {
    return {
      type: HTTP_STATUS_BAD_REQ,
      message: '"password" length must be at least 6 characters long',
    };
  }

  const findUser = getByEmail(email);
  if (findUser) {
    return {
          type: HTTP_STATUS_DUPLICATED_EMAIL,
          message: '"email" already exists',
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
  getByEmail,
  createUser,
};
