const { UserService } = require('../services');
const generateToken = require('../utils/generateToken');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQ = 400;

const isBodyValid = (email, password) => email && password;

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!isBodyValid(email, password)) {
      return res.status(HTTP_STATUS_BAD_REQ).json({
        message: 'Some required fields are missing',
      });
    }

    const user = await UserService.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(HTTP_STATUS_BAD_REQ).json({
        message: 'Invalid fields',
      });
    }
    
    const token = generateToken({ id: user.id });

    return res.status(HTTP_STATUS_OK).json({ token });
};

module.exports = {
  login,
};
