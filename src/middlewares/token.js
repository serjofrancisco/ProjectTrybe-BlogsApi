const Jwt = require('../services/jwt.service');

const token = (req) => {
    const { authorization } = req.headers;
    if (!authorization) {
        const err = new Error('Token not found');
        err.code = 'Unauthorized';
        throw err;
      }
      const validToken = Jwt.validateToken(authorization);
      req.user = validToken;
};

module.exports = token;