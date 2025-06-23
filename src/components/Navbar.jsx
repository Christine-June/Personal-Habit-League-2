import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ sidebarExpanded }) {
  const { isDarkMode } = useTheme();

  const marginClass = sidebarExpanded ? 'md:ml-64' : 'md:ml-10';

  return (
    <nav
      className={`
        sticky top-0 z-50
        flex items-center
        transition-colors duration-300
        ${marginClass}
        ${isDarkMode
          ? 'bg-black text-white border-b border-gray-800'
          : 'bg-white text-black border-b border-gray-200'}
      `}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <span>🏆</span>
          <span>Habit League</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/habits" className="hover:text-blue-500 transition-colors">
            Habits
          </Link>
          <Link to="/habit-entries" className="hover:text-blue-500 transition-colors">
            Progress
          </Link>
          <Link to="/challenges" className="hover:text-blue-500 transition-colors">
            Challenges
          </Link>
          <Link to="/users" className="hover:text-blue-500 transition-colors">
            Community
          </Link>
        </div>
      </div>
    </nav>
  );
}