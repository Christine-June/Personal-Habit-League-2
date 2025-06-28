import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ToastConfig from './components/ToastConfig';

import { ThemeProvider } from './context/ThemeContext';
import './App.css';

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
      </Router>
    </ThemeProvider>
  );
}

export default App;
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import HabitsPage from './pages/HabitsPage';
import ChallengesPage from './pages/ChallengesPage';
import LoginSignupPage from './pages/LoginSignupPage';
import ProtectedRoute from './components/ProtectedRoute';

import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
          {/* Routes will be added here */}
        </div>
        {!isMinimalPage && <Footer sidebarExpanded={sidebarExpanded} />}
      </div>
    </div>
  )
}
<Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<LoginSignupPage setCurrentUser={setCurrentUser} />} />
            <Route path="/home" element={<HomePage sidebarExpanded={sidebarExpanded} />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/habits" element={<ProtectedRoute><HabitsPage /></ProtectedRoute>} />
            <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
          </Routes>

          