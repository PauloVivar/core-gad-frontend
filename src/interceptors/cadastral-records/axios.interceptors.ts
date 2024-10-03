import axios from 'axios'

const documentsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_REQUESTS_URL}/api/v1/cadastral-records`
})

documentsApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export { documentsApi }
