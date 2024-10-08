import { getTerms } from '@/modules/terms/application/get/getTerms'
import { createApiTermsRespository } from '@/modules/terms/infrastructure/ApiTermsRepository'
import { useQuery } from '@tanstack/react-query'

const repository = createApiTermsRespository()

export const useGetTerms = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: () => getTerms(repository)()
  })
}
