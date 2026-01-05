import api from './axios'

export const testAPI = async () => {
  try {
    console.log('Testing API connection...')
    console.log('API URL:', import.meta.env.VITE_API_URL)
    
    const response = await api.get('/api/auth/me')
    console.log('API Response:', response)
    return { success: true, data: response.data }
  } catch (error) {
    console.error('API Error:', error)
    console.error('Error Response:', error.response)
    return { 
      success: false, 
      error: error.message,
      status: error.response?.status,
      data: error.response?.data 
    }
  }
}
