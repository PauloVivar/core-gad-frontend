import { Payment } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export const searchPayments = (paymentRepository: PaymentRepository) => {
  return async (query: string): Promise<Payment[]> => {
    return await paymentRepository.search(query)
  }
}
