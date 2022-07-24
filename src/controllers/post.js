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

module.exports = { createPost };