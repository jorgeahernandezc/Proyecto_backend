// controllers/userController.js
const Task = require('../db/models/taskmodel');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth,async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tasks.', error: error.message });
    }
  });

router.post('/', auth,async (req, res) => {
    try {
      const { title, description,userId } = req.body;
      const task = new Task({ title, description,userId});
      await task.save();
      res.status(201).json({ message: 'Task created successfully.', task });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create task.', error: error.message });
    }
  });

router.put('/:id', auth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.json({ message: 'Task updated successfully.', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task.', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => { 
    try {
      const taskId = req.params.id;
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found.' });
      }
      res.json({ message: 'Task deleted successfully.', task: deletedTask });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete task.', error: error.message });
    }
  });


module.exports = router;
