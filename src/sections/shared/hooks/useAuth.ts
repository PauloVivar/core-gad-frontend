import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../modules/auth/infrastructure/ApiAuthRepository';
import { resetPassword, requestPasswordReset } from '../../../modules/auth/infrastructure/ApiResetPasswordRepository';
import {
  onLogin,
  onLogout,
  onInitLoading,

  onPasswordResetRequest,
  onPasswordResetSuccess,
  onPasswordResetFailure,
  onClearPasswordResetStatus
} from '@/redux/states/auth'
import Swal from 'sweetalert2'
import { AppDispatch, RootState } from '@/redux/store';

// Interfaces
interface User {
  id: number;
  username: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  user: User | undefined;
  isAdmin: boolean;
  isAuth: boolean;
  isLoginLoading: boolean;

  passwordResetRequested: boolean;
  passwordResetSuccess: boolean;
  passwordResetError: string | null;
}

function useAuth() {
  //const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((store: RootState) => store.auth as AuthState);
  const {
    user,
    isAdmin,
    isAuth,
    isLoginLoading,

    passwordResetRequested,
    passwordResetSuccess,
    passwordResetError
  } = auth;

  //const navigate = useNavigate();

  //const handlerLogin = async ({ username, password }) => {
  const handlerLogin = async ({ username, password }: LoginCredentials): Promise<{ isAuth: boolean; user: User | undefined }> => {
    try {
      dispatch(onInitLoading())
      //console.log('Iniciando login para:', username);
      const response = await loginUser({ username, password })
      //console.log('Respuesta del servidor:', response);
      const token = response.data.token
      //console.log('Token recibido:', token);
      const claims = JSON.parse(window.atob(token.split('.')[1])) //atob -> decodificar base64
      //console.log('Claims decodificados:', claims);

      //3 formas de obtener el username de token:
      //1.- response.data.username  2.- claims.username  3.- claims.sub (del payload de jwt)
      const user = {
        id: claims.userId,                                  //backend incluye userId en el token
        username: claims.sub
      }
      //const user = { username: 'admin' };
      //console.log('Usuario creado:', user);

      dispatch(onLogin({ user, isAdmin: claims.isAdmin }))

      sessionStorage.setItem(
        'login',                                            // almacenar información de la sesión
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user
        })
      )
      sessionStorage.setItem('token', `Bearer ${token}`)    // almacena el token
      return { isAuth: true, user }                         // devuelve el objeto user con id y username
      //navigate('/users');
    } catch (error: any) {
      dispatch(onLogout())
      console.error('Error completo:', error);
      if (error.response?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error Login!',
          text: 'Username o password son incorrectos!'
        })
      } else if (error.response?.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Error Login!',
          text: 'No tiene acceso al recurso o permisos!'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error Inesperado',
          text: 'Ha ocurrido un error inesperado. Por favor, intente de nuevo.'
        });
        throw error
      }
      return { isAuth: false, user: undefined }
    }
  }

  const handlerLogout = () => {
    dispatch(onLogout())
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('login')
    sessionStorage.clear()
  }

  //reset password
  //const handlerRequestPasswordReset = async (email) => {
  const handlerRequestPasswordReset = async (email: string): Promise<{ success: boolean }> => {
    try {
      dispatch(onPasswordResetRequest())
      await requestPasswordReset(email)
      // No despachamos éxito aquí porque solo se ha solicitado el restablecimiento
      return { success: true }
    } catch (error: any) {
      dispatch(
        onPasswordResetFailure(
          error.response?.data?.message ||
            'Error al solicitar el restablecimiento de contraseña'
        )
      )
      throw error
    }
  }

  //const handlerResetPassword = async (code, newPassword) => {
  const handlerResetPassword = async (code: string, newPassword: string): Promise<{ success: boolean }> => {
    try {
      dispatch(onPasswordResetRequest())
      await resetPassword(code, newPassword)
      dispatch(onPasswordResetSuccess())
      return { success: true }
    } catch (error: any) {
      dispatch(
        onPasswordResetFailure(
          error.response?.data?.message || 'Error al restablecer la contraseña'
        )
      )
      throw error
    }
  }

  //const clearPasswordResetStatus = () => {
  const clearPasswordResetStatus = (): void => {
    dispatch(onClearPasswordResetStatus());
  };

  return {
    login: {
      user,
      isAdmin,
      isAuth,
      isLoginLoading
    },
    handlerLogin,
    handlerLogout,

    passwordReset: {
      passwordResetRequested,
      passwordResetSuccess,
      passwordResetError
    },
    handlerRequestPasswordReset,
    handlerResetPassword,
    clearPasswordResetStatus
  }
}

export { useAuth }
