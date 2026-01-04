import React from 'react'
import { TrendingUp, Target, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

const ScoreCard = ({ title, score, icon: Icon, description, color = 'blue' }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />
    return <XCircle className="h-5 w-5 text-red-600" />
  }

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center">
          {getScoreIcon(score)}
          <span className={`ml-2 text-lg font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${
            score >= 80 ? 'bg-green-500' :
            score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ScoreCard
