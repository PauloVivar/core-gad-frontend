//import resetPasswordApi from 'resetPasswordApi';
//const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/password`;
import axios, { AxiosResponse, AxiosError } from 'axios'
import { resetPasswordApi } from '@/interceptors/reset-password/axios.interceptors'

//url viene por defecto de resetPasswordApi
const BASE_URL = ''

// Interfaces para las respuestas de la API
interface RequestResetResponse {
  message: string
  // Otros campos si la API los devuelve
}

interface ResetPasswordResponse {
  message: string
  // Otros campos si la API los devuelve
}

// Función para solicitar el restablecimiento de contraseña
const requestPasswordReset = async (
  email: string
): Promise<RequestResetResponse> => {
  try {
    const response: AxiosResponse<RequestResetResponse> =
      await resetPasswordApi.post(`${BASE_URL}/reset-request`, {
        email
      })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error(
        'Error en la solicitud de restablecimiento de contraseña:',
        axiosError.response?.data?.message || axiosError.message
      )
      throw new Error(
        axiosError.response?.data?.message ||
          'Error en la solicitud de restablecimiento de contraseña'
      )
    } else {
      console.error('Error inesperado:', error)
      throw new Error('Ocurrió un error inesperado')
    }
  }
}

// Función para restablecer la contraseña
const resetPassword = async (
  code: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  try {
    const response: AxiosResponse<ResetPasswordResponse> =
      await resetPasswordApi.post(`${BASE_URL}/reset`, {
        code,
        newPassword
      })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>
      console.error(
        'Error al restablecer la contraseña:',
        axiosError.response?.data?.message || axiosError.message
      )
      throw new Error(
        axiosError.response?.data?.message ||
          'Error al restablecer la contraseña'
      )
    } else {
      console.error('Error inesperado:', error)
      throw new Error('Ocurrió un error inesperado')
    }
  }
}

export { requestPasswordReset, resetPassword }
