import { useTheme } from '../context/ThemeContext';
export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none transition-colors duration-300"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <span className="text-yellow-400">☀️</span>
      ) : (
        <span className="text-blue-400">🌙</span>
      )}
    </button>
  );
