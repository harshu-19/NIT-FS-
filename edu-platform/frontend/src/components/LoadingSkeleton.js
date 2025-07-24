import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-xl p-4 space-y-4">
      <div className="bg-gray-300 h-40 w-full rounded-md" />
      <div className="h-6 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  );
};

export default LoadingSkeleton;
