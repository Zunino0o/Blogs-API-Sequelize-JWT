const { PostService } = require('../services');

const HTTP_STATUS_CREATED = 201;

const createPost = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await PostService.createPost(req.body, id);
  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_CREATED).json(message);
};

module.exports = {
  createPost,
};
