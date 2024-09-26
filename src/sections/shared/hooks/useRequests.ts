// src/modules/requests/hooks/useRequests.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiRequestRepository } from '../../../modules/requests/infrastructure/ApiRequestRepository'
import {
  getRequests,
  createRequest,
  updateRequest,
  deleteRequest
} from '../../../modules/requests/application'
import { RequestEntity } from '../../../modules/requests/domain/RequestEntity'

const repository = createApiRequestRepository()

export function useRequests(page: number = 0, size: number = 10) {
  const queryClient = useQueryClient()

  const fetchRequests = useQuery({
    queryKey: ['requests', page, size],
    queryFn: () => getRequests(repository)(page, size)
  })

  const createRequestMutation = useMutation({
    mutationFn: (newRequest: Omit<RequestEntity, 'id'>) =>
      createRequest(repository)(newRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
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
    requests: fetchRequests.data,
    isLoading: fetchRequests.isLoading,
    error: fetchRequests.error,
    createRequest: createRequestMutation.mutate,
    updateRequest: updateRequestMutation.mutate,
    deleteRequest: deleteRequestMutation.mutate,
    isPending:
      createRequestMutation.isPending ||
      updateRequestMutation.isPending ||
      deleteRequestMutation.isPending
  }
}
