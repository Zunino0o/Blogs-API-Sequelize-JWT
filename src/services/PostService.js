const { BlogPost, PostCategory } = require('../models');
const validateCategories = require('../utils/validateCategories');

const HTTP_STATUS_BAD_REQ = 400;

const createPost = async (post, userId) => {
  const check = await validateCategories(post.categoryIds);
  if (!check) {
 return {
      type: HTTP_STATUS_BAD_REQ,
      message: 'one or more "categoryIds" not found',
    }; 
}

  const newPost = await BlogPost.create({ title: post.title, content: post.content, userId });

  await PostCategory.bulkCreate(post.categoryIds.map((id) => ({
    postId: newPost.id,
    categoryId: id,
  })));
  return { type: null, message: newPost };
};

module.exports = {
  createPost,
};
