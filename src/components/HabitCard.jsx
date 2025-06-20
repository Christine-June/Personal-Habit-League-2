export default function HabitCard({ habit, showUserInfo = true }) {
  if (!habit) return null;
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="text-lg font-bold">{habit.name}</h3>
        <p className="text-gray-600">{habit.description}</p>
        {showUserInfo && habit.user && (
          <div className="text-sm text-gray-400 mt-2">
            By: {habit.user.username}
          </div>
        )}
      </div>
      <div className="mt-2 md:mt-0">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
          {habit.status || 'Active'}
        </span>
      </div>
    </div>
  );
}