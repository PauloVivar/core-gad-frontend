import { createContext } from 'react'
import { useLastPayment } from './hooks/use-last-payment'
import { PaymentResponse } from '@/modules/payment/domain/Payment'

export interface ContextState {
  lastPaymentPending: Partial<PaymentResponse> | null
}

export const PaymentsContext = createContext({} as ContextState)

export const PaymentsProvider = ({ children }: React.PropsWithChildren) => {
  const { lastPaymentPending } = useLastPayment()

  return (
    <PaymentsContext.Provider value={{ lastPaymentPending }}>
      {children}
    </PaymentsContext.Provider>
  )
}
