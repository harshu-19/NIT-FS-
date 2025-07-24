import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaQuestionCircle } from 'react-icons/fa';

const CoursePage = () => {
  const { id } = useParams(); // ✅ Matches route param `/course/:id`
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course:', err);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleQuizClick = () => {
    navigate(`/quiz/${id}`);
  };

  if (loading) return <p className="p-4">Loading course...</p>;
  if (!course) return <p className="p-4">Course not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-4">{course.description}</p>

      {course.youtubeUrl && (
        <div className="mb-6">
          <iframe
            className="w-full h-64 md:h-96 rounded shadow"
            src={course.youtubeUrl.replace("watch?v=", "embed/")}
            title="Course Video"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <button
        onClick={handleQuizClick}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        <FaQuestionCircle />
        Attend Quiz
      </button>
    </div>
  );
};

export default CoursePage;
