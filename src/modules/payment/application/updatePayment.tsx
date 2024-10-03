import { UpdateStatusPaymentParams } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export function updatePayment(respository: PaymentRepository) {
  return async (payment: UpdateStatusPaymentParams): Promise<void> => {
    await respository.update(payment)
  }
}
