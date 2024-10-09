import { checkTerm } from '@/modules/terms/application/check/checkTerm'
import { createApiTermsRespository } from '@/modules/terms/infrastructure/ApiTermsRepository'
import { useMutation } from '@tanstack/react-query'

const repository = createApiTermsRespository()

export const useCheckTerm = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      await checkTerm(repository)(userId)
    }
  })
}
