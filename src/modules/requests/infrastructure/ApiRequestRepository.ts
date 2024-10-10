import { requestsApi } from '@/interceptors/requests'
import {
  RequestEntity,
  RequestStatus,
  CreateRequestDto
} from '../domain/RequestEntity'
import { RequestRepository } from '../domain/RequestRepository'
import { Response } from '@/modules/shared/domain/response'

function createApiRequestRepository(): RequestRepository {
  return {
    findAll: async () => {
      const response = await requestsApi.get('/')
      return response.data
    },
    findAllPages: async (page: number): Promise<Response<RequestEntity>> => {
      const response = await requestsApi.get<Response<RequestEntity>>(
        `/page/${page}`
      )
      return response.data
    },
    findById: async (id: number) => {
      const response = await requestsApi.get(`/${id}`)
      return response.data
    },
    create: async (request: CreateRequestDto): Promise<RequestEntity> => {
      const response = await requestsApi.post('', request)
      return response.data
    },
    update: async (id: number, request: Partial<RequestEntity>) => {
      const response = await requestsApi.put(`/${id}`, request)
      return response.data
    },
    remove: async (id: number) => {
      await requestsApi.delete(`/${id}`)
    },
    findByStatus: async (status: RequestStatus) => {
      const response = await requestsApi.get(`/status/${status}`)
      return response.data
    },
    findByUser: async (userId: number) => {
      const response = await requestsApi.get(`/user/${userId}`)
      return response.data
    }
  }
}

export { createApiRequestRepository }
