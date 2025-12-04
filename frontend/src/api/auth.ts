import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const register = (data: any) => {
  return api.post('/auth/register', data);
};

export const login = (data: { email: string; password: string }) => {
  return api.post('/auth/login', data);
};

export const getMe = (token: string) => {
  return api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
