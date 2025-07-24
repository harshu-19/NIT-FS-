import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-gray-700 text-xl mt-4">Page not found</p>
      <Link to="/" className="text-blue-600 underline mt-4 inline-block">Go to Home</Link>
    </div>
  );
};

export default NotFound;
