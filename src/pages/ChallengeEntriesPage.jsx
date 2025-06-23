import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to extract query parameters from the URL.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Component that displays entries submitted for a specific challenge.
 */
export default function ChallengeEntriesPage() {
  const query = useQuery();
  const challengeId = query.get('challengeId');

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch challenge entries when the challengeId changes.
   */
  useEffect(() => {
    if (!challengeId) {
      setError('No challenge selected');
      setLoading(false);
      return;
    }

    fetch(`/api/challenges/${challengeId}/entries`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        setEntries(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [challengeId]);

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center text-gray-700">
        <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-gray-500 rounded-full mr-2"></div>
        Loading entries...
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  // ✅ Render entries
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Challenge Entries</h1>

      {entries.length === 0 ? (
        <p className="text-gray-600">No entries found for this challenge.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map(entry => (
            <li key={entry.id} className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold">{entry.username}</div>
              <div className="text-gray-700 mt-1">{entry.content}</div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(entry.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
