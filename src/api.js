import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// HABITS
export async function getHabits() {
  const res = await axios.get(`${BASE_URL}/habits/`);
  return res.data;
}

export async function addHabit(habitData) {
  const res = await axios.post(`${BASE_URL}/habits/`, habitData);
  return res.data;
}

export async function updateHabit(habitId, updatedData) {
  const res = await axios.patch(`${BASE_URL}/habits/${habitId}`, updatedData);
  return res.data;
}

export const deleteHabit = (habitId) =>
  axios.delete(`${BASE_URL}/habits/${habitId}`);

export async function getUsers() {
  const res = await axios.get(`${BASE_URL}/users/`);
  return res.data;
}

// ✅ CHALLENGES
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

// CHALLENGE PARTICIPANTS
export const getChallengeParticipants = (challengeId) =>
  axios.get(`${BASE_URL}/challenges/${challengeId}/participants`);

export const addParticipantToChallenge = (challengeId, data) =>
  axios.post(`${BASE_URL}/challenges/${challengeId}/participants`, data);

// USER HABITS
export const getUserHabits = (userId) =>
  axios.get(`${BASE_URL}/users/${userId}/habits`).then(res => res.data);

// HABIT ENTRIES
export const getHabitEntries = (params = {}) =>
  axios.get(`${BASE_URL}/habit-entries`, { params }).then(res => res.data);

export const createHabitEntry = (entry) =>
  axios.post(`${BASE_URL}/habit-entries`, entry).then(res => res.data);
