import { Payment } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export function getPaymentByDni(paymentRepository: PaymentRepository) {
  return async (dni: string): Promise<Payment[]> => {
    return await paymentRepository.getByDni(dni)
  }
}
