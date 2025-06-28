// src/api.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// habbits
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

// challenges
export async function getChallenges() {
  const res = await axios.get(`${BASE_URL}/challenges/`);
  return res.data;
}

export async function addChallenge(challengeData) {
  const res = await axios.post(`${BASE_URL}/challenges/`, challengeData);
  return res.data;
}

export async function updateChallenge(id, updatedData) {
  const res = await axios.patch(`${BASE_URL}/challenges/${id}`, updatedData);
  return res.data;
}

export async function deleteChallenge(id) {
  const res = await axios.delete(`${BASE_URL}/challenges/${id}`);
  return res.data;
}

// challenge participants
export const getChallengeParticipants = (challengeId) =>
  axios.get(`${BASE_URL}/challenges/${challengeId}/participants`).then(res => res.data);

export const addParticipantToChallenge = (challengeId, data) =>
  axios.post(`${BASE_URL}/challenges/${challengeId}/participants`, data);

// challenge entries
export const getChallengeEntries = (challengeId) =>
  axios.get(`${BASE_URL}/challenges/${challengeId}/entries`).then(res => res.data);

export const createChallengeEntry = (challengeId, entryData) =>
  axios.post(`${BASE_URL}/challenges/${challengeId}/entries`, entryData).then(res => res.data);

// user habits
export const getUserHabits = (userId) =>
  axios.get(`${BASE_URL}/users/${userId}/habits`).then(res => res.data);

// habit entries
export const getHabitEntries = (params = {}) =>
  axios.get(`${BASE_URL}/habit-entries`, { params }).then(res => res.data);

export const createHabitEntry = (entry) =>
  axios.post(`${BASE_URL}/habit-entries`, entry).then(res => res.data);