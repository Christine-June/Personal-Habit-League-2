import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/hero-image.svg'; // Make sure the path is correct

export default function HomePage({ sidebarExpanded }) {
  const marginClass = sidebarExpanded ? 'md:ml-64' : 'md:ml-20';
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col pt-16 ${marginClass} bg-white dark:bg-black transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">

        {/* Smaller SVG Illustration */}
        <img
          src={HeroImage}
          alt="Hero Illustration"
          className="w-40 sm:w-48 md:w-56 lg:w-64 mb-6 drop-shadow-md"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-3">
          Welcome to the Personal Habit League
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          Join the journey. Build positive habits. Compete. Grow. One step at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-md px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/challenges', { state: { showNewChallengeModal: true } })}
          >
            + Start New Challenge
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white text-md px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/challenges')}
          >
            View Challenges
          </button>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white text-md px-6 py-3 rounded-full transition shadow-md"
            onClick={() => navigate('/habits')}
          >
            Track Today’s Habit
          </button>
        </div>

        <p className="mt-8 text-sm italic text-gray-500 dark:text-gray-400">
          "Consistency is more important than perfection."
        </p>
      </div>
    </div>
  );
}
