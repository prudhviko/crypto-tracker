import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        ← Back to Home
      </Link>

      <svg
        className="w-40 mt-10 opacity-40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2v20M2 12h20" />
      </svg>
    </div>
  );
};

export default NotFound;
