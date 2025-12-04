// API Service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (userData: { name: string; email: string; password: string; college?: string; phone?: string; role?: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Event APIs
export const eventAPI = {
  getAllEvents: async () => {
    const response = await fetch(`${API_BASE_URL}/events`);
    return response.json();
  },

  getEventById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    return response.json();
  },

  createEvent: async (eventData: {
    title: string;
    description?: string;
    price: number;
    capacity: number;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  updateEvent: async (id: string, eventData: {
    title?: string;
    description?: string;
    price?: number;
    capacity?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  deleteEvent: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getEventStats: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}/stats`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Ticket APIs
export const ticketAPI = {
  createTicket: async (userId: string, eventId: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ userId, eventId }),
    });
    return response.json();
  },

  getUserTickets: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/user/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getTicketById: async (ticketId: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  validateTicket: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return response.json();
  },
};

export default {
  authAPI,
  eventAPI,
  ticketAPI,
};
