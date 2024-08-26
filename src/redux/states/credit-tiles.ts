import { CreditTitle } from '@/modules/credit-titles/domain/CreditTitle'
import { createSlice } from '@reduxjs/toolkit'

const initialState: CreditTitle[] = []

export const creditTitlesSlice = createSlice({
  name: 'credit-titles',
  initialState: {
    creditTitles: [],
    creditTitleSelected: initialState,
    visibleForm: false,
    isLoading: true,
    paginator: {}
  },
  reducers: {
    loadingCreditTitles: (state, action) => {
      state.creditTitles = action.payload.content
      state.paginator = action.payload
      state.isLoading = false
    }
  }
})

export const { loadingCreditTitles} = creditTitlesSlice.actions
