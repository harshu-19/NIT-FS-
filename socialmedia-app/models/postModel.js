const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  user: String,
  caption: String,
  imagePath: String,
  likes: [String],  // usernames who liked
  comments: [{ user: String, text: String }]
}, { timestamps: true });
module.exports = mongoose.model('Post', postSchema);
