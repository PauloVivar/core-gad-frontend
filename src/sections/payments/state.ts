import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type State = {
  lastPaymentPending: Partial<PaymentResponse> | null
}

type Action = {
  setLastPayment: (lastPaymentPending: Partial<PaymentResponse>) => void
}

export interface LastPaymentState extends State, Action {}

export const useLastPaymentState = create<LastPaymentState>()(
  persist(
    (set) => ({
      lastPaymentPending: null,
      setLastPayment: (updateFields: Partial<PaymentResponse>) => {
        set((state) => ({
          lastPaymentPending: {
            ...state.lastPaymentPending,
            ...updateFields
          }
        }))
      }
    }),
    {
      name: 'last-payment',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
