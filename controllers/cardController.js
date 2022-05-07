const Card = require('../models/cardModel');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ErrorBadRequest(
            'Переданы невалидные данные при создании карточки',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound('Такой карточки не существует');
    })
    .then((user) => {
      if (user.owner.toString() !== req.user._id) {
        throw new ErrorForbidden('Вы не можете удалять чужие карточки');
      }
    });
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Такой карточки не существует');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Такой карточки не существует');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
