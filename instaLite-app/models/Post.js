const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  user: String,
  image: String,
  caption: String,
  likes: [String],
  comments: [{ user: String, text: String }]
});
module.exports = mongoose.model('Post', PostSchema);
