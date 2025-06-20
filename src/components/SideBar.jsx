import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';

export default function SideBar() {
  const { isDarkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { path: '/', name: 'Home', icon: '🏠', hoverText: 'Home' },
    { path: '/habits', name: 'Habits', icon: '📝', hoverText: 'Track habits' },
    { path: '/habit-entries', name: 'Progress', icon: '📊', hoverText: 'Your progress' },
    { path: '/challenges', name: 'Challenges', icon: '🏆', hoverText: 'Join challenges' },
    { path: '/users', name: 'Community', icon: '👥', hoverText: 'Connect with others' },
  ];

  // Auto-close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsExpanded(true);
      else setIsExpanded(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={sidebarRef}
      className={`
        fixed top-0 left-0 h-full z-50
        ${isExpanded ? 'w-64' : 'w-20'}
        ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}
        border-r ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="flex flex-col h-full p-4">
        {/* Logo with expand toggle */}
        <div 
          className="mb-8 p-3 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800 w-fit cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-xl font-bold">Habit League</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onMouseEnter={() => setActiveHover(item.path)}
                  onMouseLeave={() => setActiveHover(null)}
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-full relative
                    ${isActive ? 'font-bold' : 'hover:bg-gray-200 hover:dark:bg-gray-800'}
                    transition-all duration-200
                    ${isExpanded ? 'w-full' : 'w-fit'}
                  `}
                >
                  <span className="text-2xl">{item.icon}</span>
                  {isExpanded && (
                    <span className="ml-4">{item.name}</span>
                  )}
                  {!isExpanded && activeHover === item.path && (
                    <div className={`
                      absolute left-full ml-4 px-3 py-2 rounded-md shadow-lg
                      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
                      whitespace-nowrap
                    `}>
                      {item.hoverText}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="mt-auto mb-4">
          <div 
            className={`
              flex items-center p-3 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800
              ${isExpanded ? 'w-full' : 'w-fit'}
              cursor-pointer
            `}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xl">👤</span>
            </div>
            {isExpanded && (
              <div className="ml-3">
                <div className="font-bold">User Name</div>
                <div className="text-sm opacity-70">@username</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
