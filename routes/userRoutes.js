const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:_id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    about: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/http(s)?:\/\/\S+[^\s]\.\S+/),
  }),
}), updateUserAvatar);

module.exports = router;
