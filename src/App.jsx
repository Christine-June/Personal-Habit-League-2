import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from '@/context/ThemeContext';
import { HabitsProvider } from '@/context/HabitsContext';

// Components
import ToastConfig from '@/components/ToastConfig';
import ChatLog from "@/components/ChatLog";
import ProtectedRoute from '@/components/ProtectedRoute';
import SideBar from '@/components/SideBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Pages
import HomePage from '@/pages/HomePage';
import UsersPage from '@/pages/UsersPage';
import HabitsPage from '@/pages/HabitsPage';
import ChallengesPage from '@/pages/ChallengesPage';
import UserHabitsPage from '@/pages/UserHabitsPage';
import ChallengeParticipantsPage from '@/pages/ChallengeParticipantsPage';
import ChallengeEntriesPage from '@/pages/ChallengeEntriesPage';
import ChallengeDetailPage from '@/pages/ChallengeDetailPage';
import HabitCalendarPage from '@/pages/HabitCalendarPage';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import CookieSettings from '@/pages/CookieSettings';
import LoginSignupPage from '@/pages/LoginSignupPage';
import BlogPage from '@/pages/BlogPage';

// Styles
import '@/App.css';

function AppContent({ currentUser, setCurrentUser }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const location = useLocation();

  const isMinimalPage = ["/auth", "/privacy", "/terms", "/cookies"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-black transition-colors duration-300">
      {!isMinimalPage && (
        <SideBar
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          currentUser={currentUser}
        />
      )}
      <div className="flex-1 flex flex-col">
        {!isMinimalPage && (
          <Navbar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
        )}
        <div className={`flex-grow ${!isMinimalPage ? 'pt-16 pb-24' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<LoginSignupPage setCurrentUser={setCurrentUser} />} />
            <Route path="/home" element={<HomePage sidebarExpanded={sidebarExpanded} />} />
            <Route path="/users" element={<UsersPage />} />
            {/* Habit Management Routes */}
            <Route path="/habits" element={
              <ProtectedRoute>
                <HabitsPage />
              </ProtectedRoute>
            } />
            <Route path="/habits/calendar" element={
              <ProtectedRoute>
                <HabitCalendarPage />
              </ProtectedRoute>
            } />
            <Route path="/habits/calendar/:userId" element={
              <ProtectedRoute>
                <HabitCalendarPage />
              </ProtectedRoute>
            } />
            <Route path="/user-habits" element={
              <ProtectedRoute>
                <UserHabitsPage />
              </ProtectedRoute>
            } />
            
            {/* Challenge Management Routes */}
            <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
            <Route path="/challenges/:challengeId" element={<ProtectedRoute><ChallengeDetailPage /></ProtectedRoute>} />
            <Route path="/challenge-participants" element={<ProtectedRoute><ChallengeParticipantsPage /></ProtectedRoute>} />
            <Route path="/challenge-entries" element={<ProtectedRoute><ChallengeEntriesPage /></ProtectedRoute>} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookieSettings />} />
            <Route path="/chat" element={<ChatLog currentUser={currentUser} />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </div>
        {!isMinimalPage && <Footer sidebarExpanded={sidebarExpanded} />}
      </div>
    </div>
  )
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <ToastConfig />
        <HabitsProvider>
          <AppContent currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </HabitsProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;