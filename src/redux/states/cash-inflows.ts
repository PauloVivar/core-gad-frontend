import { CashInflow } from '@/modules/cash-inflows/domain/CashInflow'
import { createSlice } from '@reduxjs/toolkit'

const initialState: CashInflow[] = []

export const cashInflowsSlice = createSlice({
  name: 'cash-inflows',
  initialState: {
    cashInflows: [],
    cashInflowSelected: initialState,
    visibleForm: false,
    isLoading: true,
    totalRows: 0
  },
  reducers: {
    loadingCashInflows: (state, action) => {
      state.cashInflows = action.payload.cashInflows
      state.totalRows = action.payload.totalCount
      state.isLoading = false
    },
    loadingCashInflow: (state, action) => {
      state.cashInflowSelected = action.payload.cashInflow
      state.visibleForm = true
    },
    addCashInflow: (state, action) => {
      state.cashInflows.push(action.payload.cashInflow)
    }
  }
})

export const { loadingCashInflows, addCashInflow, loadingCashInflow } =
  cashInflowsSlice.actions
