import { useState, useCallback, useMemo } from 'react';
import { startOfDay, startOfMonth, format, isSameDay } from 'date-fns';

export function useCalendar(initialViewMode = 'month') {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [viewMode, setViewMode] = useState(initialViewMode);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(startOfDay(date));
    if (viewMode === 'month') {
      setCurrentMonth(startOfMonth(date));
    }
  }, [viewMode]);

  const handleMonthChange = useCallback((newMonth) => {
    setCurrentMonth(startOfMonth(newMonth));
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
    // Reset to today when changing view modes
    if (mode !== viewMode) {
      const today = new Date();
      setSelectedDate(startOfDay(today));
      setCurrentMonth(startOfMonth(today));
    }
  }, [viewMode]);

  const formattedDate = useMemo(() => format(selectedDate, 'MMMM d, yyyy'), [selectedDate]);

  return {
    selectedDate,
    currentMonth,
    viewMode,
    formattedDate,
    handleDateSelect,
    handleMonthChange,
    setViewMode: handleViewModeChange,
  };
}
