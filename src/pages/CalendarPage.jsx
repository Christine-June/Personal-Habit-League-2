import React, { useEffect, useState } from "react";

export default function CalendarPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      setLoading(false);
      return;
    }
    const currentUser = JSON.parse(storedUser);
    const userId = currentUser?.id;
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/users/${userId}/profile`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!user) return <div className="p-8 text-center text-red-500">User not found.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <p>Your habit and challenge calendar will appear here.</p>

      {/* Joined Challenges */}
      <div className="mt-8">
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
    </div>
  );
}
