import React from "react";

export default function BlogPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Habit League Blog</h1>
      <article className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Welcome to Our Blog!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Here you'll find tips, stories, and updates about building better habits and staying motivated.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Stay tuned for more posts!
        </p>
      </article>
      {/* Add more blog posts here */}
    </div>
  );
}