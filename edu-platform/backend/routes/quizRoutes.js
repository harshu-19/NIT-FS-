const express = require("express");
const router = express.Router();
const { getQuizByCourseId } = require("../controllers/quizController");

// ✅ Route will match /api/quiz/:id, where id = course _id
router.get("/:id", getQuizByCourseId);

module.exports = router;
