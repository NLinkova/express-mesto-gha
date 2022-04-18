/* eslint-disable no-unused-vars */
const User = require('../models/userModel');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
} = require('../constants');

// create user
// eslint-disable-next-line no-unused-vars
module.exports.registerUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(200).send({ data: user, message: 'Пользователь создан' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// get all users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(ERROR_CODE_INTERNAL).send({ message: err.message }));
};

// get user by user_id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Ошибка. Введен некорректный id пользователя' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такого пользователя не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// update user info by user_id
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(200).json({ data: user, message: 'Профиль обновлен' });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Ошибка. Введен некорректный id пользователя' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такого пользователя не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// update user avatar by user_id
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(200).send({ data: user, message: 'Аватар создан' });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_BAD_REQUEST) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Ошибка. Введен некорректный id пользователя' });
      } else if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send('Такого пользователя не существует');
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
