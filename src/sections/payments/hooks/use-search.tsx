import { searchPayments } from '@/modules/payment/application/searchPayments'
import { Payment } from '@/modules/payment/domain/Payment'
import { createApiPaymentRepository } from '@/modules/payment/infrastructure/ApiPaymentRepository'
import { useQuery } from '@tanstack/react-query'

const repository = createApiPaymentRepository()

export const useSearchPayments = (query: string) => {
  return useQuery<Payment[]>({
    queryKey: ['payments', query],
    queryFn: () => searchPayments(repository)(query)
  })
}
