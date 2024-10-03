import { CreditTitle, CreditTitlesResponse } from './CreditTitle'

export interface CreditTitleRepository {
  get: (id: string) => Promise<CreditTitle | null>
  search: (query: string) => Promise<CreditTitlesResponse>
}
