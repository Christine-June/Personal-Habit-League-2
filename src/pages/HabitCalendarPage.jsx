import React, { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';

// Components
import HabitCalendarWrapper from '../components/HabitCalendarWrapper';
import HabitModal from '../components/HabitModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { Button } from '../components/ui/button';

// Hooks
import { useHabits } from '../context/HabitsContext';
import { useHabitManagement } from '../hooks/useHabitManagement';
import { useCalendar } from '../hooks/useCalendar';
import { useHabitCalendarData } from '../hooks/useHabitCalendarData';

const HabitCalendarPage = () => {
  const { 
    habits, 
    loading: habitsLoading, 
    fetchHabits, 
    addHabit, 
    updateHabit,
    habitEntries
  } = useHabits();
  
  // Use custom hooks
  const {
    isModalOpen,
    selectedHabit,
    filters,
    categories,
    openHabitModal,
    closeHabitModal,
    handleFilterChange,
    resetFilters
  } = useHabitManagement(habits);
  
  const [viewMode, setViewMode] = useState('month');
  
  const {
    selectedDate,
    currentMonth,
    formattedDate,
    handleDateSelect,
    handleMonthChange,
  } = useCalendar('month');
  
  // Handle view mode change
  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
  };
  
  // Transform habits data for calendar
  const { calendarHabits, getHabitEntriesForDate } = useHabitCalendarData(habits, habitEntries);
  
  // Memoize the filtered habits with enhanced filtering
  const filteredHabits = useMemo(() => {
    if (!calendarHabits || !Array.isArray(calendarHabits)) return [];
    
    return calendarHabits.filter(habit => {
      // Filter by status
      const hasEntries = habit.entries && Object.keys(habit.entries).length > 0;
      const isCompleted = hasEntries && Object.values(habit.entries).some(entry => entry.completed);
      
      if (filters.status === 'completed' && !isCompleted) return false;
      if (filters.status === 'in-progress' && (!hasEntries || isCompleted)) return false;
      if (filters.status === 'not-started' && hasEntries) return false;
      
      // Filter by category
      if (filters.category !== 'all' && habit.category !== filters.category) {
        return false;
      }
      
      // Filter by search term
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!habit.name.toLowerCase().includes(searchLower) && 
            !(habit.description && habit.description.toLowerCase().includes(searchLower))) {
          return false;
        }
      }
      
      return true;
    });
  }, [calendarHabits, filters]);
  
  // Get entries for the selected date
  const selectedDateEntries = useMemo(() => {
    return getHabitEntriesForDate(selectedDate);
  }, [selectedDate, getHabitEntriesForDate]);

  // Handle habit form submission
  const handleHabitSubmit = async (habitData) => {
    try {
      if (selectedHabit) {
        await updateHabit({ ...selectedHabit, ...habitData });
        toast.success('Habit updated successfully');
      } else {
        await addHabit(habitData);
        toast.success('Habit added successfully');
      }
      closeHabitModal();
    } catch (error) {
      console.error('Error saving habit:', error);
      toast.error('Failed to save habit');
    }
  };



  // Fetch habits on component mount
  useEffect(() => {
    const loadHabits = async () => {
      try {
        await fetchHabits();
      } catch (error) {
        console.error('Failed to load habits:', error);
        toast.error('Failed to load habits');
      }
    };
    
    loadHabits();
  }, [fetchHabits]);
  
  // Use the handlers from useCalendar hook directly
  // No need to redefine them here

  if (habitsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Habit Calendar</h1>
        <Button onClick={() => openHabitModal()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Habit
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange({ status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="not-started">Not Started</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange({ category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
              placeholder="Search habits..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        <HabitCalendarWrapper
          habits={filteredHabits}
          selectedDate={selectedDate}
          viewMode={viewMode}
          onDateSelect={handleDateSelect}
          onViewModeChange={handleViewModeChange}
          className="flex-1"
          fetchHabits={fetchHabits}
        />
        
        {/* Selected Date Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-3">{formattedDate}</h3>
          {selectedDateEntries.length > 0 ? (
            <ul className="space-y-2">
              {selectedDateEntries.map(habit => (
                <li key={habit.id} className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: habit.color }} />
                  <span>{habit.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No habits for this day</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <HabitModal
          users={[{ id: 1, username: 'Current User' }]} // Replace with actual users from your auth context
          habit={selectedHabit}
          onClose={closeHabitModal}
          onSubmit={handleHabitSubmit}
        />
      )}
    </div>
  );
};

export default HabitCalendarPage;