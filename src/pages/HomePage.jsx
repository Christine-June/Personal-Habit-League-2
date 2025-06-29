import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage({ sidebarExpanded }) {
  const marginClass = sidebarExpanded ? 'md:ml-64' : 'md:ml-20';
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 transition-colors duration-300 pt-16 ${marginClass}`}>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4">
          Welcome to the Personal Habit League
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
          Join the journey. Build positive habits. Compete. Grow. One step at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/challenges', { state: { showNewChallengeModal: true } })}
          >
            + Start New Challenge
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/challenges')}
          >
            View Challenges
          </button>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/habits')}
          >
            Track Today’s Habit
          </button>
        </div>

        <p className="mt-10 text-md italic text-gray-500 dark:text-gray-400">
          "Consistency is more important than perfection."
        </p>
      </div>
    </div>
  );
}
