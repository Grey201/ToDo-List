const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
mongoose
  .connect("mongodb://localhost:27017/todo-list")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error: ", err));

const taskRoutes = require("./routes/task");
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
