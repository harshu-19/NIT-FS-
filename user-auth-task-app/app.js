// ✅ Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

// ✅ Create Express app
const app = express();

// ✅ Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Session setup
app.use(session({
    secret: 'secret-key',         // Change to a strong secret in production
    resave: false,
    saveUninitialized: false
}));

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userauthtaskdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Define User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

// ✅ Define Task schema and model
const taskSchema = new mongoose.Schema({
    user: String,        // Username who created the task
    date: String,        // Task date in YYYY-MM-DD format
    task: String         // Task description
});
const Task = mongoose.model('Task', taskSchema);

// ✅ Route: Register new user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await new User({ username, password: hashedPassword }).save();
        res.json({ success: true, message: 'Registration successful' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error' });
    }
});

// ✅ Route: User login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: 'Invalid password' });

        req.session.username = username;
        res.json({ success: true, message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error' });
    }
});

// ✅ Route: Get current logged-in user
app.get('/api/user', (req, res) => {
    if (req.session.username) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false });
    }
});

// ✅ Route: Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// ✅ Route: Add today's task
app.post('/api/addtask', async (req, res) => {
    if (!req.session.username) return res.json({ success: false, message: 'Not logged in' });
    const { task } = req.body;
    const today = new Date().toISOString().slice(0, 10);
    try {
        await new Task({ user: req.session.username, date: today, task }).save();
        res.json({ success: true, message: 'Task added successfully' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error' });
    }
});

// ✅ Route: Get today's tasks
app.get('/api/todaytask', async (req, res) => {
    if (!req.session.username) return res.json({ success: false, message: 'Not logged in' });
    const today = new Date().toISOString().slice(0, 10);
    try {
        const tasks = await Task.find({ user: req.session.username, date: today });
        res.json({ success: true, tasks });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error' });
    }
});

// ✅ Route: Update task by ID
app.post('/api/updatetask', async (req, res) => {
    if (!req.session.username) return res.json({ success: false, message: 'Not logged in' });
    const { id, newTask } = req.body;
    try {
        const updated = await Task.findOneAndUpdate(
            { _id: id, user: req.session.username },
            { task: newTask }
        );
        if (updated) {
            res.json({ success: true, message: 'Task updated successfully' });
        } else {
            res.json({ success: false, message: 'Task not found' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error' });
    }
});

// ✅ Route: Delete task by ID
app.post('/api/deletetask', async (req, res) => {
    if (!req.session.username) return res.json({ success: false, message: 'Not logged in' });
    const { id } = req.body;
    try {
        const deleted = await Task.findOneAndDelete({ _id: id, user: req.session.username });
        if (deleted) {
            res.json({ success: true, message: 'Task deleted successfully' });
        } else {
            res.json({ success: false, message: 'Task not found' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Server error' });
    }
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
