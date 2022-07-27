const { Router } = require('express');
const TOKEN = require('../middlewares/token');

const PostController = require('../controllers/post');

const Post = Router();

Post.use(TOKEN);

Post.post('/', PostController.createPost);

Post.get('/', PostController.getAll);

Post.get('/search', PostController.searchPost);

Post.put('/:id', PostController.editPost);

Post.get('/:id', PostController.getById);

Post.delete('/:id', PostController.removePost);

module.exports = Post; 