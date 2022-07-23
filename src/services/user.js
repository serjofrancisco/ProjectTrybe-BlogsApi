const Joi = require('joi');
const { User } = require('../database/models');
const Jwt = require('./jwt.service');

const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  });
  
const createUser = async (displayName, email, password, image) => {
    const { error } = schema.validate({ displayName, email, password, image });

    if (error) {
        const err = new Error(error.message);
        err.code = 'badRequest';
        throw err;  
    }

    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      const err = new Error('User already registered');
      err.code = 'conflict';
      throw err;
    }
    
    await User.create({ displayName, email, password, image });
    
    const token = Jwt.createToken(email);

    return token;
};

const getAll = async () => {
    const allUsers = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
      });
      return allUsers;
};

const getById = async (id) => {
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    if (!user) {
        const err = new Error('User does not exist');
        err.code = 'notFound';
        throw err;
    }
    return user;
};

module.exports = { createUser, getAll, getById };
