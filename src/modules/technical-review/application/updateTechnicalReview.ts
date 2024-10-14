import { TechnicalReview } from '../domain/TechnicalReview'
import { TechnicalReviewRepository } from '../domain/TechnicalReviewRepository'

export const updateTechnicalReview = (
  repository: TechnicalReviewRepository
) => {
  return async (
    requestId: number,
    id: number,
    review: Partial<TechnicalReview>
  ) => {
    return await repository.update(requestId, id, review)
  }
}
