// src/modules/requests/domain/RequestRepository.ts
import { Response } from '@/modules/shared/domain/response'
import { RequestEntity, RequestStatus, CreateRequestDto } from './RequestEntity'

export interface RequestRepository {
  findAll: () => Promise<RequestEntity[]>
  //findAllPages: (page: number, size: number) => Promise<Response<RequestEntity>>;
  findAllPages: (page: number) => Promise<Response<RequestEntity>>
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
