const HTTP_STATUS_BAD_REQ = 400;

const BAD_REQ_DISPLAYNAME = '"displayName" length must be at least 8 characters long';
const BAD_REQ_EMAIL = '"email" must be a valid email';
const BAD_REQ_PASSWORD = '"password" length must be at least 6 characters long';

const displayNameValidation = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length < 8) {
    return res
      .status(HTTP_STATUS_BAD_REQ)
      .json({ message: BAD_REQ_DISPLAYNAME });
  }
  next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  if (!email || !emailRegex) {
    return res.status(HTTP_STATUS_BAD_REQ).json({ message: BAD_REQ_EMAIL });
  }

  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(HTTP_STATUS_BAD_REQ).json({ message: BAD_REQ_PASSWORD });
  }

  next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
};
