import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update this when deploying

const AVATAR_OPTIONS = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
  // Add more as you like
];

function LoginSignupPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    avatar_url: '', // <-- add this
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
        // Store user and token if present
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
        }
        // Optionally, navigate to home or switch to login
        navigate('/home');
        setMode('login');
        setForm({ username: '', email: '', password: '', avatar_url: '' });
        setError('');
      } else {
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
        }
        navigate('/home');
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
            <>
              <label className="block font-medium mt-2 mb-1">Choose an Avatar</label>
              <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                {AVATAR_OPTIONS.map((url) => (
                  <button
                    type="button"
                    key={url}
                    onClick={() => setForm({ ...form, avatar_url: url })}
                    className={`border-2 rounded-full p-1 ${form.avatar_url === url ? "border-blue-500" : "border-transparent"}`}
                  >
                    <img src={url} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                  </button>
                ))}
              </div>
              <label className="block mb-1 font-medium">Or paste your own image URL</label>
              <input
                type="url"
                name="avatar_url"
                value={form.avatar_url}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                placeholder="Paste image URL here"
              />
              {form.avatar_url && (
                <img
                  src={form.avatar_url}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-full mb-2 object-cover"
                />
              )}
            </>
          )}

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
