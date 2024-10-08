import { termsApi } from '@/interceptors/terms'
import { TermsRepository } from '../domain/TermsRepository'
import { Term } from '../domain/Term'

//url viene por defecto de termsApi
export function createApiTermsRespository(): TermsRepository {
  return {
    get,
    findLatestTerm,
    check,
    record
  }
}

const get = async () => {
  const response = await termsApi
    .get('')
    .then((response) => response.data as Promise<Term[]>)
  return response
}
// Función para obtener los últimos términos con caché
const findLatestTerm = async () => {
  try {
    const response = await termsApi
      .get(`/latest`)
      .then((res) => res.data as Promise<Term>)
    return response
  } catch (error) {
    console.error('Error service al obtener el último término:', error)
    throw error
  }
}

// Función para verificar el estado de los términos con caché
const check = async (userId: string) => {
  try {
    const response = await termsApi
      .get(`/status/${userId}`)
      .then((response) => response.data as Promise<boolean>)
    return response
  } catch (error) {
    console.error(
      'Error service al comprobar el estado de los términos de usuario:',
      error
    )
    throw error
  }
}

// Función para registrar la interacción de términos (sin caché)
const record = async (userId: string, accepted: boolean) => {
  await termsApi.post(`/record`, {
    userId,
    accepted
  })

  // Actualizar el caché después de una interacción exitosa
  setCacheItem(`userTermsStatus_${userId}`, accepted, 300000)
}

// Función para guardar en caché findLatestTerm y checkUserTermsStatus
const setCacheItem = (key: string, value: boolean, ttl: number) => {
  const item = {
    value: value,
    expiry: new Date().getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

// Función para obtener de caché findLatestTerm y checkUserTermsStatus
const getCacheItem = (key: string) => {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null

  const item = JSON.parse(itemStr)
  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}
