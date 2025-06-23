import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// ✅ Keep only one getHabits function
export async function getHabits() {
  const res = await axios.get(`${BASE_URL}/habits/`);
  return res.data;
}

export async function getUsers() {
  const res = await axios.get(`${BASE_URL}/users/`);
  return res.data;
}

export async function addHabit(habitData) {
  const res = await axios.post(`${BASE_URL}/habits/`, habitData);
  return res.data;
}
export const deleteHabit = (habitId) =>
  axios.delete(`http://localhost:5000/habits/${habitId}`);
export async function updateHabit(habitId, updatedData) {
  const res = await axios.patch(`http://localhost:5000/habits/${habitId}`, updatedData);
  return res.data;
}


// Challenges
export const getChallengeParticipants = (challengeId) =>
  axios.get(`${BASE_URL}/challenges/${challengeId}/participants`);

export const addParticipantToChallenge = (challengeId, data) =>
  axios.post(`${BASE_URL}/challenges/${challengeId}/participants`, data);

// User Habits
export const getUserHabits = (userId) =>
  axios.get(`${BASE_URL}/users/${userId}/habits`).then(res => res.data);

// Habit Entries
export const getHabitEntries = (params = {}) =>
  axios.get(`${BASE_URL}/habit-entries`, { params }).then(res => res.data);

export const createHabitEntry = (entry) =>
  axios.post(`${BASE_URL}/habit-entries`, entry).then(res => res.data);
