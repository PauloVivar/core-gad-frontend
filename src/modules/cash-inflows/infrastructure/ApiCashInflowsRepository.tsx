import { CashInflow } from '../domain/CashInflow'
import { CashInflowRepository } from '../domain/CashInflowRespository'

export function createApiCashInflowRepository(): CashInflowRepository {
  return {
    get,
    search,
    create
  }
}

async function get(code: number) {
  const cashInflow = await fetch(
    `http://localhost:8080/ingresos-caja/${code}`
  ).then((response) => response.json() as Promise<CashInflow>)

  return cashInflow
}

async function search(query: string) {
  const cashInflows = await fetch(
    `http://localhost:8080/ingresos-caja?${query}`
  ).then((response) => response.json())

  return cashInflows
}

async function create(cashInflow: CashInflow) {
  await fetch(`http://localhost:8080/ingresos-caja`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cashInflow)
  })
}
