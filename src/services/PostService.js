const { BlogPost, PostCategory, User, Category } = require('../models');
const validateCategories = require('../utils/validateCategories');

const HTTP_STATUS_BAD_REQ = 400;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_NOT_FOUND = 404;

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: posts };
};

const createPost = async (post, userId) => {
  const check = await validateCategories(post.categoryIds);
  if (!check) {
    return {
      type: HTTP_STATUS_BAD_REQ,
      message: 'one or more "categoryIds" not found',
    };
  }
  const newPost = await BlogPost.create({
    title: post.title,
    content: post.content,
    userId });
  await PostCategory.bulkCreate(
    post.categoryIds.map((id) => ({
      postId: newPost.id,
      categoryId: id,
    })),
  );
  return { type: null, message: newPost };
};

const getPostsById = async (postId) => {
  const posts = await BlogPost.findByPk(postId, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!posts) { return { type: HTTP_STATUS_NOT_FOUND, message: 'Post does not exist' }; }

  return { type: null, message: posts.dataValues };
};

const updatePostById = async (postId, payload, userId) => {
  const findPost = await BlogPost.findByPk(postId);
  if (!findPost) { return { type: HTTP_STATUS_NOT_FOUND, message: 'Post does not exist' }; }

  if (findPost.dataValues.userId !== userId) {
    return { type: HTTP_STATUS_UNAUTHORIZED, message: 'Unauthorized user' };
  }

  await BlogPost.update(payload, { where: { id: postId } });

  const updatedPost = await BlogPost.findByPk(postId, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: updatedPost.dataValues };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsById,
  updatePostById,
};
