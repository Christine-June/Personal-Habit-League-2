import React, { useMemo } from 'react';
import { 
  format, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  isSameDay, 
  isToday, 
  isWeekend,
  addDays,
  parseISO
} from 'date-fns';

const WeekView = ({
  currentDate = new Date(),
  entries = [],
  onDayClick,
  onEventClick,
  className = ''
}) => {
  // Get the week range
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  
  // Generate days of the week
  const days = useMemo(() => {
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [weekStart, weekEnd]);
  
  // Group entries by day
  const entriesByDay = useMemo(() => {
    const result = {};
    days.forEach(day => {
      const dateKey = format(day, 'yyyy-MM-dd');
      result[dateKey] = [];
    });
    
    entries.forEach(entry => {
      const entryDate = typeof entry.date === 'string' ? parseISO(entry.date) : entry.date;
      const dateKey = format(entryDate, 'yyyy-MM-dd');
      
      if (result[dateKey] !== undefined) {
        result[dateKey].push(entry);
      }
    });
    
    return result;
  }, [entries, days]);
  
  // Time slots (for hourly view)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }, []);
  
  const handleEventClick = (event, day) => {
    if (onEventClick) {
      onEventClick(event, day);
    }
  };
  
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header with day names */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-2 border-r border-gray-200">Time</div>
        {days.map((day) => (
          <div 
            key={day.toString()}
            onClick={() => onDayClick && onDayClick(day)}
            className={`p-2 text-center cursor-pointer ${
              isToday(day) ? 'bg-blue-50' : ''
            } ${isWeekend(day) ? 'bg-gray-50' : ''}`}
          >
            <div className="text-sm font-medium">{format(day, 'EEE')}</div>
            <div className={`text-lg ${
              isToday(day) 
                ? 'w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto' 
                : ''
            }`}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      {/* Time slots and events */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8 min-h-[600px]">
          {/* Time column */}
          <div className="border-r border-gray-200">
            {timeSlots.map((time) => (
              <div key={time} className="h-16 border-b border-gray-100 relative">
                <span className="absolute -top-2 left-1 text-xs text-gray-400">
                  {time}
                </span>
              </div>
            ))}
          </div>
          
          {/* Day columns */}
          {days.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayEntries = entriesByDay[dateKey] || [];
            
            return (
              <div 
                key={day.toString()}
                className={`border-r border-gray-200 relative ${
                  isWeekend(day) ? 'bg-gray-50' : ''
                }`}
              >
                {dayEntries.map((entry, index) => {
                  // Calculate position based on time
                  const entryDate = typeof entry.date === 'string' ? parseISO(entry.date) : entry.date;
                  const hour = entryDate.getHours();
                  const minutes = entryDate.getMinutes();
                  const top = hour * 64 + (minutes / 60) * 64; // 64px per hour
                  
                  return (
                    <div
                      key={entry.id || index}
                      onClick={() => handleEventClick(entry, day)}
                      className="absolute left-1 right-1 p-1 text-xs rounded overflow-hidden shadow-sm cursor-pointer"
                      style={{
                        top: `${top}px`,
                        height: '48px',
                        backgroundColor: entry.color ? `${entry.color}20` : '#f0f9ff',
                        borderLeft: `3px solid ${entry.color || '#0ea5e9'}`,
                        zIndex: 10
                      }}
                    >
                      <div className="font-medium truncate">{entry.title || 'Untitled'}</div>
                      <div className="truncate text-gray-600">
                        {format(entryDate, 'h:mm a')}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
