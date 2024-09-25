import { getPaymentByDni } from '@/modules/payment/application/getPaymentByDni'
import { createApiPaymentRepository } from '@/modules/payment/infrastructure/ApiPaymentRepository'
import { useQuery } from '@tanstack/react-query'

const repository = createApiPaymentRepository()

export const useGetPaymentsByDni = (dni: string) => {
  return useQuery({
    queryKey: ['paymentsByDni', dni],
    queryFn: async () => await getPaymentByDni(repository)(dni)
  })
}
