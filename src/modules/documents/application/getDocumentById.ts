import { DocumentRepository } from '../domain/DocumentRepository'

export const getDocumentById = (repository: DocumentRepository) => {
  return async (id: number) => {
    return await repository.findById(id)
  }
}
