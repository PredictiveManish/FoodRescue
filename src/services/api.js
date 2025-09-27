// src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const foodPostsAPI = {
  create: (postData) => api.post('/food-posts', postData),
  getNearby: (location, maxDistance = 20000) => 
    api.get(`/food-posts/nearby?longitude=${location.lng}&latitude=${location.lat}&maxDistance=${maxDistance}`),
  claim: (postId, ngoId) => api.patch(`/food-posts/${postId}/claim`, { ngoId }),
};

export const usersAPI = {
  getNearbyRestaurants: (location, maxDistance = 20000) =>
    api.get(`/users/nearby/restaurants?longitude=${location.lng}&latitude=${location.lat}&maxDistance=${maxDistance}`),
  getNearbyNGOs: (location, maxDistance = 20000) =>
    api.get(`/users/nearby/ngos?longitude=${location.lng}&latitude=${location.lat}&maxDistance=${maxDistance}`),
  updateLocation: (userId, coordinates) => api.put(`/users/${userId}/location`, { coordinates }),
};

export default api;