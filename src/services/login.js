const Joi = require('joi');
const Jwt = require('./jwt.service');
const { User } = require('../database/models');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const login = async (email, password) => {
    const { error } = schema.validate({ email, password });
  
    if (error) {
      const err = new Error('Some required fields are missing');
      err.code = 'badRequest';
      throw err;
    }
    const existEmail = await User.findOne({ where: { email } });
  console.log(existEmail); 
    if (!existEmail) {
      const err = new Error('Invalid fields');
      err.code = 'badRequest';
      throw err;
    } 
  
    const token = Jwt.createToken(email);
  
    return token;
  };

module.exports = login;
