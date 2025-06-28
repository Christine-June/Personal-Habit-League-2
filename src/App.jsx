// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ToastConfig from "./components/ToastConfig";

import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage"; // You may need to create this if not present
import ChatLog from "./components/ChatLog";
import ChallengesPage from "./pages/ChallengesPage";
import LeaderboardPage from "./pages/LeaderboardPage"; // You may need to create this if not present
import ProfilePage from "./pages/ProfilePage"; // You may need to create this if not present
import AuthPage from "./pages/AuthPage"; // Import the AuthPage component
import HabitsPage from "./pages/HabitsPage"; // <-- import this

import SideBar from "./components/Sidebar";
import TopNavBar from "./components/TopNavBar";

import React, { useState } from "react";

function AppContent({ currentUser, setCurrentUser }) {
  const location = useLocation();
  const isMinimalPage = ["/auth", "/privacy", "/terms", "/cookies"].includes(
    location.pathname
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Redirect to /auth if not logged in and not on a minimal page
  if (!currentUser && !isMinimalPage) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      {!isMinimalPage && <TopNavBar onSearch={setSearchQuery} />}
      <div className="min-h-screen flex bg-white dark:bg-black transition-colors duration-300">
        {!isMinimalPage && <SideBar />}
        <main className="flex-1 ml-20">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage currentUser={currentUser} />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/chat" element={<ChatLog currentUser={currentUser} />} />
            <Route path="/challenges" element={<ChallengesPage searchQuery={searchQuery} />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route
              path="/profile"
              element={
                currentUser ? (
                  <Navigate to={`/users/${currentUser.id}/profile`} replace />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/users/:userId/profile"
              element={<ProfilePage currentUser={currentUser} />}
            />
            <Route path="/auth" element={<AuthPage setCurrentUser={setCurrentUser} />} /> {/* Add the Auth route */}
            <Route path="/habits" element={<HabitsPage currentUser={currentUser} searchQuery={searchQuery} />} /> {/* <-- add this */}
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Optional: Listen for changes in localStorage (e.g., from other tabs)
  useEffect(() => {
    const syncUser = () => {
      const savedUser = localStorage.getItem("currentUser");
      setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <ToastConfig />
        <AppContent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
