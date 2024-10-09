import { Term } from '@/modules/terms/domain/Term'
import { createSlice } from '@reduxjs/toolkit'

export type TermSelected = Pick<
  Term,
  'id' | 'version' | 'content' | 'effectiveDate'
> &
  Partial<Term>

export const initialTermForm: TermSelected = {
  id: '0',
  version: '',
  content: '',
  effectiveDate: ''
}

const initialErrors = {
  version: '',
  content: '',
  effectiveDate: ''
}

export interface TermsState {
  terms: Term[]
  termSelected: TermSelected
  visibleForm: boolean
  errors: typeof initialErrors

  latestTerm: Term | null
  latestTermError: string | null

  userTermsStatus: string | null
  recordingTermsInteraction: boolean
  recordingTermsInteractionError: string | null
}

export const initialState: TermsState = {
  terms: [],
  termSelected: initialTermForm,
  visibleForm: false,
  errors: initialErrors,

  latestTerm: null, //último término
  latestTermError: null,

  userTermsStatus: null, //status del término
  recordingTermsInteraction: false, //grabar estado de la interacción
  recordingTermsInteractionError: null
}

export const termsSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    addTerm: (state, action) => {
      // state.terms = [
      //   ...state.terms,
      //   {
      //     ...action.payload,
      //   }
      // ];
      const newTerm = action.payload
      state.terms.unshift(newTerm)
      state.latestTerm = newTerm //actualizar latestTerm

      state.termSelected = initialTermForm
      state.visibleForm = false
    },
    removeTerm: (state, action) => {
      state.terms = state.terms.filter((term) => term.id !== action.payload)
    },
    updateTerm: (state, action) => {
      // state.terms = state.terms.map(term => {
      //   if (term.id === action.payload.id) {
      //     return {
      //       ...action.payload,
      //     };
      //   }
      //   return term;
      // });
      const updatedTerm = action.payload
      state.terms = state.terms.map((term) =>
        term.id === updatedTerm.id ? updatedTerm : term
      )
      if (state.latestTerm && state.latestTerm.id === updatedTerm.id) {
        state.latestTerm = updatedTerm //actualizar latestTerm si es necesario
      }

      state.termSelected = initialTermForm
      state.visibleForm = false
    },
    loadingTerms: (state, action) => {
      state.terms = action.payload
    },
    onSelectedTermForm: (state, action) => {
      state.termSelected = action.payload
      state.visibleForm = true
    },
    onOpenForm: (state) => {
      state.visibleForm = true
    },
    onCloseForm: (state) => {
      state.visibleForm = false
      state.termSelected = initialTermForm
    },

    //últimos terms
    fetchLatestTermStart(state) {
      state.latestTermError = null
    },
    fetchLatestTermSuccess(state, action) {
      const newLatestTerm = action.payload
      state.latestTerm = newLatestTerm
      // Sincronizar con el array de términos
      const existingTermIndex = state.terms.findIndex(
        (term) => term.id === newLatestTerm.id
      )
      if (existingTermIndex !== -1) {
        // Actualizar el término existente
        state.terms[existingTermIndex] = newLatestTerm
      } else {
        // Agregar el nuevo término al principio del array
        state.terms.unshift(newLatestTerm)
      }
      //old
      //state.latestTerm = action.payload;
    },
    fetchLatestTermError(state, action) {
      state.latestTermError = action.payload
    },

    //verificar el estado de los términos del usuario
    setUserTermsStatus(state, action) {
      state.userTermsStatus = action.payload
    },

    //interacciones user y terms
    recordTermsInteractionStart: (state) => {
      state.recordingTermsInteraction = true
      state.recordingTermsInteractionError = null
    },
    recordTermsInteractionSuccess: (state, action) => {
      state.recordingTermsInteraction = false
      state.userTermsStatus = action.payload
    },
    recordTermsInteractionError: (state, action) => {
      state.recordingTermsInteraction = false
      state.recordingTermsInteractionError = action.payload
    },

    //error de terms
    loadingError: (state, action) => {
      state.errors = action.payload
    }
  }
})

export const {
  addTerm,
  removeTerm,
  updateTerm,
  loadingTerms,
  onSelectedTermForm,
  onOpenForm,
  onCloseForm,

  fetchLatestTermStart,
  fetchLatestTermSuccess,
  fetchLatestTermError,

  setUserTermsStatus,
  recordTermsInteractionStart,
  recordTermsInteractionSuccess,
  recordTermsInteractionError,

  loadingError
} = termsSlice.actions
