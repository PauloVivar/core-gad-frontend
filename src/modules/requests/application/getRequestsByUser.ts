import { RequestRepository } from '../domain/RequestRepository'

export const getRequestsByUser = (repository: RequestRepository) => {
  return async (userId: number) => {
    return await repository.findByUser(userId)
  }
}
