import { Payment } from '@/modules/payment/domain/Payment'
import { createSlice } from '@reduxjs/toolkit'

interface State<T> {
  content: T[]
  lastPaymentPending: T
}

export const initialState: State<Payment> = {
  content: [],
  lastPaymentPending: {} as Payment
}

export const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    lastPaymentPending: (state, action) => {
      state.lastPaymentPending = action.payload
    }
  }
})

export const { lastPaymentPending } = paymentSlice.actions
