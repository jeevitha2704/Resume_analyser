import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

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
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Verify token and get user info
      axios.get('/api/auth/me')
        .then(response => {
          setUser(response.data)
        })
        .catch(() => {
          localStorage.removeItem('token')
          setToken(null)
          delete axios.defaults.headers.common['Authorization']
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
      const response = await axios.post('/api/auth/login', { email, password })
      const { access_token } = response.data
      setToken(access_token)
      localStorage.setItem('token', access_token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      
      // Get user info
      const userResponse = await axios.get('/api/auth/me')
      setUser(userResponse.data)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      await axios.post('/api/auth/register', { name, email, password })
      return { success: true }
    } catch (error) {
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
    delete axios.defaults.headers.common['Authorization']
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
