import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getHabits, getHabitEntries, createHabitEntry, updateHabitEntry as updateHabitEntryApi, deleteHabitEntry as deleteHabitEntryApi } from '../api';
import { 
  format, 
  subDays, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addMonths, 
  subMonths,
  isWithinInterval,
  parseISO,
  isValid,
  isSameDay
} from 'date-fns';

const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [habitEntries, setHabitEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize with string dates to ensure serialization
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    return {
      startDate: startOfMonth(now).toISOString(),
      endDate: endOfMonth(now).toISOString()
    };
  });
  
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());

  // Format date for API requests
  const formatDateForApi = useCallback((date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'yyyy-MM-dd');
  }, []);

  // Generate date range based on view mode
  const getDateRangeForView = useCallback((date, mode = viewMode) => {
    let start, end;
    const baseDate = date ? (typeof date === 'string' ? new Date(date) : date) : new Date(currentDate);
    
    switch (mode) {
      case 'day':
        start = startOfDay(baseDate);
        end = startOfDay(baseDate);
        break;
      case 'week':
        start = startOfWeek(baseDate, { weekStartsOn: 1 }); // Monday
        end = endOfWeek(baseDate, { weekStartsOn: 1 });
        break;
      case 'month':
      default:
        start = startOfMonth(baseDate);
        end = endOfMonth(baseDate);
    }
    
    return { 
      startDate: start.toISOString(), 
      endDate: end.toISOString() 
    };
  }, [viewMode, currentDate]);

  // Update date range when view mode or current date changes
  useEffect(() => {
    try {
      const newRange = getDateRangeForView(currentDate, viewMode);
      setDateRange(prev => 
        prev.startDate !== newRange.startDate || prev.endDate !== newRange.endDate 
          ? newRange 
          : prev
      );
    } catch (err) {
      console.error('Error updating date range:', err);
      // Reset to default range on error
      const now = new Date();
      setDateRange({
        startDate: startOfMonth(now).toISOString(),
        endDate: endOfMonth(now).toISOString()
      });
    }
  }, [currentDate, viewMode, getDateRangeForView]);

  // Fetch habits and entries
  const fetchHabits = useCallback(async (userId, range = dateRange) => {
    try {
      setLoading(true);
      setError(null);
      
      const [habitsData, entriesData] = await Promise.all([
        getHabits({ user_id: userId }),
        getHabitEntries({
          user_id: userId,
          start_date: formatDateForApi(range.startDate),
          end_date: formatDateForApi(range.endDate)
        })
      ]);
      
      setHabits(habitsData || []);
      setHabitEntries(entriesData?.entries || []);
      
      return entriesData?.entries || [];
    } catch (err) {
      console.error('Failed to fetch habits:', err);
      setError('Failed to load habits');
      return [];
    } finally {
      setLoading(false);
    }
  }, [dateRange, formatDateForApi]);

  const addHabit = (newHabit) => {
    if (newHabit && newHabit.id) {
      setHabits(prev => [...prev, newHabit]);
    }
  };

  const updateHabit = (updatedHabit) => {
    if (updatedHabit && updatedHabit.id) {
      setHabits(prev => prev.map(habit => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      ));
    }
  };

  const deleteHabit = (habitId) => {
    if (habitId) {
      setHabits(prev => prev.filter(habit => habit.id !== habitId));
      // Also remove related entries
      setHabitEntries(prev => prev.filter(entry => entry.habit_id !== habitId));
    }
  };

  // Get entries for a specific date
  const getEntriesForDate = useCallback((date) => {
    if (!date || !isValid(parseISO(date))) return [];
    return habitEntries.filter(entry => 
      isSameDay(parseISO(entry.date), parseISO(date))
    );
  }, [habitEntries]);

  // Get entries for a specific habit
  const getEntriesForHabit = useCallback((habitId) => {
    if (!habitId) return [];
    return habitEntries.filter(entry => entry.habit_id === habitId);
  }, [habitEntries]);

  // Add or update a habit entry
  const addHabitEntry = useCallback(async (entryData) => {
    try {
      setLoading(true);
      let newEntry;
      
      // Check if entry exists for this habit and date
      const existingEntry = habitEntries.find(e => 
        e.habit_id === entryData.habit_id && 
        isSameDay(parseISO(e.date), parseISO(entryData.date))
      );

      if (existingEntry) {
        // Update existing entry
        newEntry = await updateHabitEntryApi(existingEntry.id, entryData);
        setHabitEntries(prev => 
          prev.map(entry => entry.id === existingEntry.id ? newEntry : entry)
        );
      } else {
        // Create new entry
        newEntry = await createHabitEntry(entryData);
        setHabitEntries(prev => [...prev, newEntry]);
      }
      
      return newEntry;
    } catch (err) {
      console.error('Failed to save habit entry:', err);
      setError('Failed to save habit entry');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [habitEntries]);

  const updateHabitEntry = async (updatedEntry) => {
    if (!updatedEntry?.id) return;
    
    try {
      setLoading(true);
      const result = await updateHabitEntryApi(updatedEntry.id, updatedEntry);
      setHabitEntries(prev => 
        prev.map(entry => entry.id === updatedEntry.id ? result : entry)
      );
      return result;
    } catch (err) {
      console.error('Failed to update habit entry:', err);
      setError('Failed to update habit entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteHabitEntry = async (entryId) => {
    if (!entryId) return;
    
    try {
      setLoading(true);
      await deleteHabitEntryApi(entryId);
      setHabitEntries(prev => prev.filter(entry => entry.id !== entryId));
    } catch (err) {
      console.error('Failed to delete habit entry:', err);
      setError('Failed to delete habit entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    // State
    habits,
    habitEntries,
    loading,
    error,
    dateRange: {
      startDate: dateRange.startDate ? new Date(dateRange.startDate) : null,
      endDate: dateRange.endDate ? new Date(dateRange.endDate) : null
    },
    viewMode,
    currentDate: currentDate ? new Date(currentDate) : new Date(),
    
    // Actions
    fetchHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    addHabitEntry,
    updateHabitEntry,
    deleteHabitEntry,
    
    // Utility functions
    getEntriesForDate,
    getEntriesForHabit,
    setViewMode,
    setCurrentDate: (date) => setCurrentDate(date instanceof Date ? date.toISOString() : date),
    setDateRange: (range) => {
      if (!range) return;
      setDateRange({
        startDate: range.startDate instanceof Date ? range.startDate.toISOString() : range.startDate,
        endDate: range.endDate instanceof Date ? range.endDate.toISOString() : range.endDate
      });
    },
    formatDateForApi,
    getDateRangeForView: (date, mode) => {
      const range = getDateRangeForView(date, mode);
      return {
        startDate: new Date(range.startDate),
        endDate: new Date(range.endDate)
      };
    }
  }), [
    habits,
    habitEntries,
    loading,
    error,
    dateRange.startDate,
    dateRange.endDate,
    viewMode,
    currentDate,
    fetchHabits,
    getEntriesForDate,
    getEntriesForHabit,
    getDateRangeForView,
    formatDateForApi
  ]);

  return (
    <HabitsContext.Provider value={contextValue}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
}