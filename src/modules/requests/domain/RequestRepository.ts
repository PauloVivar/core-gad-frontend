// src/modules/requests/domain/RequestRepository.ts
import { RequestEntity, RequestStatus } from './RequestEntity'

export interface RequestRepository {
  findAll: () => Promise<RequestEntity[]>
  findAllPaginated: (page: number) => Promise<{
    content: RequestEntity[]
    totalElements: number
    totalPages: number
  }>
  findById: (id: number) => Promise<RequestEntity>
  create: (request: Omit<RequestEntity, 'id'>) => Promise<RequestEntity>
  update: (
    id: number,
    request: Partial<RequestEntity>
  ) => Promise<RequestEntity>
  remove: (id: number) => Promise<void>
  findByStatus: (status: RequestStatus) => Promise<RequestEntity[]>
  findByUser: (userId: number) => Promise<RequestEntity[]>
}
