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
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Users</h1>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {users.map((u) => (
          <li key={u.id}>
            <Link
              to={`/users/${u.id}`}
              className="block p-4 rounded-2xl bg-zinc-900/60 shadow hover:shadow-lg transition"
            >
              <img
                src={u.avatarUrl || PLACEHOLDER}
                alt={`${u.name} avatar`}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
              />
              <p className="text-center font-medium">{u.name}</p>
              <p className="text-center text-xs text-zinc-400 truncate">
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
        <div key={i} className="h-44 rounded-xl bg-zinc-800 animate-pulse" />
      ))}
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="py-10 text-center text-red-500">
      <p>Couldn’t fetch users.</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
