import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { FaTrophy, FaFire, FaChartLine, FaUser } from 'react-icons/fa';
import axios from 'axios';

export default function Leaderboard() {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('score');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard', {
          params: { sort: sortBy }
        });
        
        // Transform API data to match expected format
        const formattedUsers = response.data.map(user => ({
          id: user.id,
          name: user.username,
          avatar: user.avatar || '',
          score: user.total_score,
          streak: user.current_streak,
          habitsCompleted: user.habits_completed,
          progress: user.completion_rate
        }));
        
        setUsers(formattedUsers);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [sortBy]);

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-amber-600';
      default: return isDarkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getMedalIcon = (rank) => {
    switch(rank) {
      case 1: return <FaTrophy className="text-yellow-400 text-xl" />;
      case 2: return <FaTrophy className="text-gray-300 text-xl" />;
      case 3: return <FaTrophy className="text-amber-600 text-xl" />;
      default: return <span className="text-sm">{rank}</span>;
    }
  };

  if (isLoading) {
    return (
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="animate-pulse flex flex-col space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded-md bg-gray-300 dark:bg-gray-700"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaChartLine className="mr-2" />
          Leaderboard
        </h2>
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaChartLine className="mr-2" />
        Leaderboard
      </h2>
      
      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setSortBy('score')}
          className={`px-3 py-1 rounded-md ${sortBy === 'score' ? 
            (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') : 
            (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')}`}
        >
          By Score
        </button>
        <button 
          onClick={() => setSortBy('streak')}
          className={`px-3 py-1 rounded-md ${sortBy === 'streak' ? 
            (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800') : 
            (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')}`}
        >
          <FaFire className="inline mr-1" /> Streak
        </button>
      </div>
      
      <div className="space-y-3">
        {users.map((user, index) => (
          <div 
            key={user.id}
            className={`flex items-center p-3 rounded-lg transition-all ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <div className={`w-8 h-8 flex items-center justify-center font-bold ${getRankColor(index + 1)}`}>
              {getMedalIcon(index + 1)}
            </div>
            
            <div className="ml-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl">
                {user.avatar || <FaUser className="text-white" />}
              </div>
            </div>
            
            <div className="ml-3 flex-grow">
              <div className="font-semibold">{user.name}</div>
              <div className="flex items-center text-sm">
                <span className="font-medium">{user.score} pts</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="flex items-center">
                  <FaFire className="mr-1 text-orange-500" />
                  {user.streak} days
                </span>
              </div>
            </div>
            
            <div className="w-16">
              <div className="h-2 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${user.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
