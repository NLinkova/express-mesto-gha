const express = require("express");
const mongoose = require("mongoose");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/mestodb", {
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

app.use("/", require("./routes/userRoutes"));
// app.use('/cards', require('./routes/cardRotes'));
app.listen(PORT, console.log(`Server running on port ${PORT}`));
