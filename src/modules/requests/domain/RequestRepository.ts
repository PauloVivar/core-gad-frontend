// src/modules/requests/domain/RequestRepository.ts
import { PaginatedResponse } from '@/modules/shared/domain/PaginatedResponse'
import { RequestEntity, RequestStatus, CreateRequestDto } from './RequestEntity'

export interface RequestRepository {
  findAll: () => Promise<RequestEntity[]>
  findAllPages: (page: number) => Promise<PaginatedResponse<RequestEntity>>
  findById: (id: number) => Promise<RequestEntity>
  create: (request: CreateRequestDto) => Promise<RequestEntity>
  update: (
    id: number,
    request: Partial<RequestEntity>
  ) => Promise<RequestEntity>
  remove: (id: number) => Promise<void>
  findByStatus: (status: RequestStatus) => Promise<RequestEntity[]>
  findByUser: (userId: number) => Promise<RequestEntity[]>
}
