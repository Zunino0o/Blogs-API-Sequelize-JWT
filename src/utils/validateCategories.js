const { Category } = require('../models');

const validateCategories = async (idsArr) => {
  if (idsArr.length === 0) return false;
  await idsArr.forEach((id) => {
    const search = Category.findOne({ where: { id } });
    if (!search) {
      return false;
    }
  });
  return true;
};

module.exports = validateCategories;
