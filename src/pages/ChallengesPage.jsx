import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChallengeForm from '../components/ChallengeForm'; // Create this component
import ChallengeTable from '../components/ChallengeTable'; // Create this component

export default function ChallengesPage() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(location.state?.showNewChallengeModal || false);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/challenges/')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setChallenges(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (newChallenge) => {
    setChallenges([...challenges, newChallenge]);
    setShowModal(false);
  };

  if (loading) return <div className="p-4">Loading challenges...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      {showModal && (
        <ChallengeForm
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">Challenges</h1>
      <ChallengeTable challenges={challenges} />
    </div>
  );
}
