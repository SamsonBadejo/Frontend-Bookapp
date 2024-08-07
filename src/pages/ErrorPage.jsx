import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-blue-200 dark:bg-gray-900 overflow-hidden">
      {/* Abstract Background SVG */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1D4ED8', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad1)"
          d="M0,160L30,138.7C60,117,120,75,180,64C240,53,300,75,360,106.7C420,139,480,181,540,213.3C600,245,660,267,720,266.7C780,267,840,245,900,224C960,203,1020,181,1080,181.3C1140,181,1200,203,1260,224C1320,245,1380,267,1410,278.7L1440,290L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </svg>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center p-8 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-extrabold text-red-500 dark:text-white mb-4">404</h1>
        <p className="text-2xl text-black dark:text-white mb-6">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="text-red-400 dark:text-blue-600 hover:underline text-lg font-medium"
        >
          Go back to the main page
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
