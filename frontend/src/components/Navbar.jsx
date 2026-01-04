import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          {/* Mobile menu button would go here */}
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {darkMode ? (
              <span className="text-xl">☀️</span>
            ) : (
              <span className="text-xl">🌙</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
