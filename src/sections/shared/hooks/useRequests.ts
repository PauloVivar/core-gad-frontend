// src/modules/requests/hooks/useRequests.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

const repository = createApiRequestRepository()

export function useRequests(page: number = 0) {
  const queryClient = useQueryClient()

  const fetchRequests = useQuery({
    queryKey: ['requests', page],
    queryFn: () => getRequests(repository)(page)
  })

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
    requests: fetchRequests.data?.content,
    paginator: {
      pageNumber: page,
      totalPages: fetchRequests.data?.totalPages || 0,
      totalElements: fetchRequests.data?.totalElements || 0
    },
    isLoading: fetchRequests.isLoading,
    error: fetchRequests.error,
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
