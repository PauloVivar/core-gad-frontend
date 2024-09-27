import { searchCreditTitles } from '@/modules/credit-titles/application/search/searchCreditTitles'
import { createApiCreditTitlesRepository } from '@/modules/credit-titles/infrastructure/ApiCreditTitleRepository'
import { useQuery } from '@tanstack/react-query'

const repository = createApiCreditTitlesRepository()

export const useGetCreditTitles = (query: string) => {
  return useQuery({
    queryKey: ['credit-titles'],
    queryFn: async () => await searchCreditTitles(repository)(query)
  })
}
