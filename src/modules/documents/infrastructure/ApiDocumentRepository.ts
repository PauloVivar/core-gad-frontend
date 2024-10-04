import axios from 'axios'
import { requestsApi } from '@/interceptors/requests/axios.interceptors'
import { Document, CreateDocumentDto } from '../domain/Document'
import { DocumentRepository } from '../domain/DocumentRepository'

export function createApiDocumentRepository(): DocumentRepository {
  return {
    async findAllByRequestId(requestId: number): Promise<Document[]> {
      const response = await requestsApi.get(`/${requestId}/documents`)
      return response.data
    },

    async findAllPageByRequestId(
      requestId: number,
      page: number,
      size: number = 5
    ): Promise<{
      content: Document[]
      totalPages: number
      totalElements: number
    }> {
      const response = await requestsApi.get(
        `/${requestId}/documents/page/${page}`,
        {
          params: { size }
        }
      )
      return response.data
    },

    async findById(requestId: number, id: number): Promise<Document | null> {
      try {
        const response = await requestsApi.get(`/${requestId}/documents/${id}`)
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null
        }
        throw error
      }
    },

    async create(
      requestId: number,
      document: CreateDocumentDto
    ): Promise<Document> {
      const response = await requestsApi.post(
        `/${requestId}/documents`,
        document
      )
      return response.data
    },

    async update(
      requestId: number,
      id: number,
      document: Partial<Document>
    ): Promise<Document | null> {
      try {
        const response = await requestsApi.put(
          `/${requestId}/documents/${id}`,
          document
        )
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return null
        }
        throw error
      }
    },

    async remove(requestId: number, id: number): Promise<void> {
      await requestsApi.delete(`/${requestId}/documents/${id}`)
    }
  }
}
