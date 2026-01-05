import axios from 'axios'

// Get API URL from environment or use fallback
const API_URL = import.meta.env.VITE_API_URL || 'https://resumeanalyserbackend-production-2e0c.up.railway.app'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
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
