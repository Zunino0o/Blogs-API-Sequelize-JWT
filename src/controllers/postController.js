const { PostService } = require('../services');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;

const getAllPosts = async (_req, res) => {
  const { type, message } = await PostService.getAllPosts();
  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

const createPost = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await PostService.createPost(req.body, id);
  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_CREATED).json(message);
};

const getPostsById = async (req, res) => {
  const { type, message } = await PostService.getPostsById(req.params.id);
  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

const updatePostById = async (req, res) => {
  const { type, message } = await PostService.updatePostById(req.params.id, req.body, req.user.id);
  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsById,
  updatePostById,
};
