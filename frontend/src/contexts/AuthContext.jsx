import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    localStorage.getItem('hasCompletedOnboarding') === 'true'
  )

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      api.get('/api/auth/me')
        .then(response => {
          setUser(response.data)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setToken(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    try {
      console.log('Logging in with:', { email, password })
      console.log('API URL:', import.meta.env.VITE_API_URL)
      const response = await api.post('/api/auth/login', { email, password })
      console.log('Login response:', response)
      const { access_token } = response.data
      setToken(access_token)
      localStorage.setItem('token', access_token)
      
      // Get user info
      const userResponse = await api.get('/api/auth/me')
      setUser(userResponse.data)
      
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      console.error('Error response:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      console.log('Registering with:', { name, email, password })
      console.log('API URL:', import.meta.env.VITE_API_URL)
      const response = await api.post('/api/auth/register', { name, email, password })
      console.log('Register response:', response)
      return { success: true }
    } catch (error) {
      console.error('Register error:', error)
      console.error('Error response:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('hasCompletedOnboarding')
    setToken(null)
    setUser(null)
    setHasCompletedOnboarding(false)
  }

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true)
    localStorage.setItem('hasCompletedOnboarding', 'true')
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    hasCompletedOnboarding,
    completeOnboarding
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
