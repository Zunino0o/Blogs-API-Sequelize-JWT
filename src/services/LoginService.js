const { User } = require("../models");
const { generateToken } = require("../utils/generateToken");

const HTTP_STATUS_BAD_REQ = 400;

const getByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const login = async (payload) => {
  const { email, password } = payload;
  const isBodyValid = email && password;
  if (!isBodyValid) {
    return {
      type: HTTP_STATUS_BAD_REQ,
      message: "Some required fields are missing",
    };
  }
  const user = await getByEmail(email);
  if (!user || user.password !== password) {
    return {
      type: HTTP_STATUS_BAD_REQ,
      message: "Invalid fields",
    };
  }
  const token = generateToken({
    id: user.id,
  });
  return {
    type: null,
    message: token,
  };
};

module.exports = {
  getByEmail,
  login,
};
