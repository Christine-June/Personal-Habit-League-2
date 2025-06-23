import React, { useEffect, useState } from 'react';
import ChallengeForm from './ChallengeForm';

export default function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [editing, setEditing] = useState(null);

  // Fetch challenges
  useEffect(() => {
    fetch('http://localhost:5000/challenges/')
      .then(res => res.json())
      .then(setChallenges);
  }, []);

  // Delete a challenge
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this challenge?')) return;
    await fetch(`http://localhost:5000/challenges/${id}`, { method: 'DELETE' });
    setChallenges(challenges.filter(c => c.id !== id));
  };

  // Update a challenge
  const handleUpdate = (updated) => {
    setChallenges(challenges.map(c => c.id === updated.id ? updated : c));
    setEditing(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Challenges</h2>
      <ul>
        {challenges.map(challenge => (
          <li key={challenge.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <span>
              <strong>{challenge.name}</strong> ({challenge.start_date} to {challenge.end_date})
            </span>
            <span>
              <button onClick={() => setEditing(challenge)} className="mr-2 text-blue-600">Edit</button>
              <button onClick={() => handleDelete(challenge.id)} className="text-red-600">Delete</button>
            </span>
          </li>
        ))}
      </ul>
      {editing && (
        <ChallengeForm
          initialData={editing}
          onSave={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}