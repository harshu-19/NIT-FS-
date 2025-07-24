const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const User = require('./models/User');
const Post = require('./models/Post');
const Feedback = require('./models/Feedback');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'instalite-secret', resave: false, saveUninitialized: true }));

mongoose.connect('mongodb://127.0.0.1/instalite', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.error(err));

// Use uploads folder
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
app.post('/signup', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ username: req.body.username, password: hash });
  res.redirect('/signin.html');
});

app.post('/signin', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.user = user.username;
    res.redirect('/feed.html');
  } else {
    res.send('Invalid login');
  }
});

app.post('/post', upload.single('image'), async (req, res) => {
  if (!req.session.user) return res.redirect('/signin.html');
  await Post.create({ user: req.session.user, image: req.file.filename, caption: req.body.caption });
  res.redirect('/feed.html');
});

app.post('/like/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.session.user)) post.likes.push(req.session.user);
  await post.save();
  res.sendStatus(200);
});

app.post('/comment/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.session.user, text: req.body.comment });
  await post.save();
  res.sendStatus(200);
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/feedback', async (req, res) => {
  if (!req.session.user) return res.redirect('/signin.html');
  await Feedback.create({ username: req.session.user, rating: parseInt(req.body.rating), comment: req.body.comment });
  res.redirect('/feedback.html');
});

app.get('/average-rating', async (req, res) => {
  const feedbacks = await Feedback.find();
  const avg = feedbacks.reduce((a,b)=>a+b.rating,0) / (feedbacks.length||1);
  res.json({ average: avg });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
