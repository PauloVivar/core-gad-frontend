import { Payment } from './Payment'

export interface PaymentRepository {
  create(payment: Payment): Promise<void>
  get(id: string): Promise<Payment>
  getByDni(id: string): Promise<Payment[]>
  search(query: string): Promise<Payment[]>
}
