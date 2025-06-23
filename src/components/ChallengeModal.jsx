import React, { useState } from "react";

const ChallengeModal = ({ users, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    created_by: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Create Challenge</h2>
        <input
          type="text"
          name="name"
          placeholder="Challenge Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <select
          name="created_by"
          value={formData.created_by}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">Select Creator</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username || `User ${user.id}`}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeModal;
