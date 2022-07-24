const postService = require('../services/post');
const httpStatus = require('../helpers/statusCode');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
   const email = req.user;
   console.log(req);
   try {
       const result = await postService.createPost(title, content, categoryIds, email);
       res.status(httpStatus.created).json(result);
   } catch (err) {
    res.status(httpStatus[err.code]).json({ message: err.message });
   }
};

const getAll = async (_req, res) => {
        const result = await postService.getAll();
        res.status(httpStatus.success).json(result);
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await postService.getById(id);
        res.status(httpStatus.success).json(result);
    } catch (err) {
        res.status(httpStatus[err.code]).json({ message: err.message });  
    }
};

module.exports = { createPost, getAll, getById };