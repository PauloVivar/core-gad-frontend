import { Payment } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export function createPayment(paymentRepository: PaymentRepository) {
  return async (payment: Payment): Promise<void> => {
    await paymentRepository.create(payment)
  }
}
