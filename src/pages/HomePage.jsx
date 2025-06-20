import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-white via-indigo-50 to-purple-50">
      {/* Sidebar space (coming later) */}
      <div className="w-64 hidden md:block"></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-md transition hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Your Habit League HQ 
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Build. Track. Win. Small habits, big changes — start your journey today.
          </p>

          <div className="flex flex-col gap-4">
            <button className="bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition">
              + Start New Challenge
            </button>
            <button className="bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition">
              View Leaderboard
            </button>
            <button className="bg-pink-400 text-white py-3 rounded-xl hover:bg-pink-500 transition">
              Track Today's Habit
            </button>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-400 text-center">
          "Consistency is more important than perfection." 
        </p>
      </div>
    </div>
  );
}
