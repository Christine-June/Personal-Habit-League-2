import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'; // ✅ Import toast

export default function HabitEntriesPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    toast.loading('Loading progress entries...'); // ✅ Toast while loading

    fetch('http://localhost:5000/habit-entries')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          setEntries(data.entries || []);
          toast.dismiss(); // ✅ Dismiss loader
          toast.success('Progress entries loaded!');
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          toast.dismiss();
          toast.error(`Failed to load: ${err.message}`);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  if (loading) return <Skeleton />;
  if (error)   return <ErrorState message={error} />;

  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Progress</h1>

      {entries.length === 0 ? (
        <p className="text-zinc-400">No habit entries yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {entries.map(entry => (
            <li key={entry.id} className="p-4 rounded-2xl bg-zinc-900/60 shadow hover:shadow-lg transition">
              <p className="text-sm text-zinc-300 mb-1">
                Habit ID: <span className="font-medium text-white">{entry.habit_id}</span>
              </p>
              <p className="text-sm text-zinc-300 mb-1">
                Progress: <span className="inline-block px-2 py-1 bg-blue-600 rounded text-white text-xs">{entry.progress}</span>
              </p>
              <p className="text-sm text-zinc-400 mb-1">Date: {entry.date}</p>
              {entry.notes && (
                <p className="text-sm text-zinc-500 italic mt-2">{entry.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 rounded-xl bg-zinc-800 animate-pulse" />
      ))}
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="py-10 text-center text-red-500">
      <p>Couldn’t fetch progress entries.</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
