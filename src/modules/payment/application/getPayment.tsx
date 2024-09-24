import { Payment } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export const getPayment = (paymentRepository: PaymentRepository) => {
  return async (id: string): Promise<Payment> => {
    return await paymentRepository.get(id)
  }
}
