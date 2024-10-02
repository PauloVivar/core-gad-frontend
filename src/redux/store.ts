import { configureStore } from '@reduxjs/toolkit'
import { usersSlice } from './states/users'
import { authSlice } from './states/auth'
import { termsSlice } from './states/terms'
import { creditTitlesSlice } from './states/credit-titles'
import { paymentCartSlice } from './states/payment-cart'
import { cashInflowsSlice } from './states/cash-inflows'
import { paymentSlice } from '@/sections/payments/slices'

//export default configureStore({
const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    auth: authSlice.reducer,
    terms: termsSlice.reducer,
    creditTitles: creditTitlesSlice.reducer,
    cashInflows: cashInflowsSlice.reducer,
    paymentCart: paymentCartSlice.reducer,
    payments: paymentSlice.reducer
  }
})

// Inferir los tipos `RootState` y `AppDispatch` desde la propia store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
