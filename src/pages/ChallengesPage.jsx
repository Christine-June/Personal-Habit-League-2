import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/challenges')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => setChallenges(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading challenges...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Challenges</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map(challenge => (
          <div key={challenge.id} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">{challenge.name}</h2>
            <p className="text-gray-600">{challenge.description}</p>
            <Link
              to={`/challenge-entries?challengeId=${challenge.id}`}
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              View Entries
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}