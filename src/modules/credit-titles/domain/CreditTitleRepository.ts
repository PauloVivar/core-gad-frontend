import { CreditTitle } from './CreditTitle'

export interface CreditTitleRepository {
  get: (id: string) => Promise<CreditTitle | null>
  getAll: (page: string) => Promise<CreditTitle[]>
}
