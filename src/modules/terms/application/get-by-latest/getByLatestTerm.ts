import { Term } from '../../domain/Term'
import { TermsRepository } from '../../domain/TermsRepository'

export const getByLatestTerm = (respository: TermsRepository) => {
  return async (): Promise<Term> => {
    const term = await respository.findLatestTerm()
    return term
  }
}
