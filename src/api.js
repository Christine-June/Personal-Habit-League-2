// src/api.js
import apiClient from './utils/axiosConfig';

// habits
export function getHabits(params = {}) {
  return apiClient.get('/habits', { params }).then(res => res.data);
}

export function addHabit(habitData) {
  return apiClient.post('/habits', habitData).then(res => res.data);
}

export function updateHabit(habitId, updatedData) {
  return apiClient.patch(`/habits/${habitId}`, updatedData).then(res => res.data);
}

export function deleteHabit(habitId) {
  return apiClient.delete(`/habits/${habitId}`).then(res => res.data);
}

// challenges
export function getChallenges(params = {}) {
  return apiClient.get('/challenges', { params }).then(res => res.data);
}

export function addChallenge(challengeData) {
  return apiClient.post('/challenges', challengeData).then(res => res.data);
}

export function updateChallenge(id, updatedData) {
  return apiClient.patch(`/challenges/${id}`, updatedData).then(res => res.data);
}

export function deleteChallenge(id) {
  return apiClient.delete(`/challenges/${id}`).then(res => res.data);
}

// challenge participants
export function getChallengeParticipants(challengeId) {
  return apiClient.get(`/challenges/${challengeId}/participants`).then(res => res.data);
}

export function addParticipantToChallenge(challengeId, data) {
  return apiClient.post(`/challenges/${challengeId}/participants`, data).then(res => res.data);
}

// challenge entries
export function getChallengeEntries(challengeId) {
  return apiClient.get(`/challenges/${challengeId}/entries`).then(res => res.data);
}

export function createChallengeEntry(challengeId, entryData) {
  return apiClient.post(`/challenges/${challengeId}/entries`, entryData).then(res => res.data);
}

// user habits
export function getUserHabits(userId) {
  return apiClient.get(`/users/${userId}/habits`).then(res => res.data);
}

// habit entries
export function getHabitEntries(params = {}) {
  return apiClient.get('/habit-entries', { params }).then(res => res.data);
}

export function createHabitEntry(entry) {
  return apiClient.post('/habit-entries', entry).then(res => res.data);
}

export function updateHabitEntry(entryId, updatedData) {
  return apiClient.patch(`/habit-entries/${entryId}`, updatedData).then(res => res.data);
}

export function deleteHabitEntry(entryId) {
  return apiClient.delete(`/habit-entries/${entryId}`).then(res => res.data);
}

// users
export function getUsers() {
  // This will now correctly send credentials (cookies) and the Authorization header
  // if a token is present in localStorage due to axiosConfig.js setup.
  return apiClient.get('/users').then(res => res.data);
}

// login
export async function login(credentials) {
  // login request does not need Authorization header initially
  const response = await apiClient.post('/auth/login', credentials);
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    if (response.data.refresh_token) {
      localStorage.setItem('refreshToken', response.data.refresh_token);
    }
    return response.data.user || response.data;
  } else {
    throw new Error(response.data.error || 'Login failed');
  }
}

// protected routes
export function getProtectedUser() {
  // This will now correctly send credentials (cookies) and the Authorization header
  // if a token is present in localStorage due to axiosConfig.js setup.
  return apiClient.get('/protected').then(res => res.data);
}

export async function updateUser(userId, data) {
  // REMOVED the manual Authorization header setting.
  // The request interceptor in axiosConfig.js will automatically add it.
  const res = await apiClient.patch(`/users/${userId}`, data);
  return res.data;
}