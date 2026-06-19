import React from 'react';

const Spinner = ({ size = 10 }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`w-${size} h-${size} border-4 border-gray-200 border-t-(--main-main) rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
