const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
}, { _id: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  quiz: [quizSchema],
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
module.exports = Course;
