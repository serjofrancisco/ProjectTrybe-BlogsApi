const { Router } = require('express');
const TOKEN = require('../middlewares/token');

const CategoryControler = require('../controllers/category');

const Category = Router();

Category.use(TOKEN);

Category.post('/', CategoryControler.createCategory);

Category.get('/', CategoryControler.getAll);
 
module.exports = Category; 