import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="lg:pl-64">
        <Navbar />
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
