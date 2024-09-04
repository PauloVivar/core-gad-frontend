import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Definir interfaces para los tipos de estado
interface User {
  // Definicón de las propiedades del usuario
  id: number
  username: string
}

interface LoginState {
  user: User | undefined
  isAuth: boolean
  isAdmin: boolean
  isLoginLoading: boolean
}

interface AuthState extends LoginState {
  passwordResetRequested: boolean
  passwordResetSuccess: boolean
  passwordResetError: string | null
}

// Estado inicial: mod email
const initialLogin: LoginState = JSON.parse(
  sessionStorage.getItem('login') || 'null'
) || {
  user: undefined,
  isAuth: false,
  isAdmin: false,
  isLoginLoading: false
}

//estados para resetear clave de usuario
const initialState: AuthState = {
  ...initialLogin,
  passwordResetRequested: false,
  passwordResetSuccess: false,
  passwordResetError: null
}

export const authSlice = createSlice({
  name: 'auth',
  //initialState: initialLogin,
  initialState,
  reducers: {
    onLogin: (
      state,
      action: PayloadAction<{ isAdmin: boolean; user: User }>
    ) => {
      state.isAuth = true
      state.isAdmin = action.payload.isAdmin
      state.user = action.payload.user
      state.isLoginLoading = false
    },
    onLogout: (state) => {
      state.isAuth = false
      state.isAdmin = false
      state.user = undefined
      state.isLoginLoading = false
    },
    onInitLoading: (state) => {
      state.isLoginLoading = true
    },

    onPasswordResetRequest: (state) => {
      state.passwordResetRequested = true
      state.passwordResetSuccess = false
      state.passwordResetError = null
    },
    onPasswordResetSuccess: (state) => {
      state.passwordResetRequested = false
      state.passwordResetSuccess = true
      state.passwordResetError = null
    },
    onPasswordResetFailure: (state, action: PayloadAction<string>) => {
      state.passwordResetRequested = false
      state.passwordResetSuccess = false
      state.passwordResetError = action.payload
    },
    onClearPasswordResetStatus: (state) => {
      state.passwordResetRequested = false
      state.passwordResetSuccess = false
      state.passwordResetError = null
    }
  }
})

export const {
  onLogin,
  onLogout,
  onInitLoading,

  onPasswordResetRequest,
  onPasswordResetSuccess,
  onPasswordResetFailure,
  onClearPasswordResetStatus
} = authSlice.actions
