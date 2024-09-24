import { createPayment } from '@/modules/payment/application/createPayment'
import { getPayment } from '@/modules/payment/application/getPayment'
import { getPaymentByDni } from '@/modules/payment/application/getPaymentByDni'
import { searchPayments } from '@/modules/payment/application/searchPayments'
import { createApiPaymentRepository } from '@/modules/payment/infrastructure/ApiPaymentRepository'
import {
  loadingPayments,
  loadingTransactions
} from '@/redux/states/payment-cart'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const repository = createApiPaymentRepository()

export const usePayments = () => {
  const { payments, transactions, totalRows } = useSelector(
    (state) => state.paymentCart
  )
  const dispatch = useDispatch()

  const create = async ({
    concept,
    value,
    reference,
    creditTitles
  }: {
    concept: string
    value: number
    reference: string
    creditTitles: string[]
  }) => {
    const id = (uuidv4 as () => string)()

    await createPayment(repository)({
      id,
      concept,
      value,
      reference,
      creditTitles
    })
    console.log('payment created', id)
    return await get(id)
  }

  const get = (id: string) => {
    const result = getPayment(repository)(id)
    return result
  }

  const getByDni = async (dni: string) => {
    const result = await getPaymentByDni(repository)(dni)
    dispatch(loadingTransactions(result))
  }

  const search = async (query: string) => {
    const result = await searchPayments(repository)(query)
    dispatch(loadingPayments(result))
  }

  const getPaginator = (pageSize: number, pageNumber: number) => {
    return {
      pageSize,
      pageNumber,
      totalRows,
      totalPages: Math.ceil(totalRows / pageSize)
    }
  }

  return {
    createPayment: create,
    searchPayments: search,
    getPaginator,
    getPaymementByDni: getByDni,
    payments,
    transactions
  }
}
