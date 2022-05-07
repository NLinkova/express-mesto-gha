const router = require('express').Router();
const { cardValidator, cardIdValidator } = require('../middlewares/cardValidator');
const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardController');

router.get('/', getCards);
router.delete('/:_id', cardIdValidator, deleteCard);
router.post('/', cardValidator, createCard);
router.put('/:_id/likes', cardIdValidator, putLike);
router.delete('/:_id/likes', cardIdValidator, deleteLike);

module.exports = router;
