import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getHabitEntries, createHabitEntry } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function HabitEntriesPage() {
  const [newEntry, setNewEntry] = useState({
    habitId: '',
    date: new Date().toISOString().split('T')[0],
    value: '',
    notes: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const queryClient = useQueryClient();
  
  // Fetch habit entries with error handling
  const { 
    data: entries = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['habitEntries'],
    queryFn: getHabitEntries,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mutation for creating new entry with optimistic updates
  const createEntryMutation = useMutation({
    mutationFn: createHabitEntry,
    onMutate: async (newEntryData) => {
      await queryClient.cancelQueries(['habitEntries']);
      
      const previousEntries = queryClient.getQueryData(['habitEntries']);
      
      queryClient.setQueryData(['habitEntries'], (old) => [
        ...(old || []),
        { ...newEntryData, id: 'temp-id' }
      ]);
      
      return { previousEntries };
    },
    onError: (err, newEntryData, context) => {
      queryClient.setQueryData(['habitEntries'], context.previousEntries);
      setValidationErrors({
        submit: err.message || 'Failed to create entry'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['habitEntries']);
    },
    onSuccess: () => {
      setNewEntry({
        habitId: '',
        date: new Date().toISOString().split('T')[0],
        value: '',
        notes: ''
      });
      setValidationErrors({});
    }
  });

  const validateForm = () => {
    const errors = {};
    if (!newEntry.habitId) errors.habitId = 'Required';
    if (!newEntry.date) errors.date = 'Required';
    if (!newEntry.value) errors.value = 'Required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    createEntryMutation.mutate(newEntry);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Habit Entries</h1>
      
      {/* Entry Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Habit ID</label>
            <input
              type="text"
              name="habitId"
              value={newEntry.habitId}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${validationErrors.habitId ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {validationErrors.habitId && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.habitId}</p>
            )}
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${validationErrors.date ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {validationErrors.date && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.date}</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Value</label>
          <input
            type="text"
            name="value"
            value={newEntry.value}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${validationErrors.value ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {validationErrors.value && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.value}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={newEntry.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          />
        </div>
        
        {validationErrors.submit && (
          <p className="text-red-500 text-sm mb-4">{validationErrors.submit}</p>
        )}
        
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          disabled={createEntryMutation.isLoading}
        >
          {createEntryMutation.isLoading ? 'Submitting...' : 'Submit Entry'}
        </button>
      </form>
      
      {/* Entries List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
        
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries found</p>
        ) : (
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">{entry.habitId}</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {entry.value}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">{entry.date}</span>
                </div>
                {entry.notes && (
                  <p className="mt-2 text-gray-600">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}