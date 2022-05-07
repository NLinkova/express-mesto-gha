/* eslint-disable no-unused-vars */

const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const ErrorConflict = require('../errors/ErrorConflict');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorInternalServer = require('../errors/ErrorInternalServer');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_UNAUTHORISED_REQUEST,
  ERROR_CODE_FORBINNED,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_CONFLICT_REQUEST,
  ERROR_CODE_INTERNAL,
} = require('../constants');

// eslint-disable-next-line no-unused-vars
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  // if (!validator.isEmail(email)) {
  //   res.status(ERROR_CODE_BAD_REQUEST).send({
  //     message: "Переданы некорректные данные при создании пользователя",
  //   });
  //   return;
  // }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict(`Пользователь с таким ${email} уже существует`);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ErrorBadRequest(
            'Переданы невалидные данные при создании пользователя',
          ),
        );
      } else if (err.code === 1100) {
        next(new ErrorConflict({ message: err.message }));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: 'd285e3dceed844f902650f40' },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(201).send({ message: 'Авторизация успешна', token });
    })
    .catch((err) => {
      if (err.message === 'IncorrectEmail') {
        next(new ErrorUnauthorized('Не правильный логин или пароль'));
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        next(new ErrorNotFound('User not found'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw (new ErrorNotFound('Нет пользователя с переданным id'));
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Невалидные данные'));
      } else {
        next(err);
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
        throw (new ErrorNotFound('Нет пользователя с переданным id'));
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Невалидные данные'));
      } else {
        next(err);
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
        throw (new ErrorNotFound('Нет пользователя с переданным id'));
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Невалидные данные'));
      } else {
        next(err);
      }
    });
};
