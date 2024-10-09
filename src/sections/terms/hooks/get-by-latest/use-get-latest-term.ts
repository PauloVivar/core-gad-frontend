import { getByLatestTerm } from '@/modules/terms/application/get-by-latest/getByLatestTerm'
import { createApiTermsRespository } from '@/modules/terms/infrastructure/ApiTermsRepository'
import { useQuery } from '@tanstack/react-query'

const repository = createApiTermsRespository()

export const useGetLastTerm = () => {
  return useQuery({
    queryKey: ['latest-term'],
    queryFn: () => getByLatestTerm(repository)()
  })
}
