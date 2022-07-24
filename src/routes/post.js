const { Router } = require('express');
const TOKEN = require('../middlewares/token');

const PostController = require('../controllers/post');

const Post = Router();

Post.use(TOKEN);

Post.post('/', PostController.createPost);

Post.get('/', PostController.getAll);

Post.get('/:id', PostController.getById);

module.exports = Post; 