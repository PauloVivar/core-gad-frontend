import { Document, CreateDocumentDto } from './Document'

export interface DocumentRepository {
  findAllByRequestId(requestId: number): Promise<Document[]>
  findAllPageByRequestId(
    requestId: number,
    page: number,
    size?: number
  ): Promise<{
    content: Document[]
    totalPages: number
    totalElements: number
  }>
  findById(requestId: number, id: number): Promise<Document | null>
  create(requestId: number, document: CreateDocumentDto): Promise<Document>
  update(
    requestId: number,
    id: number,
    document: Partial<Document>
  ): Promise<Document | null>
  remove(requestId: number, id: number): Promise<void>
}
