const HTTP_STATUS_BAD_REQ = 400;

const MISSING_FIELDS_MESSAGE = { message: 'Some required fields are missing' };

const updateValidation = async (req, res, next) => {
  const { title, content } = req.body;
  const isBodyInvalid = !title || !content;
  if (isBodyInvalid) return res.status(HTTP_STATUS_BAD_REQ).json(MISSING_FIELDS_MESSAGE);
  next();
};

module.exports = {
  updateValidation,
};
