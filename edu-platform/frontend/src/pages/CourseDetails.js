import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CertificateViewer from '../components/CertificateViewer';

const CourseDetails = () => {
  const { id } = useParams(); // course ID from URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setCourse(data.course);
        setCompleted(data.completed || false);
        if (data.certificate) {
          setCertificate(data.certificate);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        navigate('/dashboard');
      }
    };

    fetchCourseDetails();
  }, [id, navigate, userToken]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${id}`);
  };

  if (!course) {
    return <div className="p-6 text-lg">Loading course details...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-4 text-gray-700">{course.description}</p>

      <div className="aspect-video mb-6">
        <iframe
          src={course.videoUrl}
          title={course.title}
          className="w-full h-full rounded-lg shadow-md"
          allowFullScreen
        />
      </div>

      {!completed ? (
        <button
          onClick={handleStartQuiz}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">🎉 You have completed this course!</h2>
          {certificate ? (
            <CertificateViewer certificateUrl={certificate} />
          ) : (
            <p>No certificate available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
