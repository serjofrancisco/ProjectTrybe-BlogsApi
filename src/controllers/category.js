const categoryService = require('../services/category');
const httpStatus = require('../helpers/statusCode');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await categoryService.createCategory(name);
    res.status(httpStatus.created).json(result);
  } catch (err) {
    res.status(httpStatus[err.code]).json({ message: err.message });
  }
};

module.exports = { createCategory };