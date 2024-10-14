import { TechnicalReview } from '../domain/TechnicalReview'
import { TechnicalReviewRepository } from '../domain/TechnicalReviewRepository'

export const createTechnicalReview = (
  repository: TechnicalReviewRepository
) => {
  return async (requestId: number, review: Omit<TechnicalReview, 'id'>) => {
    return await repository.create(requestId, review)
  }
}
