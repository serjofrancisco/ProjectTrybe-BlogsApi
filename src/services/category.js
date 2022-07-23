// const Joi = require('joi');
const { Category } = require('../database/models');

// const schema = Joi.object({
//     name: Joi.string().required(),
// });

const createCategory = async (name) => {
    if (!name) {
        const err = new Error('"name" is required');
        err.code = 'badRequest';
        throw err;  
    }

    const category = await Category.create({ name });
    const { id } = category.dataValues;

    return {
        id,
        name,
    };
};
 
const getAll = async () => {
    const categories = await Category.findAll();
    return categories;
};

module.exports = { createCategory, getAll };