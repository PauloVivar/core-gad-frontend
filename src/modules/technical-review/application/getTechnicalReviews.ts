import { TechnicalReviewRepository } from '../domain/TechnicalReviewRepository'

export const getTechnicalReviews = (repository: TechnicalReviewRepository) => {
  return async (requestId: number, page: number = 0) => {
    return await repository.findAllByRequestId(requestId, page)
  }
}
