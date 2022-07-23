const { Router } = require('express');
const TOKEN = require('../middlewares/token');

const UserController = require('../controllers/user');

const User = Router();

User.post('/', UserController.createUser);

User.get('/', TOKEN, UserController.getAll);

module.exports = User; 