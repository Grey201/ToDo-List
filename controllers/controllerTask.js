const Task = require("../models/task");

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('index', {tasks});
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.createTask = async (req, res) => {
    
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        try {
        await newTask.save();
        res.redirect("/tasks");
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.updateTask = async (req, res) => {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        try {
        await Task.findByIdAndUpdate(
            id,
            { title, description, completed: completed === "on" },
        );
        res.redirect("/tasks");
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.deleteTask = async (req, res) => {
        const { id } = req.params;
        try {
        await Task.findByIdAndDelete(id);
        res.redirect("/tasks");
    } catch (err) {
        res.status(500).send(err);
    }
}