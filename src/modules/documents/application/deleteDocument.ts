import { DocumentRepository } from '../domain/DocumentRepository'

export const deleteDocument = (repository: DocumentRepository) => {
  return async (requestId: number, id: number) => {
    await repository.remove(requestId, id)
  }
}
