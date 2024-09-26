import axios from 'axios'

const requestsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/requests`
})

requestsApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

export { requestsApi }
