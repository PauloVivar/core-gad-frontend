import { Document } from '../domain/Document'
import { DocumentRepository } from '../domain/DocumentRepository'

export const updateDocument = (repository: DocumentRepository) => {
  return async (requestId: number, id: number, document: Partial<Document>) => {
    return await repository.update(requestId, id, document)
  }
}
