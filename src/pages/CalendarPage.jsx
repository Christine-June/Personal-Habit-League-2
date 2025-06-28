import React, { useEffect, useState } from "react";
import HabitCalendar from "../components/HabitCalendar";
import { getUserHabits } from "../api";

export default function CalendarPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habitEntries, setHabitEntries] = useState([]);
  const [challengeEntries, setChallengeEntries] = useState([]);

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
    setUser(currentUser);
    setLoading(true);

    // Fetch user habits
    getUserHabits(userId)
      .then((data) => {
        setHabitEntries(data);
      })
      .catch(() => {
        setHabitEntries([]);
      });

    // Fetch user profile to get challenges
    fetch(`http://localhost:5000/users/${userId}/profile`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        const joinedChallenges = data.challenges || [];
        const challengeEntries = joinedChallenges.map(challenge => ({
          id: challenge.id,
          name: challenge.name,
          date: challenge.start_date || challenge.date,
          type: "challenge",
        }));
        setChallengeEntries(challengeEntries);
      })
      .catch(() => {
        setChallengeEntries([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!user) return <div className="p-8 text-center text-red-500">User not found.</div>;

  // Combine habit and challenge entries for calendar
  const calendarEntries = [
    ...habitEntries.map(entry => ({
      ...entry,
      type: "habit",
      name: entry.notes || "Habit Entry",
    })),
    ...challengeEntries.map(challenge => ({
      ...challenge,
      date: challenge.start_date || challenge.date, // fallback if start_date missing
      name: challenge.name || "Challenge",
      type: "challenge",
    })),
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <HabitCalendar entries={calendarEntries} onDayClick={(date) => {
        // TODO: Implement day click handler to add/edit entries
        console.log("Day clicked:", date);
      }} />
    </div>
  );
}
