import { Document } from './Document'

export interface DocumentRepository {
  findAllByRequestId: (requestId: number) => Promise<Document[]>
  findById: (id: number) => Promise<Document>
  create: (document: Omit<Document, 'id'>) => Promise<Document>
  update: (id: number, document: Partial<Document>) => Promise<Document>
  remove: (id: number) => Promise<void>
}
