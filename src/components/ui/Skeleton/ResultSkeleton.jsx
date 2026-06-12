import React from 'react';

const ResultSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse px-4">
      <div className="w-40 h-8 md:h-10 bg-gray-300 rounded mb-8"></div>

      <div className="w-full max-w-[500px] h-32 bg-gray-200 rounded-lg mb-10"></div>

      <div className="w-full max-w-[300px] h-14 bg-gray-300 rounded-md"></div>
    </div>
  );
};

export default ResultSkeleton;
