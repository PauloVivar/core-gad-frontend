import { RequestEntity } from '../domain/RequestEntity'
import { RequestRepository } from '../domain/RequestRepository'

export const updateRequest = (repository: RequestRepository) => {
  return async (id: number, request: Partial<RequestEntity>) => {
    return await repository.update(id, request)
  }
}
