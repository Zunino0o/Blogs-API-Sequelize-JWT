const { LoginService } = require('../services');

const HTTP_STATUS_OK = 200;

const login = async (req, res) => {
    const { type, message } = await LoginService.login(req.body);
    if (type) return res.status(type).json({ message });

    return res.status(HTTP_STATUS_OK).json({ token: message });
};

module.exports = {
  login,
};
