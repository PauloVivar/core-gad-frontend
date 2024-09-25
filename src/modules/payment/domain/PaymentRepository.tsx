import { Payment, PaymentsResponse } from './Payment'

export interface PaymentRepository {
  create(payment: Payment): Promise<void>
  get(id: string): Promise<Payment>
  getByDni(dni: string): Promise<PaymentsResponse>
  search(query: string): Promise<Payment[]>
}
