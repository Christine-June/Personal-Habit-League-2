import { NavLink, useLocation, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { FiSettings, FiMessageCircle } from 'react-icons/fi';
import Feedback from './Feedback';

export default function SideBar({ expanded, setExpanded }) {
  const { isDarkMode } = useTheme();
  const [activeHover, setActiveHover] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [expandTimeout, setExpandTimeout] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined" && stored !== "null") {
      user = JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Invalid JSON for user in localStorage:", e);
  }

  const navItems = [
    { path: '/home', name: 'Home', icon: '🏠', hoverText: 'Home' },
    { path: '/habits', name: 'Habits', icon: '📝', hoverText: 'Track habits' },
    { path: '/chat', name: 'Chat Log', icon: '💬', hoverText: 'View chat log' },
    { path: '/challenges', name: 'Challenges', icon: '🏆', hoverText: 'Join challenges' },
    { path: '/users', name: 'Community', icon: '👥', hoverText: 'Connect with others' },
    { path: '/privacy', name: 'Privacy Policy', icon: '🔒', hoverText: 'Privacy Policy' },
    { path: '/terms', name: 'Terms of Service', icon: '📄', hoverText: 'Terms of Service' },
    { path: '/cookies', name: 'Cookie Settings', icon: '🍪', hoverText: 'Cookie Settings' },
  ];

  const handleSidebarMouseEnter = () => {
    clearTimeout(expandTimeout);
    setExpandTimeout(setTimeout(() => setExpanded(true), 150));
  };

  const handleSidebarMouseLeave = () => {
    clearTimeout(expandTimeout);
    setExpandTimeout(setTimeout(() => {
      if (window.innerWidth >= 768) setExpanded(false);
    }, 300));
  };

  const handleItemMouseEnter = (itemPath) => {
    clearTimeout(hoverTimeout);
    setHoverTimeout(setTimeout(() => setActiveHover(itemPath), 200));
  };

  const handleItemMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setActiveHover(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (window.innerWidth < 768) setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setExpanded]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setExpanded(true);
      else setExpanded(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setExpanded]);

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout);
      clearTimeout(expandTimeout);
    };
  }, [hoverTimeout, expandTimeout]);

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div
      ref={sidebarRef}
      onMouseEnter={handleSidebarMouseEnter}
      onMouseLeave={handleSidebarMouseLeave}
      className={`
        fixed top-0 left-0 h-full z-50
        ${expanded ? 'w-64' : 'w-20'}
        ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}
        border-r ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
        transition-all duration-300 ease-in-out
        shadow-lg overflow-hidden
      `}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center mb-8">
          <div
            className="p-3 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800 w-fit cursor-pointer"
            onClick={() => setExpanded(!expanded)}
            title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <span className="text-xl font-bold">HL</span>
          </div>
          <button
            className="ml-auto md:hidden p-2 rounded hover:bg-gray-200 hover:dark:bg-gray-800"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <span>&#10005;</span> : <span>&#9776;</span>}
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onMouseEnter={() => handleItemMouseEnter(item.path)}
                  onMouseLeave={handleItemMouseLeave}
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-full relative
                    ${isActive
                      ? 'bg-blue-100 text-blue-600 font-semibold border-2 border-blue-200'
                      : 'hover:bg-gray-200 hover:dark:bg-gray-800 text-gray-700 dark:text-gray-200'}
                    transition-all duration-200
                    ${expanded ? 'w-full' : 'w-fit mx-auto'}
                    group
                  `}
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <span className={`ml-4 transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0 max-w-0 ml-0'} overflow-hidden whitespace-nowrap`}>
                    {item.name}
                  </span>
                  {!expanded && activeHover === item.path && (
                    <div className="absolute left-full ml-2 px-3 py-2 rounded-md shadow-lg bg-gray-800 text-white border border-gray-600 whitespace-nowrap z-50 animate-fadeIn before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-gray-800">
                      {item.hoverText}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="flex items-center gap-2 p-3 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800 mt-2"
          onClick={() => setShowFeedback(true)}
        >
          <FiMessageCircle className="text-2xl" />
          {expanded && <span>Feedback</span>}
        </button>

        <button
          className="flex items-center gap-2 p-3 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800 mt-2"
          onClick={() => setShowSettings(true)}
        >
          <FiSettings className="text-2xl" />
          {expanded && <span>Settings</span>}
        </button>

        <div className="mt-auto mb-4">
          <div className={`flex items-center p-3 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800 ${expanded ? 'w-full' : 'w-fit mx-auto'} cursor-pointer group`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-xl">👤</span>
              )}
            </div>
            <div className={`ml-3 transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0 max-w-0 ml-0'} overflow-hidden`}>
              <div className="font-semibold text-gray-800 dark:text-gray-100">
                {user?.username || 'Guest'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                @{user?.username?.toLowerCase() || 'guest'}
              </div>
              {user && (
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/auth';
                  }}
                  className="text-xs text-blue-500 underline mt-1"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setShowFeedback(false)}
              >
                &times;
              </button>
              <Feedback />
            </div>
          </div>
        )}

        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function SettingsPanel({ onClose }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Settings</h2>
        <div className="flex items-center justify-between">
          <span>Theme</span>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            {isDarkMode ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </div>
  );
}
