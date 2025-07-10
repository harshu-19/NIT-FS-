const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
  username: String,
  rating: Number,
  comment: String
});
module.exports = mongoose.model('Feedback', FeedbackSchema);
