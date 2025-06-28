import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';

const BASE_URL = 'http://localhost:5000';

const AVATAR_OPTIONS = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/11.jpg',
  'https://randomuser.me/api/portraits/women/11.jpg',
];

function LoginSignupPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    avatar_url: '',
  });
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const endpoint = mode === 'login' ? '/login' : '/signup';

    try {
      const payload = mode === 'login'
        ? { username: form.username, password: form.password }
        : form;

      const response = await axios.post(`${BASE_URL}${endpoint}`, payload);

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }

      navigate('/home');
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setForgotPasswordMessage('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/forgot-password`, {
        email: forgotPasswordEmail
      });
      
      setForgotPasswordMessage(response.data.message || 'Password reset link sent to your email');
      setShowForgotPassword(false);
    } catch (err) {
      setForgotPasswordMessage(err.response?.data?.error || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left side - Feature highlights */}
        <div className="hidden md:flex flex-col justify-center p-8 bg-gradient-to-b from-blue-600 to-indigo-700 text-white w-1/2">
          <div className="max-w-xs mx-auto">
            <h2 className="text-3xl font-bold mb-6">Welcome to Habit Personal League</h2>
            <p className="text-blue-100 mb-8">
              Build better habits, track your progress, and compete in the Personal Habit League to stay motivated.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-500 p-2 rounded-lg mr-4">
                  <FiTrendingUp className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Habit Tracking</h3>
                  <p className="text-blue-100 text-sm">
                    Monitor your daily habits and see your streaks grow over time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-2 rounded-lg mr-4">
                  <FiAward className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personal Habit League</h3>
                  <p className="text-blue-100 text-sm">
                    Compete with friends and climb the leaderboard based on your habit consistency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 p-2 rounded-lg mr-4">
                  <FiUsers className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Community Support</h3>
                  <p className="text-blue-100 text-sm">
                    Join challenges and get motivation from our community of habit builders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Auth form */}
        <div className="w-full md:w-1/2">
          {showForgotPassword ? (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                {forgotPasswordMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    forgotPasswordMessage.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {forgotPasswordMessage}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Back to Login
                  </button>
                  <button
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex border-b">
                <button
                  className={`flex-1 py-4 font-medium text-center transition-colors ${
                    mode === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-4 font-medium text-center transition-colors ${
                    mode === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </button>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {mode === 'login' ? 'Welcome Back!' : 'Join HabitForge'}
                  </h1>
                  <p className="text-gray-500">
                    {mode === 'login' 
                      ? 'Log in to track your habits and climb the league' 
                      : 'Create your account to start your habit journey'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      name="username"
                      type="text"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  {mode === 'signup' && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>

                  {mode === 'signup' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {AVATAR_OPTIONS.map((url) => (
                          <button
                            type="button"
                            key={url}
                            onClick={() => setForm({ ...form, avatar_url: url })}
                            className={`flex-shrink-0 rounded-full p-0.5 transition ${
                              form.avatar_url === url ? "ring-2 ring-blue-500" : "hover:ring-1 hover:ring-gray-300"
                            }`}
                          >
                            <img 
                              src={url} 
                              alt="avatar" 
                              className="w-12 h-12 rounded-full object-cover" 
                            />
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <input
                          type="url"
                          name="avatar_url"
                          value={form.avatar_url}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          placeholder="Or paste custom image URL"
                        />
                      </div>
                      {form.avatar_url && (
                        <div className="flex justify-center mt-2">
                          <img
                            src={form.avatar_url}
                            alt="Preview"
                            className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150';
                              setForm({...form, avatar_url: ''});
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      'Processing...'
                    ) : (
                      <>
                        {mode === 'login' ? 'Log In' : 'Create Account'}
                        <FiArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setMode(mode === 'login' ? 'signup' : 'login');
                      setError('');
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    {mode === 'login' ? 'Create an account' : 'Already have an account?'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignupPage;