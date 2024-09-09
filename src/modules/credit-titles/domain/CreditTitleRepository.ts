import { CreditTitle } from './CreditTitle'

export interface CreditTitleRepository {
  get: (id: string) => Promise<CreditTitle | null>
  search: (query: string) => Promise<CreditTitle[]>
}
