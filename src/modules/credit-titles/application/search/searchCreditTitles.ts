import { CreditTitle } from '../../domain/CreditTitle'
import { CreditTitleRepository } from '../../domain/CreditTitleRepository'

export function searchCreditTitles(
  creditTitleRepository: CreditTitleRepository
) {
  return async function (query: string): Promise<CreditTitle[]> {
    return creditTitleRepository.search(query)
  }
}
