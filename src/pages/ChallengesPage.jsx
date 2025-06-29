import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  getChallenges,
  addChallenge,
  // deleteChallenge, ❌ removed
} from '../api';
import { motion } from 'framer-motion';

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    created_by: currentUser?.id || '',
  });

  useEffect(() => {
    fetchChallenges();
  }, []);

  async function fetchChallenges() {
    const data = await getChallenges();
    setChallenges(data);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      toast.loading('Creating challenge...');
      await addChallenge(formData);
      setFormVisible(false);
      setFormData({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        created_by: currentUser?.id || '',
      });
      fetchChallenges();
      toast.success('Challenge created!');
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong! Check that all fields are valid.');
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">🏆 Challenges</h2>
        <button
          onClick={() => {
            setFormData({
              name: '',
              description: '',
              start_date: '',
              end_date: '',
              created_by: currentUser?.id || '',
            });
            setFormVisible(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Add Challenge
        </button>
      </div>

      {formVisible && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Challenge Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            className="border p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <div className="col-span-1 md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Create Challenge
            </button>
            <button
              type="button"
              onClick={() => setFormVisible(false)}
              className="bg-gray-300 text-gray-700 dark:text-gray-100 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full border text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Start</th>
              <th className="px-4 py-2 text-left">End</th>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge) => (
              <tr key={challenge.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-2">{challenge.name}</td>
                <td className="px-4 py-2">{challenge.description}</td>
                <td className="px-4 py-2">{challenge.start_date}</td>
                <td className="px-4 py-2">{challenge.end_date}</td>
                <td className="px-4 py-2">{challenge.created_by}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/challenges/${challenge.id}`)}
                    className="px-3 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChallengesPage;
