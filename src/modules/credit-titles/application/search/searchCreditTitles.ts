import { CreditTitlesResponse } from '../../domain/CreditTitle'
import { CreditTitleRepository } from '../../domain/CreditTitleRepository'

export function searchCreditTitles(
  creditTitleRepository: CreditTitleRepository
) {
  return async function (query: string): Promise<CreditTitlesResponse> {
    return creditTitleRepository.search(query)
  }
}
