import { CreditTitle } from "@/modules/credit-titles/domain/CreditTitle";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState: CreditTitle[] = []

export const paymentCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCreditTitleToCart: (state, action) => {
      return action.payload
    },
    removeCreditTitleFromCart: (state, action) => {
      const filterState = current(state).filter((c: CreditTitle) => c.code !== action.payload)
      return filterState
    }
  },
})

export const { addCreditTitleToCart, removeCreditTitleFromCart } = paymentCartSlice.actions
