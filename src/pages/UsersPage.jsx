import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PLACEHOLDER = '/placeholder-avatar.svg';

export default function UsersPage() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/users')   
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data  => !cancelled && setUsers(data))
      .catch(err  => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, []);