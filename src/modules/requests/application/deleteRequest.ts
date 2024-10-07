import { RequestRepository } from '../domain/RequestRepository'

export const deleteRequest = (repository: RequestRepository) => {
  return async (id: number) => {
    await repository.remove(id)
  }
}
