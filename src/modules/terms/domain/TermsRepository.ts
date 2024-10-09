import { Term } from './Term'

export interface TermsRepository {
  get: () => Promise<Term[]>
  findLatestTerm: () => Promise<Term>
  check: (userId: string) => Promise<boolean>
  record: (userId: string, accepted: boolean) => Promise<void>
}
