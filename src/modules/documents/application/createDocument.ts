import { DocumentRepository } from '../domain/DocumentRepository'
import { CreateDocumentDto, Document } from '../domain/Document'

export const createDocument = (repository: DocumentRepository) => {
  return async (
    requestId: number,
    document: CreateDocumentDto
  ): Promise<Document> => {
    return await repository.create(requestId, document)
  }
}
