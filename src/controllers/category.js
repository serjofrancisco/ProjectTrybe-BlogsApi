const categoryService = require('../services/category');
const httpStatus = require('../helpers/statusCode');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await categoryService.createCategory(name);
    console.log(result);
    res.status(httpStatus.created).json(result);
  } catch (err) {
    res.status(httpStatus[err.code]).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
    const categories = await categoryService.getAll();
    res.status(httpStatus.success).json(categories);
};

module.exports = { createCategory, getAll };