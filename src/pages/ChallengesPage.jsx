// src/pages/ChallengesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [joinedIds, setJoinedIds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch challenges
    fetchChallenges();
    // Fetch current user and their joined challenges
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
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
      await axios.post(`${BASE_URL}/challenge-participants`, { challenge_id: challengeId }, {
        withCredentials: true,
      });
      setJoinedIds([...joinedIds, challengeId]);
      alert('Joined challenge!');
    } catch (err) {
      alert('Could not join challenge.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Challenges</h2>
      <ul>
        {challenges.map(challenge => (
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
