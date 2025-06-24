import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update this when deploying

function LoginSignupPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === 'login' ? '/login' : '/signup';

    try {
      const payload =
        mode === 'login'
          ? { username: form.username, password: form.password }
          : form;

      const response = await axios.post(`${BASE_URL}${endpoint}`, payload);

      if (mode === 'signup') {
        // ✅ After signup, reset and switch to login
        setMode('login');
        setForm({ username: '', email: '', password: '' });
        setError('');
      } else {
        // ✅ After login, store user in localStorage and redirect
        const user = response.data?.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/home');
        } else {
          setError('Login succeeded, but no user data returned.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />

          {mode === 'signup' && (
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
            className="text-blue-500 underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginSignupPage;
