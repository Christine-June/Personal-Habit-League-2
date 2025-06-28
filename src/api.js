// src/api.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// HABITS
export function getHabits() {
  const token = localStorage.getItem('token');
  return axios.get(`${BASE_URL}/habits/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);
}

export async function addHabit(habitData) {
  const token = localStorage.getItem('token');
  axios.post(`${BASE_URL}/habits/`, habitData, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function updateHabit(habitId, updatedData) {
  const res = await axios.patch(`${BASE_URL}/habits/${habitId}`, updatedData);
  return res.data;
}

export const deleteHabit = (habitId) =>
  axios.delete(`${BASE_URL}/habits/${habitId}`);