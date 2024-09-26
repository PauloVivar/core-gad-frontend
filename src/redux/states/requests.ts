import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RequestState {
  filter: string
  sortBy: string
}

const initialState: RequestState = {
  filter: '',
  sortBy: 'date'
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    }
  }
})

export const { setFilter, setSortBy } = requestSlice.actions
//export default requestSlice.reducer;
