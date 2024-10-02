import { Payment } from '@/modules/payment/domain/Payment'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useLastPaymentState = create(
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
