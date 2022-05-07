const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

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

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(auth);
app.use(errorHandler);
// app.use((req, res, next) => {
//   req.user = {
//     _id: "625cd7b9c2279c18ff21dc1e",
//   };

//   next();
// });

// routes
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', require('./routes/userRoutes'));
app.use('/cards', require('./routes/cardRoutes'));

app.use((req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
