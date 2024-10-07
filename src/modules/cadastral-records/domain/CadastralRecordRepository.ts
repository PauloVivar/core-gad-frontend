import { CadastralRecord } from './CadastralRecord'

export interface CadastralRecordRepository {
  findAll: (page: number) => Promise<{
    content: CadastralRecord[]
    totalPages: number
    totalElements: number
  }>
  findById: (cadastralCode: string) => Promise<CadastralRecord | null>
  findByCitizenId: (citizenId: number) => Promise<CadastralRecord[]>
}
