const { Router } = require('express');
const TOKEN = require('../middlewares/token');

const PostController = require('../controllers/post');

const Post = Router();

Post.use(TOKEN);

Post.post('/', PostController.createPost);

module.exports = Post; 