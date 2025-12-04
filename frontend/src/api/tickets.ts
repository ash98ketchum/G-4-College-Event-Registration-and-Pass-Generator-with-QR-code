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

export const registerForEvent = (eventId: string) => {
  return api.post('/tickets/register', { eventId });
};

export const getUserTickets = () => {
  return api.get('/tickets/my-tickets');
};

export const getTicketById = (id: string) => {
  return api.get(`/tickets/${id}`);
};

export const getAllTickets = () => {
  return api.get('/tickets/all');
};

export const verifyTicket = (ticketNumber: string) => {
  return api.post('/tickets/verify', { ticketNumber });
};

export const checkInTicket = (ticketNumber: string) => {
  return api.post('/tickets/check-in', { ticketNumber });
};

export const cancelTicket = (id: string) => {
  return api.put(`/tickets/${id}/cancel`);
};

export default api;
