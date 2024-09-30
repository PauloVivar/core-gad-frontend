import { Payment, PaymentsResponse } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export function createApiPaymentRepository(): PaymentRepository {
  return {
    create,
    get,
    search,
    getByDni
  }
}

async function create(payment: Payment) {
  await fetch('http://localhost:8080/pagos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payment)
  })
}

async function get(id: string) {
  const payment = await fetch(`http://localhost:8080/pagos/${id}`).then(
    (res) => res.json() as Promise<Payment>
  )
  return payment
}

async function search(query: string) {
  const payments = await fetch(`http://localhost:8080/pagos?${query}`).then(
    (res) => res.json() as Promise<Payment[]>
  )
  return payments
}

async function getByDni(dni: string) {
  const payment = await fetch(`http://localhost:8080/pagos/cedula/${dni}`).then(
    (res) => res.json() as Promise<PaymentsResponse | null>
  )
  return payment
}
