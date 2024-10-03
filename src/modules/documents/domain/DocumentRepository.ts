import { Document } from './Document'

export interface DocumentRepository {
  list: (requestId: number) => Promise<Document[]>
  create: (
    requestId: number,
    document: Omit<Document, 'id'>
  ) => Promise<Document>
  update: (
    requestId: number,
    id: number,
    document: Partial<Document>
  ) => Promise<Document>
  remove: (requestId: number, id: number) => Promise<void>
}
