import axios, { AxiosResponse } from 'axios'

// Definir la interfaz para las credenciales de usuario
interface UserCredentials {
  username: string
  password: string
}

// Definir la interfaz para la respuesta del servidor (ajustada según respuesta de API /login)
interface LoginResponse {
  message: string
  userId: number
  token: string
  username: string
}

type AxiosLoginResponse = AxiosResponse<LoginResponse>

// const loginUser = async ({ username, password }) => {
//   try {
//     return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
//       username,
//       password,
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//viene de useAuth
//mod email

const loginUser = async ({
  username,
  password
}: UserCredentials): Promise<AxiosLoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      {
        username,
        password
      }
    )
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Se devuelve el error de Axios
      return Promise.reject(error)
    } else {
      console.error('Unexpected error:', error)
      return Promise.reject(new Error('An unexpected error occurred'))
    }
  }
  //return userLogin.username === 'admin' && userLogin.password === '12345' ? true : false;
}

export { loginUser }
