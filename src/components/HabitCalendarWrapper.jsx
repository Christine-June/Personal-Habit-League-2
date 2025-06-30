import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  format, 
  parseISO, 
  isValid, 
  isWithinInterval, 
  startOfMonth, 
  endOfMonth, 
  addMonths,
  subMonths,
  isSameDay, 
  startOfWeek, 
  endOfWeek, 
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  startOfDay,
  endOfDay
} from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import HabitCalendar from './HabitCalendar';
import DayView from './DayView';
import WeekView from './WeekView';
import { useHabits } from '../context/HabitsContext';

const HabitCalendarWrapper = ({ 
  habits = [], 
  selectedDate = new Date(), 
  onDateSelect, 
  viewMode = 'month', 
  onViewModeChange,
  className, 
  theme,
  fetchHabits 
}) => {
  const { createHabitEntry, updateHabitEntry } = useHabits();
  // Get the start and end of the current month for filtering
  const currentMonth = useMemo(() => startOfMonth(selectedDate), [selectedDate]);
  const monthEnd = useMemo(() => endOfMonth(currentMonth), [currentMonth]);

  // Handle toggling habit status for a specific day
  const toggleHabitStatus = useCallback(async (habit, date) => {
    if (!habit || !date) return;
    
    try {
      const dateKey = format(date, 'yyyy-MM-dd');
      const existingEntry = habit.entries?.[dateKey];
      
      console.log('Toggling habit status:', { habitId: habit.id, date: dateKey, existingEntry });
      
      // Define the status rotation: not_started -> completed -> skipped -> partial -> not_started
      const statusRotation = {
        'not_started': 'completed',
        'completed': 'skipped',
        'skipped': 'partial',
        'partial': 'not_started'
      };
      
      // Get current status, default to 'not_started' if no entry exists
      const currentStatus = existingEntry?.progress || 'not_started';
      const newStatus = statusRotation[currentStatus] || 'completed';
      
      console.log('Status change:', { currentStatus, newStatus });
      
      if (existingEntry && existingEntry.id) {
        // Update existing entry
        console.log('Updating existing entry:', existingEntry.id, { progress: newStatus });
        const updatedEntry = await updateHabitEntry(existingEntry.id, {
          progress: newStatus,
          date: dateKey
        });
        console.log('Entry updated:', updatedEntry);
      } else {
        // Create new entry
        console.log('Creating new entry for habit:', habit.id, { date: dateKey, progress: newStatus });
        const newEntry = await createHabitEntry({
          habit_id: habit.id,
          date: dateKey,
          progress: newStatus
        });
        console.log('New entry created:', newEntry);
      }
      
      // Force refresh of habits data
      if (fetchHabits) {
        await fetchHabits();
      }
      
    } catch (error) {
      console.error('Error updating habit status:', error);
      // Show error to user
      toast.error(`Failed to update habit: ${error.message}`);
    }
  }, [createHabitEntry, updateHabitEntry, fetchHabits]);

  // Transform habits data for the calendar
  const transformedHabits = useMemo(() => {
    console.log('Transforming habits in wrapper. Input habits:', habits);
    if (!habits || !Array.isArray(habits)) {
      console.warn('No habits or invalid format in wrapper');
      return [];
    }

    return habits.map(habit => {
      if (!habit) return null;
      
      // Create a map of entries for quick lookup
      const entriesMap = {};
      
      // Handle both array and object formats for entries
      if (habit.entries) {
        if (Array.isArray(habit.entries)) {
          // Handle array format
          habit.entries.forEach(entry => {
            if (!entry || !entry.date) return;
            
            const date = typeof entry.date === 'string' ? parseISO(entry.date) : entry.date;
            if (!isValid(date)) return;
            
            const dateKey = format(date, 'yyyy-MM-dd');
            entriesMap[dateKey] = {
              ...entry,
              date: dateKey,
              completed: entry.progress === 'completed'
            };
          });
        } else if (typeof habit.entries === 'object') {
          // Handle object format (date keys)
          Object.entries(habit.entries).forEach(([dateKey, entry]) => {
            if (!entry || !dateKey) return;
            
            const date = parseISO(dateKey);
            if (!isValid(date)) return;
            
            entriesMap[dateKey] = {
              ...entry,
              date: dateKey,
              completed: entry.progress === 'completed'
            };
          });
        }
      }

      const transformedHabit = {
        ...habit,
        entries: entriesMap,
        color: habit.color || '#3b82f6' // Default color if none provided
      };
      
      console.log(`Transformed habit ${habit.id} (${habit.name}):`, transformedHabit);
      return transformedHabit;
    }).filter(Boolean); // Remove any null entries
  }, [habits]);

  // Show all habits, even those without entries in the current month
  const habitsForView = useMemo(() => {
    return transformedHabits.filter(habit => {
      // Include all habits, even those without entries
      return true;
    });
  }, [transformedHabits]);

  // Navigation handlers for different views
  const navigateDate = useCallback((direction) => {
    try {
      if (!selectedDate) return;
      
      let newDate = new Date(selectedDate); // Create a new date object to avoid mutation
      
      switch (viewMode) {
        case 'day':
          newDate = direction === 'prev' ? subDays(newDate, 1) : addDays(newDate, 1);
          break;
        case 'week':
          newDate = direction === 'prev' ? subWeeks(newDate, 1) : addWeeks(newDate, 1);
          break;
        case 'month':
        default:
          newDate = direction === 'prev' ? subMonths(newDate, 1) : addMonths(newDate, 1);
      }
      
      console.log('Navigating date:', { direction, viewMode, from: selectedDate, to: newDate });
      
      if (onDateSelect) {
        onDateSelect(newDate);
      }
      
      // Force update the view
      setSelectedDate(newDate);
      
    } catch (error) {
      console.error('Error navigating date:', error);
    }
  }, [selectedDate, viewMode, onDateSelect]);

  // Format title based on view mode
  const formatTitle = useCallback(() => {
    switch (viewMode) {
      case 'day':
        return format(selectedDate, 'EEEE, MMMM d, yyyy');
      case 'week':
        const start = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const end = endOfWeek(selectedDate, { weekStartsOn: 0 });
        return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
      case 'month':
      default:
        return format(selectedDate, 'MMMM yyyy');
    }
  }, [selectedDate, viewMode]);

  // Get date range for the current view
  const getViewRange = useCallback(() => {
    switch (viewMode) {
      case 'day':
        return { start: startOfDay(selectedDate), end: endOfDay(selectedDate) };
      case 'week':
        return { 
          start: startOfWeek(selectedDate, { weekStartsOn: 0 }), 
          end: endOfWeek(selectedDate, { weekStartsOn: 0 }) 
        };
      case 'month':
      default:
        return { 
          start: startOfMonth(selectedDate), 
          end: endOfMonth(selectedDate) 
        };
    }
  }, [selectedDate, viewMode]);

  const viewRange = getViewRange();

  // Filter habits for the current view range
  const filteredHabits = useMemo(() => {
    return habitsForView.filter(habit => {
      // If no entries, show the habit if it's active during the current period
      if (!habit.entries || Object.keys(habit.entries).length === 0) {
        return true;
      }

      // Check if any entry falls within the current view range
      return Object.values(habit.entries).some(entry => {
        const entryDate = typeof entry.date === 'string' ? parseISO(entry.date) : entry.date;
        return isWithinInterval(entryDate, { start: viewRange.start, end: viewRange.end });
      });
    });
  }, [habitsForView, viewRange]);

  // Handle view mode change
  const handleViewModeChange = (newViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(newViewMode);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">
            {formatTitle()}
          </h2>
          <div className="flex space-x-1">
            <button
              onClick={() => navigateDate('prev')}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDateSelect(new Date())}
              className="px-2 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="inline-flex rounded-md shadow-sm">
            {['day', 'week', 'month'].map((mode) => (
              <button
                key={mode}
                onClick={() => handleViewModeChange(mode)}
                className={`px-3 py-1 text-sm font-medium ${
                  viewMode === mode
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300 first:rounded-l-md last:rounded-r-md`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => onDateSelect(new Date())}
            className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Today
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
          {viewMode === 'day' ? (
            <DayView
              date={selectedDate}
              entries={Object.values(transformedHabits.flatMap(habit => 
                Object.entries(habit.entries || {}).map(([date, entry]) => ({
                  ...entry,
                  date,
                  habitId: habit.id,
                  title: habit.name,
                  color: habit.color
                }))
              ))}
              onTimeSlotClick={(time) => {
                // Handle time slot click
                console.log('Time slot clicked:', time);
              }}
              onEventClick={(event) => {
                // Handle event click
                console.log('Event clicked:', event);
              }}
            />
          ) : viewMode === 'week' ? (
            <WeekView
              currentDate={selectedDate}
              entries={Object.values(transformedHabits.flatMap(habit => 
                Object.entries(habit.entries || {}).map(([date, entry]) => ({
                  ...entry,
                  date,
                  habitId: habit.id,
                  title: habit.name,
                  color: habit.color
                }))
              ))}
              onDayClick={onDateSelect}
              onEventClick={(event) => {
                // Handle event click
                console.log('Event clicked:', event);
              }}
            />
          ) : (
            <HabitCalendar
              habits={filteredHabits}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              onHabitClick={toggleHabitStatus}
              className={`flex-1 ${className}`}
              theme={{
                primary: theme?.primary || '#3b82f6',
                secondary: theme?.secondary || '#f3f4f6',
                text: theme?.text || '#111827',
                textMuted: theme?.textMuted || '#6b7280',
                background: theme?.background || '#ffffff',
                border: theme?.border || '#e5e7eb'
              }}
            />
          )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
            <span>Completed</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-yellow-500 mr-1" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center">
            <XCircle className="w-4 h-4 text-gray-400 mr-1" />
            <span>Skipped</span>
          </div>
        </div>
        <div className="text-xs">
          Click on a habit to cycle through statuses
        </div>
      </div>
    </div>
  );
};

HabitCalendarWrapper.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      color: PropTypes.string,
      frequency: PropTypes.string,
      category: PropTypes.string,
      entries: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.objectOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            habit_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            date: PropTypes.string,
            completed: PropTypes.bool,
            progress: PropTypes.oneOf(['not_started', 'in-progress', 'completed', 'skipped', 'partial']),
            notes: PropTypes.string,
            created_at: PropTypes.string,
            updated_at: PropTypes.string
          })
        )
      ])
    })
  ),
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number
  ]),
  onDateSelect: PropTypes.func,
  viewMode: PropTypes.oneOf(['day', 'week', 'month']),
  onViewModeChange: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    text: PropTypes.string,
    textMuted: PropTypes.string,
    background: PropTypes.string,
    border: PropTypes.string
  }),
  fetchHabits: PropTypes.func
};

HabitCalendarWrapper.defaultProps = {
  habits: [],
  selectedDate: new Date(),
  viewMode: 'month',
  onViewModeChange: () => {},
  className: '',
  theme: {},
  fetchHabits: () => {}
};

export default HabitCalendarWrapper;
