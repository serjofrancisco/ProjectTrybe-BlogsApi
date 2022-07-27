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
  res.status(httpStatus.success).json(users);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    res.status(httpStatus.success).json(user);
  } catch (err) { 
    res.status(httpStatus[err.code]).json({ message: err.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const email = req.user;
    await userService.removeUser(email);
    res.status(httpStatus.noContent).end();
  } catch (err) {
    if (!err.code) {
      return res.status(500).json({ message: err.message });
    }
    res.status(httpStatus[err.code]).json({ message: err.message });
  }
};

module.exports = { createUser, getAll, getById, removeUser };