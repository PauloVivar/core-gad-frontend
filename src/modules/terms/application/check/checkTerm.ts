import { TermsRepository } from '../../domain/TermsRepository'

export const checkTerm = (repository: TermsRepository) => {
  return async (userId: string): Promise<boolean> => {
    const status = await repository.check(userId)
    return status
  }
}
