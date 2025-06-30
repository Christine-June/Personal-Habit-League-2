import React, { useMemo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  getDay,
  startOfWeek,
  endOfWeek
} from 'date-fns';

const CalendarView = ({
  currentMonth,
  selectedDate,
  onDateClick,
  entriesByDate = {},
  getDayCompletionRate = () => 0,
  isDateSelectable = () => true
}) => {
  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  // Day names for the header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Check if a date is in the current month
  const isCurrentMonth = (day) => isSameMonth(day, monthStart);

  // Handle day click
  const handleDayClick = (day) => {
    if (isDateSelectable(day)) {
      onDateClick(day);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dayNames.map((day) => (
          <div key={day} className="bg-gray-100 py-2 text-center text-xs font-medium text-gray-500">
            {day[0]}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((day, i) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const isSelected = isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const dayEntries = entriesByDate[dateKey] || [];
          const completionRate = getDayCompletionRate(day);
          const isSelectable = isDateSelectable(day);
          const isInCurrentMonth = isCurrentMonth(day);

          return (
            <div
              key={dateKey}
              onClick={() => handleDayClick(day)}
              className={`relative min-h-[100px] p-1 bg-white ${
                !isInCurrentMonth ? 'text-gray-400' : 'hover:bg-gray-50'
              } ${isSelected ? 'ring-2 ring-blue-500 z-10' : ''} ${
                !isSelectable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              aria-label={format(day, 'EEEE, MMMM d, yyyy')}
            >
              {/* Day number */}
              <div className="flex justify-between items-center">
                <span className={`text-sm p-1 ${
                  isTodayDate ? 'font-bold text-blue-600' : ''
                }`}>
                  {format(day, 'd')}
                </span>
                {isTodayDate && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                )}
              </div>

              {/* Entries preview */}
              <div className="mt-1 space-y-0.5">
                {dayEntries.slice(0, 2).map((entry, idx) => (
                  <div
                    key={`${dateKey}-${idx}`}
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: entry.color || '#3b82f6' }}
                    title={entry.name}
                  />
                ))}
                {dayEntries.length > 2 && (
                  <div className="text-xs text-gray-400 text-center">
                    +{dayEntries.length - 2}
                  </div>
                )}
              </div>

              {/* Completion indicator */}
              {completionRate > 0 && isInCurrentMonth && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
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

export default CalendarView;
