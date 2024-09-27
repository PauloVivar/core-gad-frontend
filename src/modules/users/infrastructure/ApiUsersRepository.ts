import { usersApi } from '@/interceptors/users'
import { AxiosResponse } from 'axios'
import { User } from '../domain/User'

export function createApiUsersRepository() {
  return {
    get
  }
}

//url viene por defecto de usersApi
const BASE_URL = ''

interface RegisterUser extends User {
  acceptedTerms: boolean
}

//const findAll = async () => {
const findAll = async (): Promise<AxiosResponse> => {
  try {
    const response = await usersApi.get(BASE_URL)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

const findAllPages = async (page: number = 0): Promise<AxiosResponse> => {
  try {
    const response = await usersApi.get(`${BASE_URL}/page/${page}`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

//const save = async ({ username, email, password, admin }) => {
const save = async ({
  username,
  email,
  password,
  admin
}: {
  username: string
  email: string
  password: string
  admin: boolean
}): Promise<AxiosResponse> => {
  return await usersApi.post(BASE_URL, {
    username,
    email,
    password,
    admin
  })
}

const update = async ({
  id,
  username,
  email,
  admin
}: {
  id: number
  username: string
  email: string
  admin: boolean
}): Promise<AxiosResponse> => {
  return await usersApi.put(`${BASE_URL}/${id}`, {
    username,
    email,
    admin
    //password: 'nothing',  //lo realiza el backend UserRequest
  })
}

const remove = async (id: number): Promise<AxiosResponse> => {
  return await usersApi.delete(`${BASE_URL}/${id}`)
}

const register = async (userData: RegisterUser): Promise<AxiosResponse> => {
  try {
    return await usersApi.post(`${BASE_URL}/registration`, userData)
  } catch (error) {
    console.error('Error al registrar usuario:', error)
    throw error
  }
}

const get = async (id: string) => {
  const response = await usersApi.get(`/${id}`)
  return response.data
}

export { findAll, findAllPages, save, update, remove, register, get }
