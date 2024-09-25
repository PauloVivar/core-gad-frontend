import { Response } from '@/modules/shared/domain/response'

export interface Payment {
  id: string
  concept: string
  value: number
  reference: string
  creditTitles: string[]
  requestId?: number
  processUrl?: string
  cedula?: string
}

export type PaymentsResponse = Response<Payment>
