// src/modules/technical-reviews/infrastructure/ApiTechnicalReviewRepository.ts
import { TechnicalReview } from '../domain/TechnicalReview'
import { TechnicalReviewRepository } from '../domain/TechnicalReviewRepository'
import { requestsApi } from '@/interceptors/requests'

export function createApiTechnicalReviewRepository(): TechnicalReviewRepository {
  return {
    findAllByRequestId: async (requestId: number, page: number = 0) => {
      const response = await requestsApi.get(
        `/${requestId}/reviews/page/${page}`
      )
      return response.data
    },
    findById: async (requestId: number, id: number) => {
      const response = await requestsApi.get(`/${requestId}/reviews/${id}`)
      return response.data
    },
    create: async (requestId: number, review: Omit<TechnicalReview, 'id'>) => {
      const response = await requestsApi.post(`/${requestId}/reviews`, review)
      return response.data
    },
    update: async (
      requestId: number,
      id: number,
      review: Partial<TechnicalReview>
    ) => {
      const response = await requestsApi.put(
        `/${requestId}/reviews/${id}`,
        review
      )
      return response.data
    },
    remove: async (requestId: number, id: number) => {
      await requestsApi.delete(`/${requestId}/reviews/${id}`)
    }
  }
}
