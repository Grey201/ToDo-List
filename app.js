require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "your-fallback-mongodb-uri";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
    process.exit(1); //завершает процесс подключения к MongoDB
  });

app.set("view engine", "ejs"); //выполняет настройку движка шаблонов ejs
app.set('views', path.join(__dirname, 'views')); //указывает путь к папке с шаблонами
app.use(bodyParser.urlencoded({ extended: true })); //сообщает Express, что нужно использовать bodyParser
app.use(methodOverride("_method")); //сообщает Express, что нужно использовать methodOverride
app.use(express.static(path.join(__dirname, "public"))); //создает абсалютный путь к папке  public

const todoRouters = require("./routes/todo.js");
app.use("/todos", todoRouters);

app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.listen(PORT, () =>
  console.log(`Server is runing on http://localhost:${PORT}`)
);
