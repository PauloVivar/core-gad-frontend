import { CashInflow } from '../../domain/CashInflow'
import { CashInflowRepository } from '../../domain/CashInflowRespository'

export function getCashInflow(cashInflowRepository: CashInflowRepository) {
  return async (cashInflowCode: number): Promise<CashInflow | null> => {
    return await cashInflowRepository.get(cashInflowCode)
  }
}
