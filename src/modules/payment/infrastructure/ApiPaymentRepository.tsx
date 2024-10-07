import { Payment, UpdateStatusPaymentParams } from '../domain/Payment'
import { PaymentRepository } from '../domain/PaymentRepository'

export function createApiPaymentRepository(): PaymentRepository {
  return {
    create,
    update,
    get,
    search,
    getByDni
  }
}

async function create(payment: Payment) {
  await fetch(`${import.meta.env.VITE_API_PAYMENT_BASE_URL}/pagos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payment)
  })
}

async function update(payment: UpdateStatusPaymentParams) {
  await fetch(`${import.meta.env.VITE_API_PAYMENT_BASE_URL}/pagos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payment)
  })
}

async function get(id: string) {
  const payment = await fetch(
    `${import.meta.env.VITE_API_PAYMENT_BASE_URL}/pagos/${id}`
  ).then((res) => res.json() as Promise<Payment>)
  return payment
}

async function search(query: string) {
  const payments = await fetch(
    `${import.meta.env.VITE_API_PAYMENT_BASE_URL}/pagos?${query}`
  ).then((res) => res.json() as Promise<Payment[]>)
  return payments
}

async function getByDni(dni: string) {
  const payment = await fetch(
    `${import.meta.env.VITE_API_PAYMENT_BASE_URL}/pagos/cedula/${dni}`
  ).then((res) => (res.status == 200 ? res.json() : null))
  return payment
}
