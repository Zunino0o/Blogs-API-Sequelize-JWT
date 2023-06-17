const { BlogPost } = require('../models');

const createPost = async (post) => {
  if (!post) return { type: 'error', message: 'asd' };

  const newPost = await BlogPost.create(post);

  return { type: null, message: newPost };
};

module.exports = {
  createPost,
};
