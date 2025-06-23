// src/pages/HabitsPage.jsx
import React, { useEffect, useState } from "react";
import { getHabits, deleteHabit, updateHabit, getUsers, addHabit } from "../api";
import HabitModal from "../components/HabitModal";
import { MoreVertical } from "lucide-react";

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const habitsData = await getHabits();
    const usersData = await getUsers();
    setHabits(habitsData);
    setUsers(usersData);
  };

  const handleAddHabit = async (newHabit) => {
    await addHabit(newHabit);
    setShowModal(false);
    fetchData();
  };

  const handleUpdateHabit = async (updatedHabit) => {
    await updateHabit(updatedHabit.id, updatedHabit);
    setEditingHabit(null);
    fetchData();
  };

  const handleDeleteHabit = async (habitId) => {
    await deleteHabit(habitId);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Habits</h1>

      {/* Create Card */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-4 mb-6 bg-white cursor-pointer hover:bg-gray-50"
        onClick={() => setShowModal(true)}
      >
        <p className="text-center text-gray-600">+ Create Habit</p>
      </div>

      {/* Habit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="relative bg-white rounded-lg shadow-md p-4"
          >
            <div className="absolute top-2 right-2 group">
              <MoreVertical className="cursor-pointer" />
              <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 bg-white shadow border rounded z-10">
                <button
                  onClick={() => setEditingHabit(habit)}
                  className="px-4 py-2 hover:bg-gray-100 text-left"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteHabit(habit.id)}
                  className="px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
            <h2 className="text-xl font-semibold">{habit.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{habit.description}</p>
            <p className="text-sm text-gray-600 font-medium">Frequency: {habit.frequency}</p>
            <p className="text-sm text-gray-600 font-medium">User: {habit.user_id}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <HabitModal
          users={users}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddHabit}
        />
      )}

      {editingHabit && (
        <HabitModal
          users={users}
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
          onSubmit={handleUpdateHabit}
        />
      )}
    </div>
  );
};

export default HabitsPage;
