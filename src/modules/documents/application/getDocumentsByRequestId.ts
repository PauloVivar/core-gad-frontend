import { DocumentRepository } from '../domain/DocumentRepository'
import { Document } from '../domain/Document'

export const getDocumentsByRequestId = (repository: DocumentRepository) => {
  return async (requestId: number): Promise<Document[]> => {
    return await repository.findAllByRequestId(requestId)
  }
}
