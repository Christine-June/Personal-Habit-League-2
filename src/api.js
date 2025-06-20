import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; 

export const getHabits = () => axios.get(`${BASE_URL}/habits`);

export const joinHabit = (habitId) =>
  axios.post(`${BASE_URL}/habits/${habitId}/join`);

export const getChallengeParticipants = (challengeId) =>
  axios.get(`http://localhost:5000/challenges/${challengeId}/participants`);

export const addParticipantToChallenge = (challengeId, data) =>
  axios.post(`http://localhost:5000/challenges/${challengeId}/participants`, data);
