import { CashInflow } from '../../domain/CashInflow'
import { CashInflowRepository } from '../../domain/CashInflowRespository'

export function serachCashInflows(cashInflowRepository: CashInflowRepository) {
  return async (query: string): Promise<CashInflow[]> => {
    return await cashInflowRepository.search(query)
  }
}
