import { RequestRepository } from '../domain/RequestRepository'

export const getRequests = (repository: RequestRepository) => {
  return async (page: number) => {
    return await repository.findAllPaginated(page)
  }
}
