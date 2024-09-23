const Todo = require("../models/modelTodo");

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    res.redirect("/todos");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    await Todo.findByIdAndUpdate(id, {
      title,
      description,
      completed: completed === "on",
    });
    res.redirect("/todos");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.redirect("/todos");
  } catch (err) {
    res.status(500).send(err);
  }
};
