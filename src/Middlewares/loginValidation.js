const HTTP_STATUS_BAD_REQ = 400;

const OBRIGATORY_FIELDS = 'Some required fields are missing';

const bodyValidations = (req, res, next) => {
  const { email, password } = req.body;
 
  const isBodyInvalid = !email || !password;
  if (isBodyInvalid) {
    return res
      .status(HTTP_STATUS_BAD_REQ)
      .json({ message: OBRIGATORY_FIELDS });
  }
  next();
};

module.exports = { bodyValidations };
