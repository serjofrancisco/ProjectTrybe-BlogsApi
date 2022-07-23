const { Router } = require('express');

const UserController = require('../controllers/user');

const User = Router();

User.post('/', UserController.createUser);

module.exports = User; 