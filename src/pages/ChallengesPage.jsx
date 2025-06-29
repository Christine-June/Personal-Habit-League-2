// src/pages/ChallengesPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  getChallenges,
  addChallenge,
  deleteChallenge,
  getUsers,
} from '../api';
import { motion } from 'framer-motion';

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [users, setUsers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    created_by: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchChallenges();
    fetchUsers();
  }, []);

  async function fetchChallenges() {
    const data = await getChallenges();
    setChallenges(data);
  }

  async function fetchUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'created_by' ? parseInt(value) || '' : value,
    }));
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      toast.loading('Deleting challenge...');
      await deleteChallenge(id);
      toast.success('Challenge deleted!');
      fetchChallenges();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitting:', formData);
    try {
      toast.loading('Creating challenge...');
      await addChallenge(formData);
      setFormVisible(false);
      setFormData({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        created_by: '',
      });
      fetchChallenges();
      toast.success('Challenge created!');
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong! Check that all fields are valid.');
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Challenges</h2>
        <button
          onClick={() => {
            setFormData({
              name: '',
              description: '',
              start_date: '',
              end_date: '',
              created_by: '',
            });
            setFormVisible(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          + Add Challenge
        </button>
      </div>

      {formVisible && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Challenge Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="created_by"
            value={formData.created_by}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <div className="col-span-1 md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Challenge
            </button>
            <button
              type="button"
              onClick={() => {
                setFormVisible(false);
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Start</th>
            <th className="px-4 py-2">End</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id} className="border-t">
              <td className="px-4 py-2">{challenge.name}</td>
              <td className="px-4 py-2">{challenge.description}</td>
              <td className="px-4 py-2">{challenge.start_date}</td>
              <td className="px-4 py-2">{challenge.end_date}</td>
              <td className="px-4 py-2">{challenge.created_by}</td>
            <td className="px-4 py-2">
  <div className="flex items-center gap-2">
    <button
      onClick={() => navigate(`/challenges/${challenge.id}`)}
      className="px-3 py-1 bg-blue-500 rounded text-white hover:bg-blue-600"
    >
      View
    </button>
    <button
      onClick={() => handleDelete(challenge.id)}
      className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChallengesPage;