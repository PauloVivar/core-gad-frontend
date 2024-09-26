import { RequestRepository } from '../domain/RequestRepository'
import { RequestEntity } from '../domain/RequestEntity'

export const createRequest = (repository: RequestRepository) => {
  return async (request: Omit<RequestEntity, 'id'>): Promise<RequestEntity> => {
    return await repository.create(request)
  }
}
