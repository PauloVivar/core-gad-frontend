import { Term } from '../../domain/Term'
import { TermsRepository } from '../../domain/TermsRepository'

export const getTerms = (repository: TermsRepository) => {
  return async (): Promise<Term[]> => {
    const terms = await repository.get()
    return terms
  }
}
