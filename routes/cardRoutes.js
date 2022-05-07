const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardController');

router.get('/', getCards);
router.delete('/:_id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/http(s)?:\/\/\S+[^\s]\.\S+/),
  }),
}), createCard);
router.put('/:_id/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), putLike);
router.delete('/:_id/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteLike);

module.exports = router;
