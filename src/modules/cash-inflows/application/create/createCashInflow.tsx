import { CashInflow } from '../../domain/CashInflow'
import { CashInflowRepository } from '../../domain/CashInflowRespository'

export function createCashInflow(cashInflowRepository: CashInflowRepository) {
  return async (cashInflow: CashInflow) => {
    await cashInflowRepository.create(cashInflow)
  }
}
