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