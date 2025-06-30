import React, { useMemo } from 'react';
import { 
  format, 
  isSameDay, 
  isToday, 
  parseISO,
  addMinutes,
  isSameHour,
  isSameMinute,
  setHours,
  setMinutes,
  startOfDay,
  endOfDay
} from 'date-fns';
import { Plus } from 'lucide-react';

const DayView = ({
  date = new Date(),
  entries = [],
  onTimeSlotClick,
  onEventClick,
  className = '',
  workingHours = { start: 8, end: 20 } // 8 AM to 8 PM by default
}) => {
  // Generate time slots for the day
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = workingHours.start; hour <= workingHours.end; hour++) {
      // Add the hour marker
      slots.push({
        time: setMinutes(setHours(date, hour), 0),
        label: format(setHours(date, hour), 'h a')
      });
      
      // Add the half hour marker (optional)
      if (hour < workingHours.end) {
        slots.push({
          time: setMinutes(setHours(date, hour), 30),
          label: format(setMinutes(setHours(date, hour), 30), 'h:mm a')
        });
      }
    }
    return slots;
  }, [date, workingHours]);
  
  // Process entries for the day
  const processedEntries = useMemo(() => {
    return entries.map(entry => ({
      ...entry,
      date: typeof entry.date === 'string' ? parseISO(entry.date) : entry.date,
      endDate: entry.endDate 
        ? (typeof entry.endDate === 'string' ? parseISO(entry.endDate) : entry.endDate)
        : addMinutes(
            typeof entry.date === 'string' ? parseISO(entry.date) : entry.date, 
            entry.duration || 60
          )
    })).filter(entry => isSameDay(entry.date, date));
  }, [entries, date]);
  
  // Calculate position and height for each entry
  const positionedEntries = useMemo(() => {
    const startOfTheDay = startOfDay(date);
    const endOfTheDay = endOfDay(date);
    const totalMinutes = (endOfTheDay - startOfTheDay) / (1000 * 60);
    
    return processedEntries.map(entry => {
      const startMinutes = (entry.date - startOfTheDay) / (1000 * 60);
      const durationMinutes = (entry.endDate - entry.date) / (1000 * 60);
      const top = (startMinutes / totalMinutes) * 100;
      const height = (durationMinutes / totalMinutes) * 100;
      
      return {
        ...entry,
        top: `${top}%`,
        height: `${height}%`
      };
    });
  }, [processedEntries, date]);

  const handleTimeSlotClick = (time) => {
    if (onTimeSlotClick) {
      onTimeSlotClick(time);
    }
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };

  return (
    <div className={`relative flex flex-col h-full ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">
          {format(date, 'EEEE, MMMM d, yyyy')}
          {isToday(date) && (
            <span className="ml-2 px-2 py-1 text-xs font-normal bg-blue-100 text-blue-800 rounded-full">
              Today
            </span>
          )}
        </h2>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto">
          {/* Time slots */}
          {timeSlots.map((slot, index) => (
            <div 
              key={index}
              onClick={() => handleTimeSlotClick(slot.time)}
              className="relative h-16 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              <div className="absolute left-4 -top-3 text-xs text-gray-500">
                {slot.label}
              </div>
              
              {/* Add event button (only shows on hover) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                <button 
                  className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTimeSlotClick(slot.time);
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {/* Events */}
          {positionedEntries.map((entry, index) => (
            <div
              key={entry.id || index}
              onClick={(e) => handleEventClick(entry, e)}
              className="absolute left-16 right-4 rounded-lg p-2 overflow-hidden shadow-sm cursor-pointer"
              style={{
                top: entry.top,
                height: entry.height,
                backgroundColor: entry.color ? `${entry.color}20` : '#f0f9ff',
                borderLeft: `3px solid ${entry.color || '#0ea5e9'}`,
                zIndex: 10
              }}
            >
              <div className="font-medium text-sm truncate">{entry.title || 'Untitled'}</div>
              <div className="text-xs text-gray-600">
                {format(entry.date, 'h:mm a')} - {format(entry.endDate, 'h:mm a')}
              </div>
              {entry.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {entry.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayView;
