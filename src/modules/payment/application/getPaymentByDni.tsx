import { PaymentsResponse } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export function getPaymentByDni(paymentRepository: PaymentRepository) {
  return async (dni: string): Promise<PaymentsResponse | null> => {
    return await paymentRepository.getByDni(dni)
  }
}
