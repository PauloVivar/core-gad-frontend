// import { CreditTitle } from '@/modules/credit-titles/domain/CreditTitle'
import { createSlice } from '@reduxjs/toolkit'

// const initialState: CreditTitle[] = []

export const paymentCartSlice = createSlice({
  name: 'cart',
  initialState: {
    payments: [],
    transactions: [],
    totalRows: 0
  },
  reducers: {
    loadingPayments: (state, action) => {
      state.payments = action.payload.payments
      state.totalRows = action.payload.totalCount
    },
    loadingTransactions: (state, action) => {
      state.transactions = action.payload.payments
    }
  }
})

export const { loadingPayments, loadingTransactions } = paymentCartSlice.actions
