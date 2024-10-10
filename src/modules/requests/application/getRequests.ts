import { Response } from '@/modules/shared/domain/response'
import { RequestRepository } from '../domain/RequestRepository'
import { RequestEntity } from '../domain/RequestEntity'

export const getRequests = (repository: RequestRepository) => {
  return async (page: number): Promise<Response<RequestEntity>> => {
    return await repository.findAllPages(page)
  }
}
