import { RequestRepository } from '../domain/RequestRepository'

export const getRequests = (repository: RequestRepository) => {
  return async (page: number = 0) => {
    return await repository.findAllPages(page)
  }
}
