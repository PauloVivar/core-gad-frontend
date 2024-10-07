import { Response } from '@/modules/shared/domain/response'

export interface Payment {
  id: string
  concept: string
  value: number
  reference: string
  status: string
  creditTitles?: string[]
  createdAt?: string
  requestId?: number
  processUrl?: string
  cedula?: string
}

export interface PaymentResponse {
  id: string
  concept: string
  value: number
  reference: string
  status: string
  creditTitles?: CreditTitle[]
  createdAt?: string
  requestId?: number
  processUrl?: string
  cedula?: string
}

interface CreditTitle {
  codigo: string
  valor: number
  detalle: string
}

export type PaymentsResponse = Response<PaymentResponse>

export type UpdateStatusPaymentParams = Pick<Payment, 'id' | 'status'>

export enum PaymentStatus {
  PENDING = 'PENDIENTE',
  REJECTED = 'RECHAZADO',
  ACCEPTED = 'ACEPTADO'
}
