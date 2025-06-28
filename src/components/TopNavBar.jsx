import React, { useState } from "react";

export default function TopNavBar({ onSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
      onSearch && onSearch("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
      {/* Logo/Brand */}
      <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
        <span className="bg-gradient-to-br from-blue-400 to-pink-400 text-white rounded-full w-8 h-8 flex items-center justify-center">P</span>
        <span>Habit League</span>
      </div>
      {/* Spacer */}
      <div className="flex-1" />
      {/* Quick Actions */}
      <div className="flex items-center gap-4">
        {showSearch && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        )}
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Search"
          onClick={handleToggleSearch}
        >
          <span className="text-xl">🔍</span>
        </button>
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition" aria-label="Notifications">
          <span className="text-xl">🔔</span>
          {/* Example notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
