const { compile } = require("ejs");
const mongoose = require("mongoose");
const express = require("express");


const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/todo-list")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error: ", err));

const todoRouters=require('./routes/todo.js')
  app.use('/todos', todoRouters);
  
  app.listen(PORT, () => console.log(`Server is runing on http://localhost:${PORT}`));