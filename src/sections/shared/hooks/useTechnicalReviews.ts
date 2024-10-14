import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createApiTechnicalReviewRepository } from '@/modules/technical-review/infrastructure/ApiTechnicalReviewRepository'
import {
  getTechnicalReviews,
  createTechnicalReview,
  updateTechnicalReview,
  deleteTechnicalReview
} from '@/modules/technical-review/application'
import { TechnicalReview } from '@/modules/technical-review/domain/TechnicalReview'

const repository = createApiTechnicalReviewRepository()

export function useTechnicalReviews(requestId: number) {
  const queryClient = useQueryClient()

  const technicalReviewsQuery = useQuery({
    queryKey: ['technicalReviews', requestId],
    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === 'number' ? pageParam : 0
      return getTechnicalReviews(repository)(requestId, page)
    }
  })

  const createTechnicalReviewMutation = useMutation({
    mutationFn: (review: Omit<TechnicalReview, 'id'>) =>
      createTechnicalReview(repository)(requestId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['technicalReviews', requestId]
      })
    }
  })

  const updateTechnicalReviewMutation = useMutation({
    mutationFn: ({
      id,
      review
    }: { id: number; review: Partial<TechnicalReview> }) =>
      updateTechnicalReview(repository)(requestId, id, review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['technicalReviews', requestId]
      })
    }
  })

  const deleteTechnicalReviewMutation = useMutation({
    mutationFn: (id: number) =>
      deleteTechnicalReview(repository)(requestId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['technicalReviews', requestId]
      })
    }
  })

  return {
    technicalReviews: technicalReviewsQuery.data,
    isLoading: technicalReviewsQuery.isLoading,
    error: technicalReviewsQuery.error,
    createTechnicalReview: createTechnicalReviewMutation.mutate,
    updateTechnicalReview: updateTechnicalReviewMutation.mutate,
    deleteTechnicalReview: deleteTechnicalReviewMutation.mutate
  }
}
