// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar({ sidebarExpanded }) {
  const { isDarkMode } = useTheme();
  const marginClass = sidebarExpanded ? 'md:ml-64' : 'md:ml-10';
  const isLoggedIn = !!localStorage.getItem('token');

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth';
  }

  return (
    <nav
      className={`
        sticky top-0 z-50 backdrop-blur-md bg-opacity-80
        transition-colors duration-300 border-b
        ${marginClass}
        ${isDarkMode
          ? 'bg-black/70 text-white border-gray-800'
          : 'bg-white/70 text-black border-gray-200'}
      `}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-extrabold tracking-tight hover:text-indigo-500 transition-colors">
          <span role="img" aria-label="trophy">🏆</span>
          <span>Habit League</span>
        </Link>

        {/* Right Nav Items */}
        <div className="flex items-center space-x-4">
          <DarkModeToggle />

          <div className="hidden md:flex items-center space-x-6 font-medium">
            {isLoggedIn ? (
              <>
                <Link to="/habits" className="hover:text-indigo-500 transition">Habits</Link>
                <Link to="/challenges" className="hover:text-indigo-500 transition">Challenges</Link>
                <button onClick={logout} className="hover:text-red-500 transition">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-indigo-500 transition">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
