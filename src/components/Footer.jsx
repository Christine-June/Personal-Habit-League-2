import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
      setTimestamp(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-white/70 dark:bg-black/70 backdrop-blur-lg transition-colors duration-300 border-t border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          
          {/* Logo & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center">
              <svg className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">HabitLeague</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Build Better Habits Together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</a></li>
              <li><a href="/challenges" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Challenges</a></li>
              <li><a href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Connect</h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:support@personalhabitleague.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  support@personalhabitleague.com
                </a>
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 17.293a11.616 11.616 0 006.29 1.84" />
                </svg>
                <a href="https://twitter.com/HabitLeague" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  @HabitLeague
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2 md:mb-0">
            © {currentYear} Personal Habit League. All rights reserved.
          </p>
          <p className="text-gray-400 dark:text-gray-500">
            Page loaded on: <span className="text-gray-500 dark:text-gray-400">{timestamp}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
