import React from 'react';

const SkeletonProductCard = () => {
  return (
    <div className="mx-auto mt-11 w-full transform rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg animate-pulse">
      <div className="h-48 w-full bg-gray-300 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-6 w-1/2 bg-gray-300 mb-2 rounded"></div>
        <div className="h-4 w-full bg-gray-300 mb-2 rounded"></div>
        <div className="flex items-center">
          <div className="h-6 w-1/4 bg-gray-300 mr-2 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300"></div>
          <div className="h-6 w-1/4 bg-gray-300 ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
