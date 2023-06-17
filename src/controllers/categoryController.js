const { CategoryService } = require('../services');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;

const createCategory = async (req, res) => {
    const { type, message } = await CategoryService.createCategory(req.body);
    if (type) return res.status(type).json({ message });

    return res.status(HTTP_STATUS_CREATED).json(message);
};

const getAllCategories = async (_req, res) => {
    const { type, message } = await CategoryService.getAllCategories();
    if (type) return res.status(type).json({ message });

    return res.status(HTTP_STATUS_OK).json(message);
};

module.exports = { 
    createCategory,
    getAllCategories,
};