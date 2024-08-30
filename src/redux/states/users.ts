//import { createSlice } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definición de la interfaz para el formulario de usuario
interface UserForm {
  legalPerson: string | undefined;
  id: number;
  username: string;
  password: string;
  email: string;

  ci: string;
  fullName: string;
  address: string;
  phone: string;
  taxpayerCity: string;
  houseNumber: string;
  birthdate: Date | undefined;
  disabilityPercentage: number;
  maritalStatus: number;

  admin: boolean;
  acceptedTerms: boolean;
}

// Definiciónm de la interfaz para los errores
interface ErrorState {
  ci?: string;
  username?: string;
  email?: string;
  password?: string;
  general?: string;
}

// Definición de la interfaz para el estado completo
interface UserState {
  users: UserForm[];
  userSelected: UserForm;
  visibleForm: boolean;
  errors: ErrorState;
  isLoading: boolean;
  paginator: any;                   // Idealmente, deberías definir una interfaz específica para el paginador
  contribuyenteExists: boolean | undefined;
  contribuyenteInfo: any | null;    // Idealmente, deberías definir una interfaz para la información del contribuyente
}

// Inicializamción del formulario de usuario, se inicializa id=0 para seleccionar y actualizar(update).
export const initialUserForm: UserForm = {
  legalPerson: undefined,
  id: 0,
  username: '',
  password: '',
  email: '',

  ci: '',
  fullName: '',
  address: '',
  phone: '',
  taxpayerCity: '',
  houseNumber: '',
  birthdate: undefined,
  disabilityPercentage: 0,
  maritalStatus: 37,

  admin: false,
  acceptedTerms: false,
};

// Inicializamos los errores
const initialErrors: ErrorState = {
  ci: '',
  email: '',
  password: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userSelected: initialUserForm,      //selecionar row de tabla usuarios para update
    visibleForm: false,                 //ocultar formulario
    errors: initialErrors,              //guardar errores config en el backend
    isLoading: true,                    //espera hasta que carga la grilla(tabla)
    paginator: {},                      //paginacion
    contribuyenteExists: false,
    contribuyenteInfo: null,
  } as UserState,
  reducers: {
    addUser: (state, action: PayloadAction<UserForm>) => {
      state.users = [
        ...state.users,
        {
          ...action.payload
        }
      ];
      state.userSelected = initialUserForm;
      state.visibleForm = false;
      state.contribuyenteExists = undefined;
      state.contribuyenteInfo = null;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserForm>) => {
      state.users = state.users.map(user =>
        user.id === action.payload.id ? action.payload : user
      );
      state.userSelected = initialUserForm;
      state.visibleForm = false;
    },
    loadingUsers: (state, action: PayloadAction<{ content: UserForm[], [key: string]: any }>) => {
      state.users = action.payload.content;
      state.paginator = action.payload;
      state.isLoading = false;
    },
    onSelectedUserForm: (state, action: PayloadAction<UserForm>) => {
      state.userSelected = action.payload;
      state.visibleForm = true;
    },
    onOpenForm: (state) => {
      state.visibleForm = true;
    },
    onCloseForm: (state) => {
      state.visibleForm = false;
      state.userSelected = initialUserForm;
      state.contribuyenteExists = false;
      state.contribuyenteInfo = null;
    },
    loadingError: (state, action: PayloadAction<ErrorState>) => {
      state.errors = action.payload;
    },

    setContribuyenteExists: (state, action: PayloadAction<boolean>) => {
      state.contribuyenteExists = action.payload;
    },
    setContribuyenteInfo: (state, action: PayloadAction<any>) => {
      state.contribuyenteInfo = action.payload;
    },
    clearContribuyenteInfo: (state) => {
      state.contribuyenteExists = false;
      state.contribuyenteInfo = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrors: (state, action: PayloadAction<string | Partial<ErrorState>>) => {
      if (typeof action.payload === 'string') {
        state.errors = { ...initialErrors, general: action.payload };
      } else {
        state.errors = { ...state.errors, ...action.payload };
      }
    },
    clearErrors: (state) => {
      state.errors = initialErrors;
    },
  }
})

export const {
  addUser,
  removeUser,
  updateUser,
  loadingUsers,
  onSelectedUserForm,
  onOpenForm,
  onCloseForm,
  loadingError,

  setContribuyenteExists,
  setContribuyenteInfo,
  clearContribuyenteInfo,
  setLoading,
  setErrors,
  clearErrors
} = usersSlice.actions
