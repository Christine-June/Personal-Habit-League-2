import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const HabitCard = ({ habit, onDelete, onEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete(habit.id);
  };

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit(habit);
  };

  return (
    <div className="relative bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 group">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
        {habit.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-1">{habit.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Frequency: {habit.frequency}
      </p>

      {/* Three Dot Icon Menu */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          <FaEllipsisV className="text-gray-600 dark:text-gray-300" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
              onClick={handleEdit}
            >
              ✏️ Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
              onClick={handleDelete}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
