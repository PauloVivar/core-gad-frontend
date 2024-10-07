import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  lastPaymentPending: Partial<PaymentResponse> | null
}

type Action = {
  setLastPayment: (lastPaymentPending: Partial<PaymentResponse>) => void
}

export const useLastPaymentState = create<State & Action>()(
  persist(
    (set) => ({
      lastPaymentPending: null,
      setLastPayment: (updateFields) => {
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
