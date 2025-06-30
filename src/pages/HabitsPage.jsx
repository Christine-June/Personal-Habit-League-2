import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getHabits, deleteHabit, getUsers, addHabit } from "../api";
import HabitModal from "../components/HabitModal";
import { MoreVertical, Calendar } from "lucide-react";

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    toast.loading("Loading habits...");
    try {
      const habitsData = await getHabits();
      const usersData = await getUsers();
      setHabits(habitsData);
      setUsers(usersData);
      toast.dismiss();
      toast.success("Habits loaded successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to load habits or users.");
    }
  };

  const handleAddHabit = async (newHabit) => {
    try {
      toast.loading("Adding habit...");
      await addHabit(newHabit);
      setShowModal(false);
      await fetchData();
      toast.dismiss();
      toast.success("Habit added successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to add habit.");
    }
  };

  const handleDeleteHabit = async (habitId) => {
    try {
      toast.loading("Deleting habit...");
      await deleteHabit(habitId);
      await fetchData();
      toast.dismiss();
      toast.success("Habit deleted successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to delete habit.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Habits
        </h1>
        <Link
          to="/habits/calendar"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Calendar className="mr-2" size={20} />
          View Calendar
        </Link>
      </div>

      <div
        className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-4 mb-6 bg-white dark:bg-gray-900 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setShowModal(true)}
      >
        <p className="text-center text-gray-600 dark:text-gray-300">
          + Create Habit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 transition-colors"
          >
              <div className="absolute top-2 right-2 group">
                <MoreVertical className="cursor-pointer text-gray-700 dark:text-gray-300" />
                <div className="hidden group-hover:flex flex-col absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow border rounded z-10">
                  <button
                    onClick={() => { /* Edit functionality removed */ }}
                    className="px-4 py-2 text-left text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-left text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {habit.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {habit.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Frequency: {habit.frequency}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                User: {habit.user_id}
              </p>
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
    </div>
  );
};

export default HabitsPage;