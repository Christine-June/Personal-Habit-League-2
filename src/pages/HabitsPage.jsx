// src/pages/HabitsPage.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getHabits,
  deleteHabit,
  getUsers,
  addHabit,
} from "../api";
import HabitModal from "../components/HabitModal";
import { MoreVertical } from "lucide-react";

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Habits
      </h1>
    </div>
  );
};

export default HabitsPage;
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