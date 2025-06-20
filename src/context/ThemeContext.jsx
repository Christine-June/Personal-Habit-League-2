import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();
const THEME_STORAGE_KEY = 'habits-theme-preference';

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme class to document and save preference
  const applyTheme = useCallback((darkMode) => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(darkMode));
    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    try {
      // Check for saved preference
      const savedPreference = localStorage.getItem(THEME_STORAGE_KEY);
      
      if (savedPreference !== null) {
        setIsDarkMode(JSON.parse(savedPreference));
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    } catch (error) {
      console.error('Failed to initialize theme:', error);
      setIsDarkMode(false); // Fallback to light mode
    }
  }, []);

  // Apply theme when mode changes
  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode, applyTheme]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
