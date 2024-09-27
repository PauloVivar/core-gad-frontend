import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//test
import {
  RequestEntity,
  RequestStatus,
  RequestType
} from '@/modules/requests/domain/RequestEntity'
import { Document } from '@/modules/documents/domain/Document'

interface RequestState {
  currentRequest: {
    type: RequestType | null
    cadastralCode: string | null
    documents: Document[]
  }
  requests: RequestEntity[]
}

const initialState: RequestState = {
  currentRequest: {
    type: null,
    cadastralCode: null,
    documents: []
  },
  requests: []
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequestType: (state, action: PayloadAction<RequestType>) => {
      state.currentRequest.type = action.payload
    },
    setCadastralCode: (state, action: PayloadAction<string>) => {
      state.currentRequest.cadastralCode = action.payload
    },
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.currentRequest.documents = action.payload
    },
    addRequest: (state, action: PayloadAction<RequestEntity>) => {
      state.requests.push(action.payload)
    },
    updateRequestStatus: (
      state,
      action: PayloadAction<{ id: number; status: RequestStatus }>
    ) => {
      const index = state.requests.findIndex(
        (request) => request.id === action.payload.id
      )
      if (index !== -1) {
        state.requests[index].status = action.payload.status
      }
    },
    resetCurrentRequest: (state) => {
      state.currentRequest = initialState.currentRequest
    }
  }
})

export const {
  setRequestType,
  setCadastralCode,
  setDocuments,
  addRequest,
  updateRequestStatus,
  resetCurrentRequest
} = requestSlice.actions
