import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getUserHabits } from '../api';
import HabitCard from '../components/HabitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PLACEHOLDER = '/placeholder-avatar.svg';

const UserHabitsPage = () => {
  const { userId } = useParams();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserHabits = async () => {
      toast.loading('Loading user habits...');
      try {
        setLoading(true);
        const data = await getUserHabits(userId);
        setHabits(data.habits);
        setUserInfo(data.user);
        setError(null);
        toast.dismiss();
        toast.success('User habits loaded!');
      } catch (err) {
        setError(err.message || 'Failed to fetch user habits');
        toast.dismiss();
        toast.error(`Error: ${err.message || 'Unable to fetch user habits'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserHabits();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors pt-16">
      <div className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">

          {/* User Profile Section */}
          {userInfo && (
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md mb-10">
              <img
                src={userInfo.avatar_url || PLACEHOLDER}
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userInfo.username}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Joined on {new Date(userInfo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* Habits List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {habits.length > 0 ? 'Current Habits' : 'No Habits Yet'}
            </h2>
            {habits.map((habit) => (
              <HabitCard key={habit._id} habit={habit} showUserInfo={false} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserHabitsPage;
