import { CreditTitle } from "../domain/CreditTitle"
import { CreditTitleRepository } from "../domain/CreditTitleRepository"

export function createApiCreditTitlesRepository(): CreditTitleRepository {
  return {
    get,
    getAll
  }
}

async function get(id: string) {
  const creditTitle= await fetch(`http://localhost:8080/api/v1.0/titulos-credito/${id}`).then(
    (response) => response.json() as Promise<CreditTitle>
  )

  return creditTitle
}

async function getAll(page: string) {
  const creditTitles = await fetch(`http://localhost:8080/api/v1.0/titulos-credito/page/${page}`).then(
    (response) => response.json()
  )

  return creditTitles
}
