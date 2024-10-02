import { useContext } from 'react'
import { PaymentsContext } from '../payments-context'

export const usePaymentsContext = () => {
  const payments = useContext(PaymentsContext)
  return payments
}
