import { requestsApi } from '@/interceptors/requests/axios.interceptors'
import { Document } from '../domain/Document'
import { DocumentRepository } from '../domain/DocumentRepository'

export function createApiDocumentRepository(): DocumentRepository {
  return {
    list: async (requestId: number) => {
      const response = await requestsApi.get(`/${requestId}/documents`)
      return response.data
    },
    create: async (requestId: number, document: Omit<Document, 'id'>) => {
      const response = await requestsApi.post(
        `/${requestId}/documents`,
        document
      )
      return response.data
    },
    update: async (
      requestId: number,
      id: number,
      document: Partial<Document>
    ) => {
      const response = await requestsApi.put(
        `/${requestId}/documents/${id}`,
        document
      )
      return response.data
    },
    remove: async (requestId: number, id: number) => {
      await requestsApi.delete(`/${requestId}/documents/${id}`)
    }
  }
}
