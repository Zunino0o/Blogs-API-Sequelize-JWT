const { LoginService } = require('../services');

const HTTP_STATUS_OK = 200;

const login = async (req, res) => {
    const { type, message } = LoginService.login(req.body);
    if (type) return res.status(type).json(message);

    return res.status(HTTP_STATUS_OK).json({ message });
};

module.exports = {
  login,
};
