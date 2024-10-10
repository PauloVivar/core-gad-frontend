// src/modules/requests/hooks/useRequests.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query'
import { createApiRequestRepository } from '../../../modules/requests/infrastructure/ApiRequestRepository'
import {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest
} from '../../../modules/requests/application'
import {
  RequestEntity,
  CreateRequestDto
} from '../../../modules/requests/domain/RequestEntity'
import { Response } from '@/modules/shared/domain/response'

const repository = createApiRequestRepository()

export function useRequests() {
  const queryClient = useQueryClient()

  const getRequestsQuery = (
    page: number = 0
  ): UseQueryResult<Response<RequestEntity>, Error> => {
    console.log('useRequests', page)
    return useQuery({
      queryKey: ['requests', page],
      queryFn: () => getRequests(repository)(page),
      //staleTime: Infinity,
      staleTime: 5 * 60 * 1000, // 5 minutos
      placeholderData: (previousData) => previousData,
      gcTime: Infinity
    })
  }

  const createRequestMutation = useMutation<
    RequestEntity,
    Error,
    CreateRequestDto
  >({
    mutationFn: (newRequest: CreateRequestDto) =>
      createRequest(repository)(newRequest),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      console.log('useRequests', data)
      return data
    }
  })

  const updateRequestMutation = useMutation({
    mutationFn: ({
      id,
      request
    }: { id: number; request: Partial<RequestEntity> }) =>
      updateRequest(repository)(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    }
  })

  const deleteRequestMutation = useMutation({
    mutationFn: (id: number) => deleteRequest(repository)(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    }
  })

  return {
    getRequestsQuery,
    createRequest: (data: CreateRequestDto) =>
      createRequestMutation.mutateAsync(data),
    updateRequest: updateRequestMutation.mutate,
    deleteRequest: deleteRequestMutation.mutate,
    isPending:
      createRequestMutation.isPending ||
      updateRequestMutation.isPending ||
      deleteRequestMutation.isPending
  }
}
