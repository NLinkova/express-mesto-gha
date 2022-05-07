const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// const ErrorNotFound = require('./errors/ErrorNotFound');
// const { cors } = require('./middlewares/cors');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// app.use(cors());

// app.use((req, res, next) => {
//   next(new ErrorNotFound('Not found'));
// });
// app.use((req, res, next) => {
//   req.user = {
//     _id: "625cd7b9c2279c18ff21dc1e",
//   };

//   next();
// });

// routes
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  }),
}), createUser);
// authorization route
app.use(auth);

app.use('/users', require('./routes/userRoutes'));
app.use('/cards', require('./routes/cardRoutes'));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

// подключаемся к серверу mongo
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};
connectDB();

app.listen(PORT, console.log(`Server running on port ${PORT}`));
