import { Document } from '../domain/Document'
import { DocumentRepository } from '../domain/DocumentRepository'

export const createDocument = (repository: DocumentRepository) => {
  return async (requestId: number, document: Omit<Document, 'id'>) => {
    return await repository.create(requestId, document)
  }
}
