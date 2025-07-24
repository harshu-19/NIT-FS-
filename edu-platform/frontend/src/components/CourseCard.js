import React from 'react';

const CourseCard = ({ title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300 border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default CourseCard;
