import { getAllCreditTitles } from '@/modules/credit-titles/application/get-all/getAllCreditTitles'
import { createApiCreditTitlesRepository } from '@/modules/credit-titles/infrastructure/ApiCreditTitleRepository'
import { loadingCreditTitles } from '@/redux/states/credit-tiles'
import { useDispatch, useSelector } from 'react-redux'

const repository = createApiCreditTitlesRepository()

export const useCreditTitles = () => {
  const { creditTitles } = useSelector((state) => state.creditTitles)
  const dispatch = useDispatch()

  const getCreditTitles = async (page = '1') => {
    const result = await getAllCreditTitles(repository)(page)
    console.log('hola')
    console.log(result.content)
    dispatch(loadingCreditTitles(result))
  }

  return { getCreditTitles, creditTitles }
}
