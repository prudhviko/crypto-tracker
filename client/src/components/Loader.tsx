import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default Loader;
