import React, { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, isSameMonth } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const MonthYearPicker = ({
  currentDate,
  onDateChange,
  minDate,
  maxDate = new Date(),
  className = ''
}) => {
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [viewYear, setViewYear] = useState(currentDate.getFullYear());
  const yearPickerRef = useRef(null);
  
  const currentMonth = startOfMonth(currentDate);
  const formattedDate = format(currentMonth, 'MMMM yyyy');
  
  // Generate years for the year picker (10 years before and after current year)
  const years = Array.from({ length: 21 }, (_, i) => viewYear - 10 + i);
  
  // Handle click outside to close year picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (yearPickerRef.current && !yearPickerRef.current.contains(event.target)) {
        setShowYearPicker(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handlePrevMonth = () => {
    const newDate = subMonths(currentMonth, 1);
    if (!minDate || newDate >= startOfMonth(minDate)) {
      onDateChange(newDate);
    }
  };
  
  const handleNextMonth = () => {
    const newDate = addMonths(currentMonth, 1);
    if (newDate <= startOfMonth(maxDate)) {
      onDateChange(newDate);
    }
  };
  
  const handleYearSelect = (year) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    
    // Ensure the new date is within min/max bounds
    if (minDate && newDate < startOfMonth(minDate)) {
      newDate.setFullYear(minDate.getFullYear());
      newDate.setMonth(minDate.getMonth());
    } else if (newDate > startOfMonth(maxDate)) {
      newDate.setFullYear(maxDate.getFullYear());
      newDate.setMonth(maxDate.getMonth());
    }
    
    onDateChange(newDate);
    setShowYearPicker(false);
  };
  
  const isPrevDisabled = minDate && isSameMonth(currentMonth, minDate);
  const isNextDisabled = isSameMonth(currentMonth, maxDate);
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={handlePrevMonth}
        disabled={isPrevDisabled}
        className={`p-1 rounded-full hover:bg-gray-100 ${
          isPrevDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Previous month"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="relative" ref={yearPickerRef}>
        <button
          onClick={() => setShowYearPicker(!showYearPicker)}
          className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <CalendarIcon size={16} className="mr-2" />
          {formattedDate}
        </button>
        
        {showYearPicker && (
          <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            <div className="p-2">
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => setViewYear(viewYear - 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-medium">{viewYear - 5} - {viewYear + 5}</span>
                <button
                  onClick={() => setViewYear(viewYear + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {years.map((year) => {
                  const isCurrent = year === currentMonth.getFullYear();
                  const isDisabled = 
                    (minDate && year < minDate.getFullYear()) || 
                    (maxDate && year > maxDate.getFullYear());
                  
                  return (
                    <button
                      key={year}
                      onClick={() => !isDisabled && handleYearSelect(year)}
                      disabled={isDisabled}
                      className={`text-xs p-1 rounded ${
                        isCurrent 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'hover:bg-gray-100'
                      } ${isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={handleNextMonth}
        disabled={isNextDisabled}
        className={`p-1 rounded-full hover:bg-gray-100 ${
          isNextDisabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Next month"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default MonthYearPicker;
