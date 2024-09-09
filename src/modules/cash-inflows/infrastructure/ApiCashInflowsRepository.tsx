import { CashInflow } from '../domain/CashInflow'

export function CreateCashInflowsRepository() {
  return {
    get,
    search
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
