import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ChallengeEntriesPage() {
  const query = useQuery();
  const challengeId = query.get('challengeId');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!challengeId) {
      setError('No challenge selected');
      setLoading(false);
      return;
    }
    fetch(`/api/challenges/${challengeId}/entries`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => setEntries(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [challengeId]);

  if (loading) return <div className="p-4">Loading entries...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Challenge Entries</h1>
      {entries.length === 0 ? (
        <p>No entries found for this challenge.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map(entry => (
            <li key={entry.id} className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold">{entry.username}</div>
              <div className="text-gray-600">{entry.content}</div>
              <div className="text-xs text-gray-400">{new Date(entry.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}