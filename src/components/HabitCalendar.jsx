import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
  isValid,
  isBefore,
  isAfter,
  isWithinInterval,
  subDays,
  addDays
} from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Clock,
  XCircle,
  Filter,
  Plus
} from 'lucide-react';

const HabitCalendar = ({
  habits = [],
  selectedDate = new Date(),
  onDateSelect = () => {},
  onHabitClick = () => {},
  className = '',
  theme = {
    primary: '#3b82f6',
    secondary: '#f3f4f6',
    text: '#111827',
    textMuted: '#6b7280',
    background: '#ffffff',
    border: '#e5e7eb'
  }
}) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));

  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // Navigation functions
  const prevMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);

  const days = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);
  
  // Check if a date has any habits
  const hasHabitsOnDate = useCallback((date) => {
    if (!date) return false;
    
    try {
      const dateKey = format(date, 'yyyy-MM-dd');
      return habits.some(habit => {
        if (!habit || !habit.entries) return false;
        
        // Check if there's an entry for this date
        if (dateKey in habit.entries) {
          const entry = habit.entries[dateKey];
          return entry !== null && entry !== undefined;
        }
        
        return false;
      });
    } catch (error) {
      console.error('Error checking habits on date:', error, { date });
      return false;
    }
  }, [habits]);
  
  // Get completion status for a habit on a specific date
  const getHabitStatus = useCallback((habit, date) => {
    if (!habit || !date) return 'not-started';
    
    try {
      const dateKey = format(date, 'yyyy-MM-dd');
      const entry = habit.entries && habit.entries[dateKey];
      
      if (!entry) return 'not-started';
      
      // Handle different entry formats
      if (typeof entry.progress === 'string') {
        return entry.progress; // 'completed', 'in-progress', 'not-started', 'skipped'
      } else if (typeof entry.completed === 'boolean') {
        return entry.completed ? 'completed' : 'in-progress';
      }
      
      return 'not-started';
    } catch (error) {
      console.error('Error getting habit status:', error, { habit, date });
      return 'not-started';
    }
  }, []);

  // Handle habit click
  const handleHabitClick = (e, habit, day) => {
    e.stopPropagation();
    if (onHabitClick && typeof onHabitClick === 'function') {
      onHabitClick(habit, day);
    }
  };

  // Group habits by date for quick lookup and ensure all habits appear for each day
  const habitsByDate = useMemo(() => {
    console.log('Processing habits for calendar view. Total habits:', habits?.length);
    const result = {};
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });
    
    // First, collect all unique habits
    const allHabits = [];
    const habitMap = new Map();
    
    // Debug: Log all habits and their entries
    console.log('All habits with entries:', JSON.parse(JSON.stringify(habits)));
    
    habits.forEach(habit => {
      if (!habitMap.has(habit.id)) {
        habitMap.set(habit.id, {
          ...habit,
          entries: new Map()
        });
      }
      // Store entries in a map for quick lookup
      if (habit.entries && typeof habit.entries === 'object') {
        Object.entries(habit.entries).forEach(([dateKey, entry]) => {
          console.log(`Adding entry for habit ${habit.id} on ${dateKey}:`, entry);
          habitMap.get(habit.id).entries.set(dateKey, entry);
        });
      }
    });
    
    allHabits.push(...habitMap.values());
    console.log('Processed habits with entries:', Array.from(habitMap.values()));
    
    // For each day in the view
    allDays.forEach(day => {
      const dayKey = format(day, 'yyyy-MM-dd');
      result[dayKey] = [];
      
      // Add all habits for each day, even if they don't have an entry
      allHabits.forEach(habit => {
        const entry = habit.entries.get(dayKey);
        
        result[dayKey].push({
          ...habit,
          date: day,
          isCompleted: entry?.progress === 'completed',
          entry: entry || null,
          hasEntry: !!entry,
          progress: entry?.progress || 'not_started'
        });
      });
      
      // Sort habits: completed first, then in-progress, then not started
      result[dayKey].sort((a, b) => {
        const statusOrder = { 'completed': 0, 'partial': 1, 'skipped': 2, 'not_started': 3 };
        return statusOrder[a.progress] - statusOrder[b.progress] || 
               a.name?.localeCompare(b.name) || 0;
      });
    });
    
    console.log('Final habitsByDate structure:', result);
    return result;
  }, [habits, startDate, endDate]);

  // Calculate completion rate for a day (0-100)
  const getDayCompletionRate = (day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    const dayHabits = habitsByDate[dateKey] || [];
    
    if (dayHabits.length === 0) return 0;
    
    const totalTracked = dayHabits.filter(h => h.hasEntry).length;
    if (totalTracked === 0) return 0;
    
    const completedCount = dayHabits.filter(h => h.progress === 'completed').length;
    return Math.round((completedCount / totalTracked) * 100);
  };

  // Navigation handlers
  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentMonth(startOfMonth(today));
    if (onDateSelect) {
      onDateSelect(today);
    }
    // Force update the view
    setCurrentMonth(prev => {
      const newMonth = startOfMonth(today);
      return isSameDay(prev, newMonth) ? addDays(newMonth, 1) : newMonth;
    });
  }, [onDateSelect]);

  // Check if a date is in the current month
  const isCurrentMonth = (day) => isSameMonth(day, monthStart);

  // Handle day click
  const handleDayClick = (day) => {
    onDateSelect(day);
  };

  // Day names for the header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`habit-calendar relative ${className}`} style={{ 
      backgroundColor: theme.background, 
      color: theme.text, 
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      padding: '1rem',
      overflow: 'hidden'
    }}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: theme.border }}>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-lg font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={goToToday}
          className="px-3 py-1 text-sm rounded-md hover:bg-gray-100 transition-colors"
          style={{ color: theme.primary }}
        >
          Today
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 text-center text-xs font-medium border-b" style={{ borderColor: theme.border }}>
        {dayNames.map((day) => (
          <div key={day} className="py-2" style={{ color: theme.textMuted }}>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 flex-1 overflow-hidden">
        {days.map((day, i) => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const dayHabits = habitsByDate[dayKey] || [];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = isSameDay(day, selectedDate);
          const isDayToday = isToday(day);
          const dayNumber = format(day, 'd');
          const isWeekend = [0, 6].includes(day.getDay());
          const hasHabits = hasHabitsOnDate(day);
          
          // Calculate completion stats for the day
          const totalHabits = dayHabits.length;
          const completedHabits = dayHabits.filter(h => h.completed).length;
          const completionRate = totalHabits > 0 
            ? Math.round((completedHabits / totalHabits) * 100) 
            : 0;

          return (
            <div 
              key={dayKey}
              onClick={() => handleDayClick(day)}
              className={`
                flex flex-col p-1 border-b border-r relative
                ${!isCurrentMonth ? 'opacity-40' : 'hover:bg-gray-50 cursor-pointer'}
                ${isSelected ? 'ring-2 ring-blue-500 z-10' : ''}
                ${isDayToday ? 'font-bold' : ''}
              `}
              style={{
                minHeight: '100px',
                borderColor: theme.border,
                backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
              }}
              aria-label={format(day, 'EEEE, MMMM d, yyyy')}
            >
              {/* Day number */}
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-medium ${
                  isDayToday 
                    ? 'text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center'
                    : !isCurrentMonth
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}>
                  {dayNumber}
                </span>
                
                {totalHabits > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    completionRate === 100 
                      ? 'bg-green-100 text-green-800' 
                      : completionRate > 0
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {completedHabits}/{totalHabits}
                  </span>
                )}
              </div>

              {/* Habit indicators */}
              <div className="flex-1 overflow-hidden">
                {dayHabits.length > 0 ? (
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {dayHabits.map(habit => {
                      const status = habit.progress || 'not_started';
                      const isActive = isCurrentMonth && isSameDay(day, selectedDate);
                      
                      return (
                        <div 
                          key={`${habit.id}-${dayKey}`}
                          className={`flex items-center text-xs p-1 rounded group cursor-pointer transition-colors ${
                            isActive ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                          }`}
                          onClick={(e) => handleHabitClick(e, habit, day)}
                        >
                          <span className="mr-1 flex-shrink-0">
                            {status === 'completed' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            ) : status === 'partial' ? (
                              <Clock className="w-3.5 h-3.5 text-yellow-500" />
                            ) : status === 'skipped' ? (
                              <XCircle className="w-3.5 h-3.5 text-gray-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-gray-200" />
                            )}
                          </span>
                          <span 
                            className="truncate flex-1 transition-colors"
                            style={{ 
                              color: status === 'not_started' 
                                ? '#9ca3af' 
                                : status === 'skipped'
                                ? '#9ca3af'
                                : (habit.color || theme.primary),
                              textDecoration: status === 'skipped' ? 'line-through' : 'none',
                              fontWeight: status !== 'not_started' ? '500' : 'normal'
                            }}
                          >
                            {habit.name}
                          </span>
                          {status === 'completed' && (
                            <span className="ml-1 text-xs text-green-500">✓</span>
                          )}
                          {status === 'partial' && (
                            <span className="ml-1 text-xs text-yellow-500">•</span>
                          )}
                          {status === 'skipped' && (
                            <span className="ml-1 text-xs text-gray-400">✕</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs text-gray-400">
                      {isCurrentMonth ? 'No habits yet' : ''}
                    </span>
                  </div>
                )}
                {dayHabits.length > 3 && (
                  <div className="text-xs text-gray-400 text-center mt-1">
                    +{dayHabits.length - 3} more
                  </div>
                )}
              </div>

              {/* Completion indicator */}
              {isCurrentMonth && totalHabits > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${completionRate}%`,
                      backgroundColor: 
                        completionRate === 100 ? '#10B981' : 
                        completionRate > 0 ? '#3B82F6' : '#E5E7EB'
                    }}
                    title={`${completedHabits} of ${totalHabits} habits completed`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

HabitCalendar.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      color: PropTypes.string,
      frequency: PropTypes.string,
      category: PropTypes.string,
      completed: PropTypes.bool,
      progress: PropTypes.oneOf(['completed', 'partial', 'skipped', 'not_started'])
    })
  ),
  selectedDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func,
  onHabitClick: PropTypes.func,
  className: PropTypes.string,
  theme: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    text: PropTypes.string,
    textMuted: PropTypes.string,
    background: PropTypes.string,
    border: PropTypes.string
  })
};

export default HabitCalendar;