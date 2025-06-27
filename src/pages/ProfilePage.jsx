import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfilePage({ currentUser }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId || currentUser?.id;

  useEffect(() => {
    if (!userId) {
      navigate("/auth");
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/users/${userId}/profile`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
        if (userId === currentUser?.id) {
          localStorage.setItem("currentUser", JSON.stringify(data));
        }
      })
      .catch(() => setLoading(false));
  }, [userId, currentUser, navigate]);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    window.location.href = "/auth";
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!user) return <div className="p-8 text-center text-red-500">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.username}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            user.username ? user.username[0] : "?"
          )}
        </div>
        <div>
          <div className="text-2xl font-bold">{user.username}</div>
          <div className="text-gray-500 mb-2">{user.bio}</div>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>
              <span className="font-bold">{user.stats?.habits ?? 0}</span> Habits
            </span>
            <span>
              <span className="font-bold">{user.stats?.challenges ?? 0}</span> Challenges
            </span>
            <span>
              <span className="font-bold">{user.stats?.streak ?? 0}</span> Day Streak
            </span>
          </div>
        </div>
      </div>
      {/* Habits */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Your Habits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(user.habits || []).map((habit) => (
            <div
              key={habit.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow"
            >
              <div className="font-bold">{habit.name}</div>
              <div className="text-gray-500">{habit.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Created Challenges */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Your Challenges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(user.challenges_created || []).map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow"
            >
              <div className="font-bold">{challenge.name}</div>
              <div className="text-gray-500">{challenge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Joined Challenges */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Joined Challenges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(user.challenges || []).map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow"
            >
              <div className="font-bold">{challenge.name}</div>
              <div className="text-gray-500">{challenge.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleLogout}
          className="text-red-500"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}