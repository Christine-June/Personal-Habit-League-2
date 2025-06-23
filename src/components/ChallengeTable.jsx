import React from 'react';
import { Link } from 'react-router-dom';

export default function ChallengeTable({ challenges }) {
  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Start Date</th>
          <th className="py-2 px-4 border-b">End Date</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {challenges.map((challenge) => (
          <tr key={challenge.id}>
            <td className="py-2 px-4 border-b">{challenge.name}</td>
            <td className="py-2 px-4 border-b">{challenge.description}</td>
            <td className="py-2 px-4 border-b">{challenge.start_date}</td>
            <td className="py-2 px-4 border-b">{challenge.end_date}</td>
            <td className="py-2 px-4 border-b">
              <Link
                to={`/challenge-entries?challengeId=${challenge.id}`}
                className="text-blue-600 hover:underline"
              >
                View Entries
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}