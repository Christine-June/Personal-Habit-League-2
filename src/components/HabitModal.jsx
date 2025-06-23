// src/components/HabitModal.jsx
import React, { useState, useEffect } from "react";

const HabitModal = ({ users, habit = null, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    user_id: users.length ? users[0].id : "",
  });

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name || "",
        description: habit.description || "",
        frequency: habit.frequency || "daily",
        user_id: habit.user_id || "",
      });
    }
  }, [habit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = habit ? { ...habit, ...formData } : formData;
    await onSubmit(payload); // ✅ this will call handleAddHabit or handleUpdateHabit
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          {habit ? "Edit Habit" : "Create Habit"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Frequency</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">User</label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username || `User ${user.id}`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {habit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitModal;
