import { Payment, PaymentsResponse, UpdateStatusPaymentParams } from './Payment'

export interface PaymentRepository {
  create(payment: Payment): Promise<void>
  update(payment: UpdateStatusPaymentParams): Promise<void>
  get(id: string): Promise<Payment>
  getByDni(dni: string): Promise<PaymentsResponse | null>
  search(query: string): Promise<Payment[]>
}
