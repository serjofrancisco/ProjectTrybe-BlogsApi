const { Router } = require('express');

const loginController = require('../controllers/login');

const Login = Router();

Login.post('/', loginController);

module.exports = Login; 