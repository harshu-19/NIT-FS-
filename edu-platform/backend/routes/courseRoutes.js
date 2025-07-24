// backend/routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const Course = require("../models/CourseModel");

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course); // contains youtubeUrl like "https://www.youtube.com/watch?v=ua-CiDNNj30"
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get quiz for a specific course by ID
router.get("/:id/quiz", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course.quiz); // Only return quiz part
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
