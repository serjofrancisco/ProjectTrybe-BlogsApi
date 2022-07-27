const postService = require('../services/post');
const httpStatus = require('../helpers/statusCode');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
   const email = req.user;
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

const editPost = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const email = req.user;
    try {
        const result = await postService.editPost(title, content, id, email);
        res.status(httpStatus.success).json(result);
    } catch (err) {
        res.status(httpStatus[err.code]).json({ message: err.message }); 
    }
};

const removePost = async (req, res) => {
    const { id } = req.params;
    const email = req.user;
    try {
      await postService.removePost(id, email);
      res.status(httpStatus.noContent).end();
} catch (err) {
    if (!err.code) {
       return res.status(500).json({ message: err.message });
    }
    res.status(httpStatus[err.code]).json({ message: err.message });
}
};

const searchPost = async (req, res) => {
    const { q } = req.query;
    try {
        const result = await postService.searchPost(q);
        res.status(httpStatus.success).json(result);
    } catch (err) {
        if (!err.code) {
            return res.status(500).json({ message: err.message });
         }
         res.status(httpStatus[err.code]).json({ message: err.message });
    }
};

module.exports = { createPost, getAll, getById, editPost, removePost, searchPost };