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