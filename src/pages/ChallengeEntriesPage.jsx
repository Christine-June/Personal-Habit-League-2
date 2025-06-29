import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChallengeEntriesPage() {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/challenge-entries?challenge_id=${id}`)
      .then(res => setEntries(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading entries...</div>;

  return (
    <div>
      <h1>Entries for Challenge {id}</h1>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            {entry.progress} on {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}