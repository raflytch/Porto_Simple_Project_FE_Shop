import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadTear } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="text-center space-y-6 w-full max-w-2xl">
        <h1 className="text-[10vw] md:text-[8vw] lg:text-[6vw] font-extrabold text-primary opacity-70">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>
        <div className="mt-6 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto opacity-30 flex justify-center items-center">
          <FaRegSadTear size={200} color="#7f4ff3" />
        </div>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-prose mx-auto px-4">
          The page you're looking for seems to have wandered off the digital
          map. Don't worry, we'll help you find your way back to safety.
        </p>
        <div className="pt-6">
          <Link
            to="/"
            className="btn btn-primary btn-wide max-w-xs md:max-w-md"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
