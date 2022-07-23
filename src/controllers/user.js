const userService = require('../services/user');
const httpStatus = require('../helpers/statusCode');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const result = await userService.createUser(displayName, email, password, image);
    res.status(httpStatus.created).json({ token: result });
  } catch (err) {
    res.status(httpStatus[err.code]).json({ message: err.message });
  }
};
const getAll = async (_req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

module.exports = { createUser, getAll };