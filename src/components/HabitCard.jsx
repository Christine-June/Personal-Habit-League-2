// src/components/HabitCard.jsx
import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const HabitCard = ({ habit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete(habit.id);
  };

  return (
    <div className="relative bg-white shadow-md p-4 rounded-md mb-4">
      <h3 className="text-lg font-bold">{habit.name}</h3>
      <p className="text-gray-600">{habit.description}</p>
      <p className="text-sm text-gray-500">Frequency: {habit.frequency}</p>

      <div className="absolute top-2 right-2">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
          <FaEllipsisV />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
            <button
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitCard;