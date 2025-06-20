// src/api.js

// Dummy function to simulate fetching habit entries
export const getHabitEntries = async () => {
  return [
    {
      id: '1',
      habitId: 'habit-1',
      date: '2024-06-20',
      value: 'Done',
      notes: 'Completed successfully'
    },
    {
      id: '2',
      habitId: 'habit-2',
      date: '2024-06-19',
      value: 'Skipped',
      notes: 'Was busy today'
    }
  ];
};

// Dummy function to simulate creating a new habit entry
export const createHabitEntry = async (newEntry) => {
  console.log('Creating new habit entry:', newEntry);
  return {
    ...newEntry,
    id: String(Date.now()) // Simulate backend ID generation
  };
};
