import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
import LoginSignupPage from './pages/LoginSignupPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

function AppContent() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {!isAuthPage && (
        <SideBar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      )}
      <div className="flex-1 flex flex-col">
        {!isAuthPage && (
          <Navbar
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        )}
        <div className={`flex-grow ${!isAuthPage ? 'pt-16 pb-24' : ''}`}>
          <Routes>
            {/* 🔁 Redirect root to /auth */}
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<LoginSignupPage />} />
            <Route path="/home" element={<HomePage sidebarExpanded={sidebarExpanded} />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/user-habits" element={<UserHabitsPage />} />
            <Route path="/challenge-participants" element={<ChallengeParticipantsPage />} />
            <Route path="/challenge-entries" element={<ChallengeEntriesPage />} />
            <Route path="/habit-entries" element={<HabitEntriesPage />} />
          </Routes>
        </div>
        {!isAuthPage && <Footer sidebarExpanded={sidebarExpanded} />}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
