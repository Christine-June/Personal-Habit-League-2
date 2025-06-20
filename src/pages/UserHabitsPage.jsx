import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserHabits } from '../api';
import HabitCard from '../components/HabitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const UserHabitsPage = () => {
  const { userId } = useParams();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserHabits = async () => {
      try {
        setLoading(true);
        const data = await getUserHabits(userId);
        setHabits(data.habits);
        setUserInfo(data.user);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch user habits');
      } finally {
        setLoading(false);
      }
    };

    fetchUserHabits();
  }, [userId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Profile Section */}
          {userInfo && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {userInfo.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {userInfo.username}'s Habits
                  </h1>
                  <p className="text-gray-600">
                    Member since {new Date(userInfo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Habits List */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {habits.length > 0 ? 'Current Habits' : 'No Habits Yet'}
            </h2>

            {habits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                showUserInfo={false}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserHabitsPage;
