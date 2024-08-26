import { configureStore } from '@reduxjs/toolkit'
import { usersSlice } from './states/users'
import { authSlice } from './states/auth'
import { termsSlice } from './states/terms'
import { creditTitlesSlice } from './states/credit-tiles'
import { paymentCartSlice } from './states/payment-cart'

export default configureStore({
  reducer: {
    users: usersSlice.reducer,
    auth: authSlice.reducer,
    terms: termsSlice.reducer,
    creditTitles: creditTitlesSlice.reducer,
    paymentCart: paymentCartSlice.reducer
  }
})
