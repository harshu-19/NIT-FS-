const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory "database"
let tasks = [];
let nextId = 1;

// ✅ CREATE a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: nextId++, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// ✅ READ all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// ✅ READ a single task by id
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// ✅ UPDATE a task by id
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const { title, description } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    res.json(task);
});

// ✅ DELETE a task by id
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
