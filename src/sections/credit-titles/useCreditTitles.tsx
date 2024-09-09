import { searchCreditTitles } from '@/modules/credit-titles/application/search/searchCreditTitles'
import { createApiCreditTitlesRepository } from '@/modules/credit-titles/infrastructure/ApiCreditTitleRepository'
import { loadingCreditTitles } from '@/redux/states/credit-titles'
import { useDispatch, useSelector } from 'react-redux'

const repository = createApiCreditTitlesRepository()

export const useCreditTitles = () => {
  const { creditTitles, totalRows } = useSelector((state) => state.creditTitles)
  const dispatch = useDispatch()

  const getCreditTitles = async (query: string) => {
    const result = await searchCreditTitles(repository)(query)
    dispatch(loadingCreditTitles(result))
  }

  const getPaginator = (pageSize: number, pageNumber: number) => {
    return {
      pageSize,
      pageNumber,
      totalRows,
      totalPages: Math.ceil(totalRows / pageSize)
    }
  }

  return { getCreditTitles, creditTitles, totalRows, getPaginator }
}
