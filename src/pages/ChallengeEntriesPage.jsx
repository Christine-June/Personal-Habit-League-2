import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChallengeEntries, addChallengeEntry } from '../api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ChallengeEntriesPage = () => {
  const { challengeId } = useParams(); 
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');

  useEffect(() => {
    fetchEntries();
  }, [challengeId]);

  const fetchEntries = async () => {
    try {
      const response = await getChallengeEntries(challengeId);
      setEntries(response.data);
    } catch (error) {
      console.error('Failed to fetch challenge entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async () => {
    try {
      const newEntry = {
        status: 'completed',
        note,
        entry_date: new Date().toISOString().split('T')[0], 
      };
      const response = await addChallengeEntry(challengeId, newEntry);
      setEntries((prev) => [...prev, response.data]);
      setNote('');
    } catch (error) {
      console.error('Failed to add challenge entry:', error);
    }
  };

  if (loading) return <p className="p-4">Loading entries...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Challenge Entries</h1>

      {/* Add Entry */}
      <div className="mb-6">
        <Textarea
          placeholder="Add a note for today's entry..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddEntry} disabled={!note.trim()}>
          Add Entry
        </Button>
      </div>

      {/* Entry List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">
                {new Date(entry.entry_date).toLocaleDateString()}
              </p>
              <h2 className="text-lg font-semibold capitalize">{entry.status}</h2>
              <p className="text-sm mt-1">{entry.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChallengeEntriesPage;
