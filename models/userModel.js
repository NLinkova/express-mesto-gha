const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate(avatar) {
      return /http(s)?:\/\/\S+[^\s]\.\S+/.test(avatar);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(email) {
      return validator.isEmail(email);
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized('Указан некорректный Email или пароль.');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new ErrorUnauthorized('Указан некорректный Email или пароль.');
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
