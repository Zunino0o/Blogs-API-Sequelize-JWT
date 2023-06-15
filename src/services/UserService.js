const { User, BlogPost } = require('../models');

// const HTTP_STATUS_BAD_REQ = 400;
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
  getByEmail,
  createUser,
};
