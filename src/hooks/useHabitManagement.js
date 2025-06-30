import { useState, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

export function useHabitManagement(initialHabits = []) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  
  // Get unique categories from habits
  const categories = useMemo(() => {
    const cats = new Set(['all']);
    initialHabits.forEach(habit => {
      if (habit.category) {
        cats.add(habit.category);
      }
    });
    return Array.from(cats);
  }, [initialHabits]);

  const [filters, setFilters] = useState({
    status: 'all', // 'all', 'completed', 'in-progress', 'not-started'
    category: 'all',
    searchTerm: '',
  });

  const openHabitModal = useCallback((habit = null) => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  }, []);

  const closeHabitModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedHabit(null);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      status: 'all',
      category: 'all',
      searchTerm: '',
    });
  }, []);

  return {
    isModalOpen,
    selectedHabit,
    filters,
    categories,
    openHabitModal,
    closeHabitModal,
    handleFilterChange,
    resetFilters,
  };
}
