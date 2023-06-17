const { Category } = require('../models');

const HTTP_STATUS_BAD_REQ = 400;

const createCategory = async (category) => {
    const { name } = category;
    if (!name || name.length === 0) {
        return {
            type: HTTP_STATUS_BAD_REQ,
            message: '"name" is required',
        };
    }

    const newCategory = await Category.create(category);
    return {
        type: null,
        message: newCategory,
    };
};

module.exports = {
    createCategory,
};