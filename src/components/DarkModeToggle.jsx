import { useTheme } from '../context/ThemeContext';

export default function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="px-3 py-1 rounded transition bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label="Toggle dark mode"
      type="button"
    >
      {isDarkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}