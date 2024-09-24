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
