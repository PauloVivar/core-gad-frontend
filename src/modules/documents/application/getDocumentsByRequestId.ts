import { DocumentRepository } from '../domain/DocumentRepository'

export const getDocumentsByRequestId = (repository: DocumentRepository) => {
  return async (requestId: number) => {
    return await repository.list(requestId)
  }
}
