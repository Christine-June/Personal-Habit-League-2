import { useMemo, useCallback } from 'react';
import { isSameDay, parseISO, format } from 'date-fns';

export function useHabitCalendarData(habits = [], entries = []) {
  console.log('useHabitCalendarData - Input habits:', habits);
  console.log('useHabitCalendarData - Input entries:', entries);
  
  const calendarHabits = useMemo(() => {
    if (!habits || !Array.isArray(habits)) {
      console.warn('No habits data or invalid format:', habits);
      return [];
    }

    return habits.map(habit => {
      if (!habit) return null;
      
      // First, get entries from the entries prop
      const entriesFromProp = Array.isArray(entries) 
        ? entries.filter(entry => entry && entry.habit_id === habit.id)
        : [];
      
      // Then, get entries from the habit.entries if it exists
      const entriesFromHabit = habit.entries 
        ? (Array.isArray(habit.entries) 
            ? habit.entries 
            : Object.values(habit.entries || {}))
        : [];
      
      // Combine and deduplicate entries
      const allEntries = [...entriesFromProp, ...entriesFromProp];
      const uniqueEntries = Array.from(new Map(
        allEntries.map(entry => [
          `${entry.habit_id}-${entry.date}`, // Unique key for each entry
          entry
        ])
      ).values());
      
      const habitEntries = uniqueEntries
        .filter(Boolean)
        .sort((a, b) => {
          const dateA = a.date ? (typeof a.date === 'string' ? new Date(a.date) : a.date) : new Date(0);
          const dateB = b.date ? (typeof b.date === 'string' ? new Date(b.date) : b.date) : new Date(0);
          return dateB - dateA; // Sort by most recent first
        });
      
      // Calculate completion stats
      const totalEntries = habitEntries.length;
      const completedEntries = habitEntries.filter(entry => entry.progress === 'completed').length;
      const completionRate = totalEntries > 0 ? Math.round((completedEntries / totalEntries) * 100) : 0;
      const lastUpdated = habitEntries[0]?.date || null;
      
      // Transform habit data for calendar
      const result = {
        ...habit,
        totalEntries,
        completedEntries,
        completionRate,
        lastUpdated,
        entries: {}
      };
      
      // Process entries into date-keyed object
      habitEntries.forEach(entry => {
        if (!entry || !entry.date) return;
        
        try {
          const date = typeof entry.date === 'string' ? parseISO(entry.date) : entry.date;
          if (!isValid(date)) return;
          
          const dateKey = format(date, 'yyyy-MM-dd');
          result.entries[dateKey] = {
            ...entry,
            date: dateKey,
            formattedDate: format(date, 'MMM d, yyyy'),
            completed: entry.progress === 'completed'
          };
        } catch (error) {
          console.error('Error processing entry:', entry, error);
        }
      });
      
      console.log(`Processed habit ${habit.id} (${habit.name}):`, result);
      return result;
    }).filter(Boolean); // Remove any null entries
  }, [habits, entries]);

  const getHabitEntriesForDate = useCallback((date) => {
    if (!date) return [];
    
    const targetDate = date instanceof Date ? date : new Date(date);
    const dateString = format(targetDate, 'yyyy-MM-dd');
    
    return calendarHabits
      .filter(habit => habit.entries[dateString])
      .map(habit => ({
        ...habit,
        entry: habit.entries[dateString]
      }));
  }, [calendarHabits]);

  // Get all unique dates with entries across all habits
  const getAllEntryDates = useCallback(() => {
    const dateSet = new Set();
    calendarHabits.forEach(habit => {
      Object.keys(habit.entries).forEach(date => {
        dateSet.add(date);
      });
    });
    return Array.from(dateSet).sort().reverse(); // Most recent first
  }, [calendarHabits]);

  // Get habits with their completion status for a specific date
  const getHabitsForDate = useCallback((date) => {
    if (!date) return [];
    const dateString = date instanceof Date ? format(date, 'yyyy-MM-dd') : date;
    
    return calendarHabits.map(habit => ({
      ...habit,
      entry: habit.entries[dateString],
      isCompleted: !!habit.entries[dateString]?.completed
    }));
  }, [calendarHabits]);

  return {
    calendarHabits,
    getHabitEntriesForDate,
    getAllEntryDates,
    getHabitsForDate
  };
}
