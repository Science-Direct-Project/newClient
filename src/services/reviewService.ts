// src/services/reviewService.ts
import axios from '../utils/axiosInstance';

export const reviewService = {
  submitReview: (manuscriptId: string, data: any) =>
    axios.post(`/reviews/${manuscriptId}/submit`, data),

  acceptAssignment: (assignmentId: string) =>
    axios.put(`/reviews/${assignmentId}/accept`),

  declineAssignment: (assignmentId: string, reason?: string) =>
    axios.put(`/reviews/${assignmentId}/decline`, { reason }),

  updateReview: (reviewId: string, data: any) =>
    axios.put(`/reviews/${reviewId}`, data),

  getMyReviews: (params?: { status?: string; page?: number; limit?: number }) =>
    axios.get(`/reviews/my-reviews`, { params }),

  getStatistics: () =>
    axios.get(`/reviews/statistics`),

  getReviewDetails: (reviewId: string) =>
    axios.get(`/reviews/${reviewId}`),

  getManuscriptReviews: (manuscriptId: string) =>
    axios.get(`/reviews/manuscript/${manuscriptId}`)
};

export type ReviewService = typeof reviewService;
export default reviewService;
