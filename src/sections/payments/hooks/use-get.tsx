import { getPayment } from '@/modules/payment/application/getPayment'
import { Payment } from '@/modules/payment/domain/Payment'
import { createApiPaymentRepository } from '@/modules/payment/infrastructure/ApiPaymentRepository'
import { useQuery } from '@tanstack/react-query'

const repository = createApiPaymentRepository()

export const useGetPayment = (id: string) => {
  return useQuery<Payment>({
    queryKey: ['payment', id],
    queryFn: () => getPayment(repository)(id)
  })
}
