import { RequestRepository } from '../domain/RequestRepository'
import { RequestStatus } from '../domain/RequestEntity'

export const getRequestsByStatus = (repository: RequestRepository) => {
  return async (status: RequestStatus) => {
    return await repository.findByStatus(status)
  }
}
