const Joi = require('joi');
const { Category } = require('../database/models');

const schema = Joi.object({
    name: Joi.string().required(),
});

const createCategory = async (nome) => {
    const { error } = schema.validate(nome);

    if (error) {
        const err = new Error(error.message);
        err.code = 'badRequest';
        throw err;  
    }

    const category = await Category.create({ nome });
    const { id, name } = category.dataValues;

    return {
        id,
        name,
    };
};

module.exports = { createCategory };