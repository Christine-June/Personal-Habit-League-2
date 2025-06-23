import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

export default function HomePage({ sidebarExpanded }) {
  const marginClass = sidebarExpanded ? 'md:ml-64' : 'md:ml-20';
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 pt-16 ${marginClass}`}>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-90 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-md transition hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
            Your Habit League HQ
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-center mb-6">
            Build. Track. Win. Small habits, big changes — start your journey today.
          </p>

          <div className="flex flex-col gap-4">
            <button
              className="bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition"
              onClick={() => navigate('/challenges', { state: { showNewChallengeModal: true } })}
            >
              + Start New Challenge
            </button>
            <button
              className="bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition"
              onClick={() => navigate('/challenges')}
            >
              View Existing Challenges
            </button>
            <button
              className="bg-pink-400 text-white py-3 rounded-xl hover:bg-pink-500 transition"
              onClick={() => navigate('/habits')}
            >
              Track Today's Habit
            </button>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-400 dark:text-gray-300 text-center">
          "Consistency is more important than perfection."
        </p>
      </div>
    </div>
  );
}