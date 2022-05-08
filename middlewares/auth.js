const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

// eslint-disable-next-line no-unused-vars
const { JWT_SECRET = 'dev-key' } = process.env;
const extractBearerHeader = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new ErrorUnauthorized('Необходима авторизация'));
  }

  const token = extractBearerHeader(authorization);
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
