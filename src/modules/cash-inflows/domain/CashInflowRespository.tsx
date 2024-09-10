import { CashInflow } from './CashInflow'

export interface CashInflowRepository {
  get: (code: number) => Promise<CashInflow | null>
  search: (query: string) => Promise<CashInflow[]>
  create: (cashInflow: CashInflow) => Promise<void>
}
