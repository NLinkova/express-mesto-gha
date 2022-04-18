/* eslint-disable no-unused-vars */
const User = require('../models/userModel');

// create user
// eslint-disable-next-line no-unused-vars
module.exports.registerUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user, message: 'Пользователь создан' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// get all users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// get user by user_id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        res.send('Такого пользователя не существует');
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// update user info by user_id
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user._id) {
        res.send('Такого пользователя не существует');
      }
      res.status(200).send({ data: user, message: 'Профиль обновлен' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// update user avatar by user_id
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user._id) {
        res.send('Такого пользователя не существует');
      }
      res.status(200).send({ data: user, message: 'Аватар создан' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
