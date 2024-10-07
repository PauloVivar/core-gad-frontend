import { Payment } from '@/modules/payment/domain/Payment'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  lastPaymentPending: Payment | null
}

type Action = {
  setLastPayment: (lastPaymentPending: Payment) => void
}

export const useLastPaymentState = create<State & Action>()(
  persist(
    (set) => ({
      lastPaymentPending: null,
      setLastPayment: (lastPaymentPending: Payment) =>
        set({ lastPaymentPending })
    }),
    {
      name: 'last-payment',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
