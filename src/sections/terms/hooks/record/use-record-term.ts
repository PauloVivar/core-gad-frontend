import { recordTerm } from '@/modules/terms/application/record/recordTerm'
import { createApiTermsRespository } from '@/modules/terms/infrastructure/ApiTermsRepository'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const repository = createApiTermsRespository()

export const useRecordTerm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      userId,
      accepted
    }: { userId: string; accepted: boolean }) => {
      await recordTerm(repository)(userId, accepted)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['latest-term'] })
    }
  })
}
