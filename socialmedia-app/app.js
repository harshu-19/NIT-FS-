const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const User = require('./models/userModel');
const Post = require('./models/postModel');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialmediadb')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// AUTH ROUTES
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 5) return res.json({ success: false, message: 'Password must be ≥5 chars' });
  const existing = await User.findOne({ username });
  if (existing) return res.json({ success: false, message: 'Username exists' });
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });
  res.json({ success: true, message: 'Registered!' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false, message: 'User not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: 'Wrong password' });
  req.session.username = username;
  res.json({ success: true });
});

app.get('/api/user', (req, res) => {
  if (req.session.username) res.json({ loggedIn: true, username: req.session.username });
  else res.json({ loggedIn: false });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// POST ROUTES
app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.session.username) return res.json({ success: false, message: 'Not logged in' });
  await Post.create({
    user: req.session.username,
    caption: req.body.caption,
    imagePath: '/uploads/' + req.file.filename,
    likes: [],
    comments: []
  });
  res.json({ success: true, message: 'Post uploaded!' });
});

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json({ posts });
});

app.post('/api/like', async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId);
  if (!post) return res.json({ success: false });
  const user = req.session.username;
  if (!user) return res.json({ success: false });
  const index = post.likes.indexOf(user);
  if (index === -1) post.likes.push(user);
  else post.likes.splice(index, 1);
  await post.save();
  res.json({ success: true, likes: post.likes.length });
});

app.post('/api/comment', async (req, res) => {
  const { postId, text } = req.body;
  const user = req.session.username;
  if (!user) return res.json({ success: false });
  const post = await Post.findById(postId);
  if (!post) return res.json({ success: false });
  post.comments.push({ user, text });
  await post.save();
  res.json({ success: true, comments: post.comments });
});

// Start server
app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));
