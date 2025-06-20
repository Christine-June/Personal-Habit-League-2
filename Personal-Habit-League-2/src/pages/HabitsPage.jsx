import React, { useEffect, useState } from 'react';
import { getHabits, joinHabit } from '../api'; 
import { Button } from '@/components/ui/button'; 
import { Card, CardContent } from '@/components/ui/card';

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState({}); 

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await getHabits(); // axios call
      setHabits(response.data);
    } catch (err) {
      console.error('Failed to fetch habits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (habitId) => {
    try {
      await joinHabit(habitId);
      setJoined((prev) => ({ ...prev, [habitId]: true }));
    } catch (err) {
      console.error('Failed to join habit:', err);
    }
  };

  if (loading) return <p className="p-4">Loading habits...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Habit Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{habit.name}</h2>
              <p className="text-gray-600 mt-1">{habit.description}</p>
              <Button
                className="mt-3"
                disabled={joined[habit.id]}
                onClick={() => handleJoin(habit.id)}
              >
                {joined[habit.id] ? 'Joined' : 'Join Challenge'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HabitsPage;
