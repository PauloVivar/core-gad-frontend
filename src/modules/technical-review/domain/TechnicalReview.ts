export interface TechnicalReview {
  id: number
  requestId: number
  reviewerId: number | null
  reviewerName: string | null
  reviewerEmail: string | null
  date: string
  comments: string
  result: ReviewResult
}

export enum ReviewResult {
  EN_PROCESO = 'EN_PROCESO',
  NECESITA_CORRECCION = 'NECESITA_CORRECCION',
  RECHAZADO = 'RECHAZADO',
  APROBADO = 'APROBADO'
}
