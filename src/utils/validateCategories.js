const { Category } = require('../models');

const validateCategories = async (idsArr) => {
  const response = await Category.findAll({ where: { id: idsArr } });

  return response.length === idsArr.length;
};

module.exports = validateCategories;
