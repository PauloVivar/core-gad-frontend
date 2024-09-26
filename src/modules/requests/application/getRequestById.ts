import { RequestRepository } from '../domain/RequestRepository'

export const getRequestById = (repository: RequestRepository) => {
  return async (id: number) => {
    return await repository.findById(id)
  }
}
