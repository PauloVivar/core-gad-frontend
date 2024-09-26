import { documentsApi } from '@/interceptors/documents/axios.interceptors'
import { Document } from '../domain/Document'
import { DocumentRepository } from '../domain/DocumentRepository'

export function createApiDocumentRepository(): DocumentRepository {
  return {
    findAllByRequestId: async (requestId: number) => {
      const response = await documentsApi.get(`/request/${requestId}`)
      return response.data
    },
    findById: async (id: number) => {
      const response = await documentsApi.get(`/${id}`)
      return response.data
    },
    create: async (document: Omit<Document, 'id'>) => {
      const response = await documentsApi.post('/', document)
      return response.data
    },
    update: async (id: number, document: Partial<Document>) => {
      const response = await documentsApi.put(`/${id}`, document)
      return response.data
    },
    remove: async (id: number) => {
      await documentsApi.delete(`/${id}`)
    }
  }
}
