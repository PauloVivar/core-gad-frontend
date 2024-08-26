//import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
// import { resetPassword, requestPasswordReset } from '../services/resetPasswordService';
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

function useAuth() {
  //const [login, dispatch] = useReducer(loginReducer, initialLogin);
  const dispatch = useDispatch()
  const {
    user,
    isAdmin,
    isAuth,
    isLoginLoading,

    passwordResetRequested,
    passwordResetSuccess,
    passwordResetError
  } = useSelector((store) => store.auth)

  //const navigate = useNavigate();

  const handlerLogin = async ({ username, password }) => {
    try {
      dispatch(onInitLoading())
      const response = await loginUser({ username, password })
      const token = response.data.token
      const claims = JSON.parse(window.atob(token.split('.')[1])) //atob -> decodificar base64

      //3 formas de obtener el username de token:
      //1.- response.data.username  2.- claims.username  3.- claims.sub (del payload de jwt)
      const user = {
        id: claims.userId, //backend incluye userId en el token
        username: claims.sub
      }
      //const user = { username: 'admin' };
      //console.log('test: ', claims.userId);

      dispatch(onLogin({ user, isAdmin: claims.isAdmin }))

      sessionStorage.setItem(
        'login', // almacenar información de la sesión
        JSON.stringify({
          isAuth: true,
          isAdmin: claims.isAdmin,
          user
        })
      )
      sessionStorage.setItem('token', `Bearer ${token}`) // almacena el token
      return { isAuth: true, user } // test Devolvemos el objeto user con id y username
      //navigate('/users');
    } catch (error) {
      dispatch(onLogout())
      if (error.response?.status == 401) {
        Swal.fire({
          icon: 'error',
          title: 'Error Login!',
          text: 'Username o password son incorrectos!'
        })
      } else if (error.response?.status == 403) {
        Swal.fire({
          icon: 'error',
          title: 'Error Login!',
          text: 'No tiene acceso al recurso o permisos!'
        })
      } else {
        throw error
      }
      return { isAuth: false, user: null } //test
    }
  }

  const handlerLogout = () => {
    dispatch(onLogout())
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('login')
    sessionStorage.clear()
  }

  //reset password
  const handlerRequestPasswordReset = async (email) => {
    try {
      dispatch(onPasswordResetRequest())
      await requestPasswordReset(email)
      // No despachamos éxito aquí porque solo se ha solicitado el restablecimiento
      return { success: true }
    } catch (error) {
      dispatch(
        onPasswordResetFailure(
          error.response?.data?.message ||
            'Error al solicitar el restablecimiento de contraseña'
        )
      )
      throw error
    }
  }

  const handlerResetPassword = async (code, newPassword) => {
    try {
      dispatch(onPasswordResetRequest())
      await resetPassword(code, newPassword)
      dispatch(onPasswordResetSuccess())
      return { success: true }
    } catch (error) {
      dispatch(
        onPasswordResetFailure(
          error.response?.data?.message || 'Error al restablecer la contraseña'
        )
      )
      throw error
    }
  }

  const clearPasswordResetStatus = () => {
    dispatch(onClearPasswordResetStatus())
  }

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
