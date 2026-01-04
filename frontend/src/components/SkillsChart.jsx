import React from 'react'
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react'

const SkillsChart = ({ skills, title = "Skill Analysis" }) => {
  const getSkillLevel = (skill) => {
    // Mock skill levels - in real app this would come from analysis
    const levels = {
      'Python': 85,
      'JavaScript': 75,
      'React': 70,
      'Node.js': 65,
      'SQL': 80,
      'AWS': 60,
      'Docker': 55,
      'Machine Learning': 45
    }
    return levels[skill] || Math.floor(Math.random() * 40) + 60
  }

  const getSkillColor = (level) => {
    if (level >= 80) return 'bg-green-500'
    if (level >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getSkillTextColor = (level) => {
    if (level >= 80) return 'text-green-600'
    if (level >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          {title}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {skills.length} skills analyzed
        </span>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => {
          const level = getSkillLevel(skill)
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {skill}
                </span>
                <span className={`text-sm font-bold ${getSkillTextColor(level)}`}>
                  {level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(level)}`}
                  style={{ width: `${level}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No skills data available. Upload a resume to see your skill analysis.
          </p>
        </div>
      )}
    </div>
  )
}

export default SkillsChart
