import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const manuscriptAPI = {
  // Submit new manuscript (with file upload)
  submitManuscript: (formData) => {
    return api.post('/manuscripts/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Get author's manuscripts
  getMyManuscripts: () => api.get('/manuscripts/my-manuscripts'),

  // Get specific manuscript
  getManuscript: (id) => api.get(`/manuscripts/${id}`),
};

export default api;