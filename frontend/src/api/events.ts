import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllEvents = (params?: any) => {
  return api.get('/events', { params });
};

export const getEventById = (id: string) => {
  return api.get(`/events/${id}`);
};

export const createEvent = (data: any) => {
  return api.post('/events', data);
};

export const updateEvent = (id: string, data: any) => {
  return api.put(`/events/${id}`, data);
};

export const deleteEvent = (id: string) => {
  return api.delete(`/events/${id}`);
};

export default api;
