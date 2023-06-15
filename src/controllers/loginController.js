const jwt = require('jsonwebtoken');
const { UserService } = require('../services');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_BAD_REQ = 400;

const secret = process.env.JWT_SECRET;

const isBodyValid = (email, password) => email && password;

const login = async (req, res) => {
//   try {
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

    const token = jwt.sign({ data: { id: user.id } }, secret, {
      algorithm: 'HS256',
    });

    return res.status(HTTP_STATUS_OK).json({ token });
//   } catch (e) {
//     return res.status(500).json({ message: 'Erro interno', error: e.message });
//   }
};

module.exports = {
  login,
};
