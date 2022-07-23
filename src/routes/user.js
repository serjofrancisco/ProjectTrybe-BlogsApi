const { Router } = require('express');
const TOKEN = require('../middlewares/token');

const UserController = require('../controllers/user');

const User = Router();

User.post('/', UserController.createUser);
 
User.use(TOKEN);

User.get('/', UserController.getAll);

User.get('/:id', UserController.getById);

module.exports = User; 