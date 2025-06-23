import React, { useState, useEffect } from 'react';

export default function ChallengeForm({ onClose, onSave, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      created_by: '',
    }
  );
  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users for dropdown
  useEffect(() => {
    fetch('http://localhost:5000/users/')
      .then(res => res.json())
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  // Set form data if initialData is provided
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!form.start_date || !form.end_date) {
      setError('Start date and end date are required.');
      setSaving(false);
      return;
    }
    if (!form.created_by) {
      setError('Created By is required.');
      setSaving(false);
      return;
    }

    // Prepare payload for submission
    const payload = {
      ...form,
      created_by: parseInt(form.created_by, 10),
    };

    try {
      // Determine URL and method based on initialData presence
      const url = initialData
        ? `http://localhost:5000/challenges/${initialData.id}`
        : 'http://localhost:5000/challenges/';
      const method = initialData ? 'PATCH' : 'POST';

      // Submit form data
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save challenge');
      const data = await res.json();
      onSave(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button type="button" onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Challenge' : 'New Challenge'}</h2>
        <label className="block mb-2">
          Name
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded p-2 mt-1" />
        </label>
        <label className="block mb-2">
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required className="w-full border rounded p-2 mt-1" />
        </label>
        <label className="block mb-2">
          Start Date
          <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required className="w-full border rounded p-2 mt-1" />
        </label>
        <label className="block mb-2">
          End Date
          <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required className="w-full border rounded p-2 mt-1" />
        </label>
        <label className="block mb-4">
          Created By
          <select
            name="created_by"
            value={form.created_by}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" disabled={saving} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          {saving ? 'Saving...' : initialData ? 'Update Challenge' : 'Save Challenge'}
        </button>
      </form>
    </div>
  );
}

// Usage example (wherever ChallengeForm is used):
// <ChallengeForm onClose={...} onSave={...} currentUserName={user.name} />