import { TermsRepository } from '../../domain/TermsRepository'

export const recordTerm = (repository: TermsRepository) => {
  return async (userId: string, accepted: boolean): Promise<void> => {
    await repository.record(userId, accepted)
  }
}
