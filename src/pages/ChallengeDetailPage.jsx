// src/pages/ChallengeDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  getChallenges,
  getChallengeParticipants,
  getChallengeEntries,
  createChallengeEntry,
} from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function ChallengeDetailPage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEntry, setNewEntry] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isParticipant = participants.some(p => p.id === currentUser?.id);

  const fetchData = async () => {
    try {
      const [allChallenges, participantsData, entriesData] = await Promise.all([
        getChallenges(),
        getChallengeParticipants(challengeId),
        getChallengeEntries(challengeId),
      ]);

      const currentChallenge = allChallenges.find(c => c.id === parseInt(challengeId));
      setChallenge(currentChallenge);
      setParticipants(participantsData);
      setEntries(entriesData);
    } catch (err) {
      setError(err.message || 'Failed to fetch challenge details.');
      toast.error('Could not load challenge data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [challengeId]);

  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (!newEntry.trim()) {
      toast.error('Entry cannot be empty.');
      return;
    }
    toast.loading('Adding your entry...');
    try {
      await createChallengeEntry(challengeId, {
        user_id: currentUser.id,
        notes: newEntry,
        date: new Date().toISOString().split('T')[0],
      });
      toast.success('Entry added!');
      setNewEntry('');
      fetchData();
    } catch (err) {
      toast.error('Failed to add entry.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!challenge) return <ErrorMessage message="Challenge not found." />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Challenge Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{challenge.name}</h1>
              <p className="text-gray-500 mt-1">{challenge.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {challenge.start_date} to {challenge.end_date}
              </p>
            </div>
            {/* Removed Join Challenge button */}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column: Participants */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Participants ({participants.length})</h2>
          <div className="space-y-3">
            {participants.map(p => (
              <Card key={p.id}>
                <CardContent className="p-3 flex items-center gap-3">
                  <img src={p.avatar_url || '/placeholder-avatar.svg'} alt={p.username} className="w-10 h-10 rounded-full bg-gray-200" />
                  <span className="font-medium">{p.username}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right column: Entries & Add Entry Form */}
        <div className="md:col-span-2">
          {isParticipant && (
            <form onSubmit={handleAddEntry} className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Add Your Progress</h2>
              <Textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="What did you accomplish today?"
                rows={3}
              />
              <Button type="submit" className="mt-2">Submit Entry</Button>
            </form>
          )}

          <h2 className="text-xl font-semibold mb-4">Challenge Log</h2>
          <div className="space-y-4">
            {entries.length > 0 ? entries.map(entry => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={entry.user?.avatar_url || '/placeholder-avatar.svg'} alt={entry.user?.username} className="w-8 h-8 rounded-full bg-gray-200" />
                    <div>
                      <p className="font-semibold">{entry.user?.username || 'A user'}</p>
                      <p className="text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{entry.notes}</p>
                </CardContent>
              </Card>
            )) : <p className="text-gray-500">No entries yet. Be the first!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
