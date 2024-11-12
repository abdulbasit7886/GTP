const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    try {
      const task = await Task.create({ 
          userId: req.user._id, // This line ensures the user ID is saved
          title: req.body.title, 
          description: req.body.description 
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetches all tasks without filtering by user
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

  

exports.updateTask = async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { title, description, completed },
            { new: true }
        );
        if (!task) return res.status(404).send("Task not found");
        res.send("Task updated successfully");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!task) return res.status(404).send("Task not found");
        res.send("Task deleted successfully");
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
};
