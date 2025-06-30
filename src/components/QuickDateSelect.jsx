import React from 'react';
import { 
  startOfDay, 
  endOfDay, 
  subDays, 
  subWeeks, 
  subMonths, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  isSameDay 
} from 'date-fns';
import { Calendar, Clock, Zap, Flame, Target } from 'lucide-react';

const QuickDateSelect = ({ onSelect, className = '' }) => {
  const presets = [
    {
      id: 'today',
      label: 'Today',
      icon: <Calendar size={16} className="mr-2" />,
      getRange: () => ({
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
        label: 'Today'
      })
    },
    {
      id: 'yesterday',
      label: 'Yesterday',
      icon: <Clock size={16} className="mr-2" />,
      getRange: () => {
        const yesterday = subDays(new Date(), 1);
        return {
          startDate: startOfDay(yesterday),
          endDate: endOfDay(yesterday),
          label: 'Yesterday'
        };
      }
    },
    {
      id: 'thisWeek',
      label: 'This Week',
      icon: <Zap size={16} className="mr-2" />,
      getRange: () => ({
        startDate: startOfWeek(new Date(), { weekStartsOn: 0 }),
        endDate: endOfDay(new Date()),
        label: 'This Week'
      })
    },
    {
      id: 'last7Days',
      label: 'Last 7 Days',
      icon: <Flame size={16} className="mr-2" />,
      getRange: () => ({
        startDate: startOfDay(subDays(new Date(), 6)),
        endDate: endOfDay(new Date()),
        label: 'Last 7 Days'
      })
    },
    {
      id: 'last30Days',
      label: 'Last 30 Days',
      icon: <Target size={16} className="mr-2" />,
      getRange: () => ({
        startDate: startOfDay(subDays(new Date(), 29)),
        endDate: endOfDay(new Date()),
        label: 'Last 30 Days'
      })
    },
    {
      id: 'thisMonth',
      label: 'This Month',
      icon: <Calendar size={16} className="mr-2" />,
      getRange: () => ({
        startDate: startOfMonth(new Date()),
        endDate: endOfDay(new Date()),
        label: 'This Month'
      })
    },
    {
      id: 'lastMonth',
      label: 'Last Month',
      icon: <Calendar size={16} className="mr-2" />,
      getRange: () => {
        const lastMonth = subMonths(new Date(), 1);
        return {
          startDate: startOfMonth(lastMonth),
          endDate: endOfMonth(lastMonth),
          label: 'Last Month'
        };
      }
    }
  ];

  return (
    <div className={`space-y-1 ${className}`}>
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Quick Select</h3>
      <div className="grid grid-cols-1 gap-1">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.getRange())}
            className="flex items-center px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            {preset.icon}
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickDateSelect;
