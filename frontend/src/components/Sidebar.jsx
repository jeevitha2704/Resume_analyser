import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Lightbulb, 
  History,
  User,
  LogOut
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = () => {
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analysis', href: '/app/resume-analysis', icon: FileText },
    { name: 'Job Match', href: '/app/job-match', icon: Target },
    { name: 'Suggestions', href: '/app/suggestions', icon: Lightbulb },
    { name: 'History', href: '/app/history', icon: History },
  ]

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            AI Resume Analyzer
          </h1>
        </div>
        
        <div className="mt-8 flex-1 flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`
                }
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <User className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-3 w-full text-left text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
