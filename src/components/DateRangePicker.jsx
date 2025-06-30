import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, isWithinInterval, isSameDay, startOfDay, endOfDay } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import CalendarView from './CalendarView';

const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate = new Date(),
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [isSelecting, setIsSelecting] = useState(false);
  const containerRef = useRef(null);
  
  // Handle click outside to close the picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleCancel();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const handleDateClick = (date) => {
    if (!isSelecting) {
      // Start new selection
      setTempStartDate(date);
      setTempEndDate(null);
      setIsSelecting(true);
    } else {
      // Complete selection
      if (date < tempStartDate) {
        // If clicked date is before start date, swap them
        setTempStartDate(date);
        setTempEndDate(tempStartDate);
      } else {
        setTempEndDate(date);
      }
      setIsSelecting(false);
    }
  };
  
  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      onChange({
        startDate: startOfDay(tempStartDate),
        endDate: endOfDay(tempEndDate)
      });
      setIsOpen(false);
    }
  };
  
  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setIsOpen(false);
    setIsSelecting(false);
  };
  
  const isDateSelected = (date) => {
    if (!tempStartDate) return false;
    if (!tempEndDate) return isSameDay(date, tempStartDate);
    
    return isWithinInterval(date, {
      start: tempStartDate,
      end: tempEndDate
    });
  };
  
  const formatDateRange = () => {
    if (!startDate || !endDate) return 'Select date range';
    
    const formatStr = 'MMM d, yyyy';
    return `${format(startDate, formatStr)} - ${format(endDate, formatStr)}`;
  };
  
  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      >
        <span className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
          {formatDateRange()}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-[600px]">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Start Date</h3>
                <div className="p-2 border rounded bg-gray-50">
                  {tempStartDate ? format(tempStartDate, 'PP') : 'Not selected'}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">End Date</h3>
                <div className="p-2 border rounded bg-gray-50">
                  {tempEndDate ? format(tempEndDate, 'PP') : 'Not selected'}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <CalendarView
                currentMonth={tempStartDate || new Date()}
                selectedDate={null}
                onDateClick={handleDateClick}
                isDateSelected={isDateSelected}
                isDateDisabled={(date) => maxDate && date > maxDate}
                showHeader={false}
              />
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!tempStartDate || !tempEndDate}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none ${
                  !tempStartDate || !tempEndDate ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
