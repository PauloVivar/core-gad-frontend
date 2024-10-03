import { Response } from '@/modules/shared/domain/response'

export interface Payment {
  id: string
  concept: string
  value: number
  reference: string
  status: string
  creditTitles?: string[]
  createdAt: string
  requestId?: number
  processUrl?: string
  cedula?: string
}

export type PaymentsResponse = Response<Payment>

export type UpdateStatusPaymentParams = Pick<Payment, 'id' | 'status'>

export enum PaymentStatus {
  PENDING = 'PENDIENTE',
  REJECTED = 'RECHAZADO',
  ACCEPTED = 'ACEPTADO'
}
