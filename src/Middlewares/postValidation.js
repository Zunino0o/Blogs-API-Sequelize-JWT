const HTTP_STATUS_BAD_REQ = 400;

const OBRIGATORY_FIELDS = 'Some required fields are missing';

const bodyValidations = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const isBodyInvalid = !title || !content || !categoryIds;
  if (isBodyInvalid) {
    return res.status(HTTP_STATUS_BAD_REQ).json({
      message: OBRIGATORY_FIELDS,
    });
  }

  next();
};

module.exports = {
  bodyValidations,
};
