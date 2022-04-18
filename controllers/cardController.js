/* eslint-disable no-unused-vars */
const Card = require('../models/cardModel');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
} = require('../constants');

// create card
// eslint-disable-next-line no-unused-vars
module.exports.createCard = (req, res, next) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card, message: 'Карточка создана' });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такой карточки не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// get all cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такой карточки не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// delete card by _id
module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      res.status(200).send({ data: card, message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такой карточки не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// like
module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив
    { new: true },
  )
    .then((card) => {
      res.status(200).send({ data: card, message: 'Лайк' });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такой карточки не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// delete like by _id
module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      res.status(200).send({ data: card, message: 'Лайк удален' });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такой карточки не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
