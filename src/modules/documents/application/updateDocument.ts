import { DocumentRepository } from '../domain/DocumentRepository'
import { Document } from '../domain/Document'

export const updateDocument = (repository: DocumentRepository) => {
  return async (
    requestId: number,
    id: number,
    document: Partial<Document>
  ): Promise<Document | null> => {
    return await repository.update(requestId, id, document)
  }
}
