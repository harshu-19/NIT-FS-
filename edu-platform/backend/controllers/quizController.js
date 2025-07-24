const Course = require('../models/CourseModel');

const getQuizByCourseId = async (req, res) => {
  const { id } = req.params;  // using id here, NOT courseId
  try {
    const course = await Course.findById(id).select('quiz');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course.quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getQuizByCourseId };
