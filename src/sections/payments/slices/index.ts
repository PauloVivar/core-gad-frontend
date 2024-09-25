import { createPayment } from '@/modules/payment/application/createPayment'
import { getPayment } from '@/modules/payment/application/getPayment'
import { getPaymentByDni } from '@/modules/payment/application/getPaymentByDni'
import { searchPayments } from '@/modules/payment/application/searchPayments'
import { Payment } from '@/modules/payment/domain/Payment'
import { createApiPaymentRepository } from '@/modules/payment/infrastructure/ApiPaymentRepository'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const repository = createApiPaymentRepository()
//
// export const paymentCartSlice = createSlice({
//   name: 'payments',
//   initialState: {
//     payments: [],
//     transactions: [],
//     totalRows: 0
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createPaymentAsync.fulfilled, (state, action) => {
//         state.payments.push(action.payload)
//       })
//       .addCase(getPaymentAsync.fulfilled, (state, action) => {
//         state.payments = state.payments.map((payment) => {
//           if (payment.id === action.payload.id) {
//             return action.payload
//           }
//           return payment
//         })
//     })
//   },
// })
//
// export const { loadingPayments, loadingTransactions } = .actions
//
//
export const initialState: Payment[] = []

export const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentAsync.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(getPaymentAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        // state = action.payload
      })
      .addCase(getPaymentByDniAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        // state = action.payload
      })
      .addCase(searchPaymentsAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        // state = action.payload
      })
  }
})

export const createPaymentAsync = createAsyncThunk(
  'payments/create',
  async ({
    concept,
    value,
    reference,
    creditTitles
  }: {
    concept: string
    value: number
    reference: string
    creditTitles: string[]
  }) => {
    const id = (uuidv4 as () => string)()
    await createPayment(repository)({
      id,
      concept,
      value,
      reference,
      creditTitles
    })
    return await getPayment(repository)(id)
  }
)
export const getPaymentAsync = createAsyncThunk(
  'payments/get',
  async (id: string) => {
    return await getPayment(repository)(id)
  }
)
export const getPaymentByDniAsync = createAsyncThunk(
  'payments/getByDni',
  async (dni: string) => {
    return await getPaymentByDni(repository)(dni)
  }
)

export const searchPaymentsAsync = createAsyncThunk(
  'payments/search',
  async (query: string) => {
    return await searchPayments(repository)(query)
  }
)
