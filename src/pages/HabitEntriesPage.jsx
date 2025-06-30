import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import HabitCalendar from '../components/HabitCalendar';
import { FaCheck, FaTimes, FaMinus } from 'react-icons/fa';

export default function HabitEntriesPage() {
  const [entries, setEntries] = useState([]);
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        toast.loading('Loading habit data...');
        
        // Get user ID from session or local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User not authenticated');
        }
        
        // Get current date range for entries (last 30 days)
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        // Load habits and entries in parallel with proper query parameters
        const [habitsRes, entriesRes] = await Promise.all([
          fetch('http://localhost:5000/habits?user_id=' + userId),
          fetch(`http://localhost:5000/habit-entries?user_id=${userId}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`)
        ]);

        if (!habitsRes.ok) {
          const errorData = await habitsRes.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to load habits');
        }
        
        if (!entriesRes.ok) {
          const errorData = await entriesRes.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to load entries');
        }

        const [habitsData, entriesData] = await Promise.all([
          habitsRes.json(),
          entriesRes.json()
        ]);

        if (!cancelled) {
          setHabits(habitsData || []);
          setEntries(entriesData.entries || []);
          
          // Select the first habit by default if none selected
          if ((habitsData?.length > 0) && !selectedHabit) {
            setSelectedHabit(habitsData[0]);
          }
          
          toast.dismiss();
          toast.success('Habit data loaded!');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          toast.dismiss();
          toast.error(`Failed to load data: ${err.message}`);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadData();
    return () => { cancelled = true; };
  }, []);

  const filteredEntries = selectedHabit
    ? entries.filter(entry => entry.habit_id === selectedHabit.id)
    : [];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FaCheck className="text-green-500" />;
      case 'skipped': return <FaTimes className="text-red-500" />;
      case 'partial': return <FaMinus className="text-yellow-500" />;
      default: return null;
    }
  };

  if (loading) return <Skeleton />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Habit Tracker</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Track your habits and monitor your progress
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold mb-2">Habit Calendar</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Habits: <span className="text-blue-500">{habits.length}</span></p>
                <p className="text-gray-500 dark:text-gray-400">Track your daily progress</p>
              </div>
              <div>
                <p className="font-medium">Entries: <span className="text-blue-500">{entries.length}</span></p>
                <p className="text-gray-500 dark:text-gray-400">Total records this month</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
            <HabitCalendar 
              habits={habits}
              entries={entries}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>

        {/* Habit Details */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Habit Details</h2>
          
          {selectedHabit ? (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {selectedHabit.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {selectedHabit.description || 'No description available'}
                </p>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="capitalize">{selectedHabit.frequency}</span> • 
                  Created on {format(parseISO(selectedHabit.created_at), 'MMM d, yyyy')}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recent Activity</h3>
                {filteredEntries.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredEntries.slice(0, 5).map(entry => (
                      <li 
                        key={entry.id} 
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700"
                      >
                        <div>
                          <span className="font-medium">
                            {format(parseISO(entry.date), 'MMM d, yyyy')}
                          </span>
                          {entry.notes && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {entry.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="capitalize mr-2">{entry.progress}</span>
                          {getStatusIcon(entry.progress)}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No entries found for this habit.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Select a habit to view details
            </p>
          )}
        </div>
      </div>

      {/* All Entries */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Entries</h2>
        {entries.length > 0 ? (
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                <thead className="bg-gray-50 dark:bg-zinc-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Habit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-zinc-700">
                  {entries.map(entry => {
                    const habit = habits.find(h => h.id === entry.habit_id);
                    return (
                      <tr 
                        key={entry.id} 
                        className="hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                        onClick={() => setSelectedHabit(habit)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {format(parseISO(entry.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {habit?.name || 'Unknown Habit'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            entry.progress === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            entry.progress === 'skipped' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {entry.progress}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                          {entry.notes || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-zinc-800 rounded-xl shadow">
            <p className="text-gray-500 dark:text-gray-400">
              No habit entries found. Start tracking your habits to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 rounded-xl bg-zinc-800 animate-pulse" />
      ))}
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center p-8">
      <div className="text-red-500 mb-4">Error: {message}</div>
      <button 
        onClick={onRetry} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
