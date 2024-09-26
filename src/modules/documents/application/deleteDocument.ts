import { DocumentRepository } from '../domain/DocumentRepository'

export const deleteDocument = (repository: DocumentRepository) => {
  return async (id: number) => {
    await repository.remove(id)
  }
}
