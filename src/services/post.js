const Sequelize = require('sequelize');
const Joi = require('joi');
const { User, Category, BlogPost, PostCategory } = require('../database/models');
const config = require('../database/config/config');
// const Jwt = require('./jwt.service');
const sequelize = new Sequelize(config.development);

const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).min(1),
  });

const errorFunction = (code, message) => {
    const err = new Error(message);
    err.code = code;
    throw err; 
};

const format = (object) => ({
    id: object.id,
    title: object.title,
    content: object.content,
    userId: object.userId,
    updated: object.updatedAt,
    published: object.createdAt,
  });

const createPost = async (title, content, categoryIds, user) => {
    const { error } = schema.validate({ title, content, categoryIds });

    if (error) errorFunction('badRequest', 'Some required fields are missing'); 
            
    const t = await sequelize.transaction();
    try {
        const { id } = await User.findOne({ where: { email: user } }, { transaction: t });
     await Category
        .findAndCountAll({ where: { id: categoryIds } }, { transaction: t });
         
        const post = await BlogPost.create({ title, content, userId: id }, { transaction: t });
        await Promise.all(categoryIds.map((item) => PostCategory
        .create({ postId: post.id, categoryId: item }, { transaction: t })));
            await t.commit();
            const result = format(post);
            
            return result;
    } catch (err) {
        await t.rollback();
        errorFunction('badRequest', '"categoryIds" not found');
    }
}; 

const getAll = async () => {
    const posts = await BlogPost.findAll({
        include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
      });
      return posts;
};

const getById = async (id) => {
    const post = await BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
          ],
      });

      if (!post) errorFunction('notFound', 'Post does not exist');
      return post;
};

module.exports = { createPost, getAll, getById };