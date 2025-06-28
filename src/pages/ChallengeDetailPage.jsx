// src/pages/ChallengeDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getChallenges } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Card, CardContent } from '@/components/ui/card';

export default function ChallengeDetailPage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const allChallenges = await getChallenges();
        const currentChallenge = allChallenges.find(c => c.id === parseInt(challengeId));
        setChallenge(currentChallenge);
      } catch (err) {
        setError(err.message || 'Failed to fetch challenge details.');
        toast.error('Could not load challenge data.');
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!challenge) return <ErrorMessage message="Challenge not found." />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Challenge Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div>
              <h1 className="text-3xl font-bold">{challenge.name}</h1>
              <p className="text-gray-500 mt-1">{challenge.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                  {challenge.start_date} to {challenge.end_date}
              </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getChallenges, getChallengeParticipants } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Card, CardContent } from '@/components/ui/card';

export default function ChallengeDetailPage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [allChallenges, participantsData] = await Promise.all([
        getChallenges(),
        getChallengeParticipants(challengeId),
      ]);
      const currentChallenge = allChallenges.find(c => c.id === parseInt(challengeId));
      setChallenge(currentChallenge);
      setParticipants(participantsData);
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!challenge) return <ErrorMessage message="Challenge not found." />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Challenge Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div>
              <h1 className="text-3xl font-bold">{challenge.name}</h1>
              <p className="text-gray-500 mt-1">{challenge.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                  {challenge.start_date} to {challenge.end_date}
              </p>
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

        {/* Right column: (Entry Log) */}
        <div className="md:col-span-2">
            {/* Entry Log */}
        </div>
      </div>
    </div>
  );
}

// src/pages/ChallengeDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getChallenges, getChallengeParticipants, addParticipantToChallenge } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ChallengeDetailPage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isParticipant = participants.some(p => p.id === currentUser?.id);

  const fetchData = async () => {
    try {
      const [allChallenges, participantsData] = await Promise.all([
        getChallenges(),
        getChallengeParticipants(challengeId),
      ]);
      const currentChallenge = allChallenges.find(c => c.id === parseInt(challengeId));
      setChallenge(currentChallenge);
      setParticipants(participantsData);
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

  const handleJoin = async () => {
    if (!currentUser) {
        toast.error('You must be logged in to join a challenge.');
        return;
    }
    toast.loading('Joining challenge...');
    try {
        await addParticipantToChallenge(challengeId, { user_id: currentUser.id });
        toast.success('Successfully joined the challenge!');
        fetchData(); // Refresh participants list
    } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to join challenge.');
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
            {!isParticipant && (
                <Button onClick={handleJoin}>Join Challenge</Button>
            )}
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

        {/* Right column: (empty for now) */}
        <div className="md:col-span-2">
            {/* Entry Log will go here */}
        </div>
      </div>
    </div>
  );
}// src/pages/ChallengeDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getChallenges, getChallengeParticipants, addParticipantToChallenge, getChallengeEntries } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ChallengeDetailPage() {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleJoin = async () => {
    if (!currentUser) {
        toast.error('You must be logged in to join a challenge.');
        return;
    }
    toast.loading('Joining challenge...');
    try {
        await addParticipantToChallenge(challengeId, { user_id: currentUser.id });
        toast.success('Successfully joined the challenge!');
        fetchData();
    } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to join challenge.');
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
            {!isParticipant && (
                <Button onClick={handleJoin}>Join Challenge</Button>
            )}
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

        {/* Right column: Entry Log */}
        <div className="md:col-span-2">
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