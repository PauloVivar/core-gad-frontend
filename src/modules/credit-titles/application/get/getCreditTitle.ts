import { CreditTitle } from '../../domain/CreditTitle'
import { CreditTitleRepository } from '../../domain/CreditTitleRepository'

export function getCreditTitle(creditTitleRepository: CreditTitleRepository) {
  return async function (creditTitleId: string): Promise<CreditTitle | null> {
    return creditTitleRepository.get(creditTitleId)
  }
}
