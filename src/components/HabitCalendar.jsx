import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const COLORS = [
  "bg-blue-500", "bg-green-500", "bg-pink-500", "bg-yellow-500", "bg-purple-500", "bg-red-500"
];

function getColorClass(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function HabitCalendar({ entries = [], onDayClick }) {
  const [value, setValue] = useState(new Date());

  // Group entries by date for dot rendering
  const entriesByDate = entries.reduce((acc, entry) => {
    const date = new Date(entry.date).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  // Custom tile content: colored dots for each habit/challenge
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dayEntries = entriesByDate[date.toDateString()];
    if (!dayEntries) return null;
    return (
      <div className="flex flex-col items-start mt-1 space-y-0.5 max-h-16 overflow-y-auto">
        {dayEntries.slice(0, 3).map((entry, i) => (
          <div key={i} className="flex items-center w-full">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1 ${getColorClass(entry.name || "")}`}
              title={entry.name}
            />
            <span className="text-[10px] font-semibold text-gray-700 truncate max-w-[60px]" title={entry.name}>
              {entry.name}
            </span>
            {entry.time && (
              <span className="ml-1 text-[9px] text-gray-400">{entry.time}</span>
            )}
          </div>
        ))}
        {dayEntries.length > 3 && (
          <span className="text-[10px] text-gray-400">+{dayEntries.length - 3} more</span>
        )}
      </div>
    );
  };

  // Custom navigation for month/year
  function CustomHeader({ date, decreaseMonth, increaseMonth }) {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return (
      <div className="flex items-center justify-between mb-4 px-2">
        <button onClick={decreaseMonth} className="p-2 rounded-full hover:bg-gray-200 text-xl">&lt;</button>
        <span className="text-lg font-bold text-gray-800">{month} {year}</span>
        <button onClick={increaseMonth} className="p-2 rounded-full hover:bg-gray-200 text-xl">&gt;</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 flex items-center justify-center z-40">
      <div className="w-[90vw] h-full flex flex-col items-center justify-center px-4 py-8 mx-auto">
        {/* Custom Calendar Header */}
        <CustomHeader
          date={value}
          decreaseMonth={() => setValue(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
          increaseMonth={() => setValue(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
        />
        <Calendar
          value={value}
          onChange={setValue}
          tileContent={tileContent}
          onClickDay={onDayClick}
          prev2Label={null}
          next2Label={null}
          className="w-full h-full text-lg rounded-2xl shadow-xl bg-white border border-gray-200"
        />
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {COLORS.map((color, i) => (
            <span key={i} className={`inline-flex items-center gap-1`}>
              <span className={`w-3 h-3 rounded-full ${color}`}></span>
              <span className="text-xs text-gray-500">Habit {i + 1}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}