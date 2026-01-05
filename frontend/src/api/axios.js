import axios from 'axios'

// Force use of proxy - ignore environment variable
const API_URL = ''  // Always use proxy (same origin)

// Create axios instance with CORS workaround
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
  mode: 'cors',
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('hasCompletedOnboarding')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
