const { Router } = require('express');
const TOKEN = require('../middlewares/token');

const CategoryControler = require('../controllers/category');

const Category = Router();

Category.use(TOKEN);

Category.post('/', CategoryControler.createCategory);
 
module.exports = Category; 