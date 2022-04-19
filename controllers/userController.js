/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
} = require('../constants');

// eslint-disable-next-line no-unused-vars
module.exports.registerUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании пользователя',
          });
      } else {
        res
          .status(ERROR_CODE_INTERNAL)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(ERROR_CODE_INTERNAL).send({ message: err.message }));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Нет пользователя с переданным id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Ошибка. Введен некорректный id пользователя' });
      } else {
        res
          .status(ERROR_CODE_INTERNAL)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Нет пользователя с переданным id' });
      } else {
        res.status(200).json({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(ERROR_CODE_INTERNAL)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: 'Нет пользователя с переданным id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(ERROR_CODE_INTERNAL)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
