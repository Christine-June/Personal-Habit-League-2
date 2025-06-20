import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChallengeParticipants, addParticipantToChallenge } from '../api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChallengeParticipantsPage = () => {
  const { challengeId } = useParams(); // get from URL like /challenges/:challengeId/participants
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    fetchParticipants();
  }, [challengeId]);

  const fetchParticipants = async () => {
    try {
      const response = await getChallengeParticipants(challengeId);
      setParticipants(response.data);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddParticipant = async () => {
    if (!newUsername.trim()) return;
    try {
      const response = await addParticipantToChallenge(challengeId, {
        username: newUsername,
      });
      setParticipants((prev) => [...prev, response.data]);
      setNewUsername('');
    } catch (error) {
      console.error('Failed to add participant:', error);
    }
  };

  if (loading) return <p className="p-4">Loading participants...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Challenge Participants</h1>

      {/* Add participant form */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <Button onClick={handleAddParticipant}>Add Participant</Button>
      </div>

      {/* Participant list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {participants.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{p.username}</h2>
              <p className="text-sm text-gray-500">
                Joined: {new Date(p.joined_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChallengeParticipantsPage;
