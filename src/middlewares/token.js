const Jwt = require('../services/jwt.service');
const httpStatus = require('../helpers/statusCode');

const token = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(httpStatus.badRequest).json({ message: 'Token not found' });
      }
      try {
       const validToken = Jwt.validateToken(authorization);
       req.user = validToken;
       next();
      } catch (err) {
        res.status(httpStatus.badRequest).json({ message: err.message });
      }
};

module.exports = token;