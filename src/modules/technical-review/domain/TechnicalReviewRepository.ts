// src/modules/technical-reviews/domain/TechnicalReviewRepository.ts
import { TechnicalReview } from './TechnicalReview'

export interface TechnicalReviewRepository {
  findAllByRequestId: (
    requestId: number,
    page?: number
  ) => Promise<{
    content: TechnicalReview[]
    totalPages: number
    totalElements: number
  }>
  findById: (requestId: number, id: number) => Promise<TechnicalReview | null>
  create: (
    requestId: number,
    review: Omit<TechnicalReview, 'id'>
  ) => Promise<TechnicalReview>
  update: (
    requestId: number,
    id: number,
    review: Partial<TechnicalReview>
  ) => Promise<TechnicalReview>
  remove: (requestId: number, id: number) => Promise<void>
}
