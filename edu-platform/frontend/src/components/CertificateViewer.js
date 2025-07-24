// src/components/CertificateViewer.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CertificateViewer = () => {
  const { id } = useParams(); // id = courseId
  const [certificateUrl, setCertificateUrl] = useState('');
  const [courseName, setCourseName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No course ID provided');
      return;
    }

    const fetchCourseName = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourseName(res.data.title); // assuming your course object has a `title`
      } catch (err) {
        setCourseName('Unknown Course');
      }
    };

    const fetchCertificate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/certificates/${id}`);
        setCertificateUrl(res.data.certificateUrl);
      } catch (err) {
        setError('Certificate not found for this course');
      }
    };

    fetchCourseName();
    fetchCertificate();
  }, [id]);

  if (error) {
    return <div className="p-4 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Your Certificate for: <span className="text-blue-600">{courseName}</span></h2>
      <div className="border rounded-lg shadow-md overflow-hidden">
        {certificateUrl ? (
          <iframe
            src={certificateUrl}
            title="Certificate Preview"
            className="w-full h-[500px]"
          />
        ) : (
          <p className="text-gray-600">Loading certificate...</p>
        )}
      </div>
    </div>
  );
};

export default CertificateViewer;
