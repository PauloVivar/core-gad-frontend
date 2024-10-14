import { TechnicalReviewRepository } from '../domain/TechnicalReviewRepository'

export const deleteTechnicalReview = (
  repository: TechnicalReviewRepository
) => {
  return async (requestId: number, id: number) => {
    await repository.remove(requestId, id)
  }
}
