import React, { useEffect, useState } from "react";
import HabitCalendar from "../components/HabitCalendar";
import { getUserHabits } from "../api";
import HabitModal from "../components/HabitModal";
import ChallengeModal from "../components/ChallengeModal";

export default function CalendarPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [habitEntries, setHabitEntries] = useState([]);
  const [challengeEntries, setChallengeEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

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
        console.log("Fetched habit entries:", data);
        setHabitEntries(data);
      })
      .catch(() => {
        setHabitEntries([]);
      });

    // Fetch user profile to get challenges
    fetch(`http://localhost:5000/users/${userId}/profile`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched challenge entries:", data.challenges);
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
      <HabitCalendar
        entries={calendarEntries}
        onDayClick={(date) => {
          // Implement day click handler to add/edit entries
          alert("You clicked on date: " + date.toDateString());
          // Additional logic to open a modal or navigate to entry form can be added here
          console.log("Day clicked:", date);
        }}
        onEntryClick={(entry) => {
          setSelectedEntry(entry);
        }}
      />
      {selectedEntry && selectedEntry.type === "habit" && (
        <HabitModal
          habit={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onSubmit={(updatedHabit) => {
            // Update habitEntries state with updated habit
            setHabitEntries((prev) =>
              prev.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
            );
            setSelectedEntry(null);
          }}
        />
      )}
      {selectedEntry && selectedEntry.type === "challenge" && (
        <ChallengeModal
          challenge={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onSubmit={(updatedChallenge) => {
            // Update challengeEntries state with updated challenge
            setChallengeEntries((prev) =>
              prev.map((c) => (c.id === updatedChallenge.id ? updatedChallenge : c))
            );
            setSelectedEntry(null);
          }}
        />
      )}
    </div>
  );
}
