import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl text-center border border-blue-100">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 tracking-tight">
          Welcome to <span className="text-indigo-600">EduPlatform</span>
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          🚀 Your gateway to <span className="font-semibold text-blue-600">skill-based online learning</span>.<br />
          Learn anytime, anywhere — with top-rated courses, expert instructors, and certificates on completion.
        </p>
        <div className="mt-8">
          <img
            src="https://cdn.pixabay.com/photo/2017/10/10/21/46/education-2835534_1280.jpg"
            alt="Learning illustration"
            className="mx-auto rounded-xl shadow-md w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
