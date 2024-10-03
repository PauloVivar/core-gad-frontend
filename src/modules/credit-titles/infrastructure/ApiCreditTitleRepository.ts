import { CreditTitle, CreditTitlesResponse } from '../domain/CreditTitle'
import { CreditTitleRepository } from '../domain/CreditTitleRepository'

export function createApiCreditTitlesRepository(): CreditTitleRepository {
  return {
    get,
    search
  }
}

async function get(id: string) {
  const creditTitle = await fetch(
    `http://localhost:8080/api/v1.0/titulos-credito/${id}`
  ).then((response) => response.json() as Promise<CreditTitle>)

  return creditTitle
}

async function search(query: string) {
  const creditTitles = await fetch(
    `http://localhost:8080/titulos-de-credito?${query}`
  ).then((response) => response.json() as Promise<CreditTitlesResponse>)

  return creditTitles
}
