/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardController');

router.get('/cards', getCards);
router.delete('/cards/:_id', deleteCard);
router.post('/cards', createCard);
router.put('/cards/:_id/likes', putLike);
router.delete('/cards/:_id/likes', deleteLike);

module.exports = router;
