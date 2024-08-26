import { CreditTitle } from '../../domain/CreditTitle'
import { CreditTitleRepository } from '../../domain/CreditTitleRepository'

export function getAllCreditTitles(creditTitleRepository: CreditTitleRepository) {
  return async function (page: string): Promise<CreditTitle[]> {
    return creditTitleRepository.getAll(page)
  }
}
