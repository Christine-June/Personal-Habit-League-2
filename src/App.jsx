import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import HabitsPage from './pages/HabitsPage';
import SideBar from './components/SideBar';
import ChallengesPage from './pages/ChallengesPage';
import UserHabitsPage from './pages/UserHabitsPage';
import ChallengeParticipantsPage from './pages/ChallengeParticipantsPage';
import ChallengeEntriesPage from './pages/ChallengeEntriesPage';
import HabitEntriesPage from './pages/HabitEntriesPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col md:flex-row">
          <SideBar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
          <div className="flex-1 flex flex-col">
            <Navbar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage sidebarExpanded={sidebarExpanded} />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/challenges" element={<ChallengesPage />} />
                <Route path="/user-habits" element={<UserHabitsPage />} />
                <Route path="/challenge-participants" element={<ChallengeParticipantsPage />} />
                <Route path="/challenge-entries" element={<ChallengeEntriesPage />} />
                <Route path="/habit-entries" element={<HabitEntriesPage />} />
              </Routes>
            </div>
            <Footer sidebarExpanded={sidebarExpanded} />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;