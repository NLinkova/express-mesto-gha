/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardController');

router.get('/', getCards);
router.delete('/:_id', deleteCard);
router.post('/', createCard);
router.put('/:_id/likes', putLike);
router.delete('/:_id/likes', deleteLike);

module.exports = router;
