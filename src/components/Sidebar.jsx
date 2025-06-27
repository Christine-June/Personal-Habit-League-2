import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/home", icon: "🏠", label: "Home" },
  { to: "/calendar", icon: "🗓️", label: "Calendar" },
  { to: "/chat", icon: "💬", label: "Chat" },
  { to: "/leaderboard", icon: "📈", label: "Leaderboard" },
  { to: "/profile", icon: "👤", label: "Profile" },
];

export default function Sidebar({ expanded, setExpanded }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (type) => {
    setShowMenu(false);
    if (type === "habit") {
      navigate("/habits?add=1");
    } else if (type === "challenge") {
      navigate("/challenges?add=1");
    }
  };

  return (
    <aside
      className="hidden sm:flex fixed top-0 left-0 h-screen w-20 bg-white border-r border-gray-200 flex-col items-center py-6 z-50"
      aria-label="Sidebar Navigation"
    >
      <div className="mb-8">
        {/* Avatar or Logo */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
          P
        </div>
      </div>
      <nav className="flex flex-col gap-6 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={item.label}
            className={({ isActive }) =>
              `flex flex-col items-center text-xl transition-colors duration-200 ${
                isActive
                  ? "text-indigo-600 font-bold"
                  : "text-gray-400 hover:text-indigo-400"
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="text-[10px] mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {/* Plus Button */}
      <div className="mt-auto mb-2 relative">
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500 text-white text-3xl shadow-lg hover:bg-indigo-600 transition"
          onClick={() => setShowMenu((v) => !v)}
          aria-label="Add"
        >
          +
        </button>
        {showMenu && (
          <div className="absolute left-14 bottom-0 bg-white border rounded shadow-lg z-50 flex flex-col">
            <button
              className="px-4 py-2 hover:bg-indigo-100 text-left"
              onClick={() => handleAdd("habit")}
            >
              Add Habit
            </button>
            <button
              className="px-4 py-2 hover:bg-indigo-100 text-left"
              onClick={() => handleAdd("challenge")}
            >
              Add Challenge
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}