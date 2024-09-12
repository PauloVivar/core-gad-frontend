import { Taxpayer } from '@/modules/taxpayers/domain/Taxpayer'

export interface User {
  id: number
  username: string
  email: string
  admin: boolean
  avatar?: string
  status?: string
  contribuyenteCi: string
  contribuyente: Taxpayer
}
