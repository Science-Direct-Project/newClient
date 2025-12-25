import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
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

// Administrative endpoints
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  assignReviewer: (payload) => api.post('/admin/assign-reviewer', payload),
  updateUserRoles: (payload) => api.patch('/admin/user-roles', payload),
  getPendingManuscripts: () => api.get('/admin/pending-manuscripts'),
  setManuscriptStatus: (id: string, status: string) =>
    api.patch(`/admin/manuscripts/${id}/status`, { status }),
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

interface ReviewFormData {
  scores: {
    originality: number;
    methodology: number;
    contribution: number;
    clarity: number;
    references: number;
  };
  commentsToAuthor: string;
  commentsToEditor?: string;
  confidentialComments?: string;
  recommendation: 'accept' | 'minor_revisions' | 'major_revisions' | 'reject';
}

// Reviewer endpoints
export const reviewerAPI = {
  // Get reviewer statistics
  getStatistics: () => api.get('/reviews/statistics'),

  // Get all review assignments
  getMyReviews: (params?: { status?: string; page?: number; limit?: number }) => {
    return api.get('/reviews/my-reviews', { params });
  },

  // Get review details
  getReviewDetails: (reviewId: string) => api.get(`/reviews/${reviewId}`),

  // Get manuscript for review
  getManuscriptForReview: (manuscriptId: string) => 
    api.get(`/reviews/manuscript/${manuscriptId}/for-review`),

  // Accept review assignment
  acceptAssignment: (assignmentId: string) => 
    api.put(`/reviews/${assignmentId}/accept`),

  // Decline review assignment
  declineAssignment: (assignmentId: string, reason?: string) => 
    api.put(`/reviews/${assignmentId}/decline`, { reason }),

  // Submit review
  submitReview: (manuscriptId: string, reviewData: ReviewFormData) =>
    api.post(`/reviews/${manuscriptId}/submit`, reviewData),

  // Update review (before submission)
  updateReview: (reviewId: string, reviewData: Partial<ReviewFormData>) =>
    api.put(`/reviews/${reviewId}`, reviewData),
};

export default api;