import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const PLACEHOLDER = '/placeholder-avatar.svg';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('http://localhost:5000/users')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
          toast.success('Users loaded successfully!');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          toast.error(`Failed to fetch users: ${err.message}`);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        League Members
      </h1>

      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {users.map((u) => (
          <li key={u.id}>
            <Link
              to={`/users/${u.id}`}
              className="block bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl shadow-md hover:shadow-lg p-6 transition"
            >
              <img
                src={u.avatar_url || PLACEHOLDER}
                alt={`${u.username} avatar`}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-2 border-indigo-500"
              />
              <p className="text-center font-semibold text-gray-800 dark:text-white">
                {u.username}
              </p>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 truncate">
                {u.email}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-44 rounded-xl bg-zinc-800/30 animate-pulse" />
      ))}
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="py-10 text-center text-red-500">
      <p className="font-semibold">Couldn’t fetch users.</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
