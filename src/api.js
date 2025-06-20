import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update if needed

export const getHabits = () => axios.get(`${BASE_URL}/habits`);

export const joinHabit = (habitId) =>
  axios.post(`${BASE_URL}/habits/${habitId}/join`);
