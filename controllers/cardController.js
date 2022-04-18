/* eslint-disable no-unused-vars */
const Card = require('../models/cardModel');

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
    .catch((err) => res.status(500).send({ message: err.message }));
};

// get all cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// delete card by _id
module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (!card) {
        res.send('Такой карточки не существует');
      }
      res.status(200).send({ data: card, message: 'Карточка удалена' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// like by
module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.send('Такой карточки не существует');
      }
      res.status(200).send({ data: card, message: 'Лайк' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// delete like by _id
module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.send('Такой карточки не существует');
      }
      res.status(200).send({ data: card, message: 'Лайк удален' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
