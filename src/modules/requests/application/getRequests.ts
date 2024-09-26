import { RequestRepository } from '../domain/RequestRepository'

export const getRequests = (repository: RequestRepository) => {
  return async (page: number, size: number) => {
    return await repository.findAllPaginated(page, size)
  }
}
