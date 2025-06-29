// src/pages/ChallengesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ChallengeForm from '../components/ChallengeForm';

const BASE_URL = 'http://localhost:5000';

export default function ChallengesPage({ searchQuery }) {
  const [challenges, setChallenges] = useState([]);
  const [joinedIds, setJoinedIds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    fetchChallenges();
    if (user) {
      axios.get(`${BASE_URL}/users/${user.id}/profile`)
        .then(res => setJoinedIds(res.data.challenges.map(c => c.id)));
    }
  }, []);

  const fetchChallenges = () => {
    axios.get(`${BASE_URL}/challenges`)
      .then(res => setChallenges(res.data));
  };

  const handleJoin = async (challengeId) => {
    try {
      await axios.post(`${BASE_URL}/challenges/${challengeId}/join`);
      // Refresh joined challenges list
      if (currentUser) {
        const res = await axios.get(`${BASE_URL}/users/${currentUser.id}/profile`);
        setJoinedIds(res.data.challenges.map(c => c.id));
      }
    } catch (error) {
      console.error("Failed to join challenge", error);
    }
  };

  const handleSaveChallenge = async (challengeData) => {
    // Always include created_by
    await axios.post(`${BASE_URL}/challenges`, {
      ...challengeData,
      created_by: currentUser.id,
    });
    handleCloseModal();
    navigate("/home"); // Redirect to feed after creation
  };

  const handleCloseModal = () => {
    const params = new URLSearchParams(location.search);
    params.delete('add');
    navigate({ search: params.toString() }, { replace: true });
  };

  // Check if we're in "add" mode
  const params = new URLSearchParams(location.search);
  const isAddMode = params.get('add') === '1';

  // Filter challenges based on search query
  const filteredChallenges = challenges.filter(challenge =>
    challenge.name.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    challenge.description.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  if (isAddMode && currentUser) {
    // Only show the creation form
    return (
      <ChallengeForm
        onClose={handleCloseModal}
        onSave={handleSaveChallenge}
        currentUser={currentUser}
      />
    );
  }

  // Otherwise, show the filtered challenge list
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Challenges</h2>
      <ul>
        {filteredChallenges.map(challenge => (
          <li key={challenge.id} className="mb-4 p-4 border rounded">
            <div className="font-bold">{challenge.name}</div>
            <div>{challenge.description}</div>
            {currentUser && challenge.created_by !== currentUser.id && !joinedIds.includes(challenge.id) && (
              <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => handleJoin(challenge.id)}
              >
                Join Challenge
              </button>
            )}
            {joinedIds.includes(challenge.id) && (
              <span className="ml-2 text-green-600 font-semibold">Joined</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
