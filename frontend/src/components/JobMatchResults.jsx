import React from 'react'
import { Target, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const JobMatchResults = ({ matchResult, jobRole }) => {
  // Use mock data if no match result provided
  const mockData = {
    match_score: 75,
    job_title: jobRole || 'Software Engineer',
    missing_skills: ['Docker', 'Kubernetes', 'AWS', 'GraphQL'],
    overlapping_skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    suggestions: [
      'Learn Docker and Kubernetes for containerization and orchestration skills',
      'Get AWS certification to demonstrate cloud platform expertise',
      'Add GraphQL to your skill set for modern API development',
      'Highlight more backend development experience',
      'Include specific metrics and achievements in your resume'
    ]
  }

  const data = matchResult || mockData

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-warning-600'
    return 'text-danger-600'
  }

  const getMatchBgColor = (score) => {
    if (score >= 80) return 'bg-success-100'
    if (score >= 60) return 'bg-warning-100'
    return 'bg-danger-100'
  }

  const getMatchIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-success-600" />
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-warning-600" />
    return <XCircle className="h-5 w-5 text-danger-600" />
  }

  const missingSkills = matchResult.missing_skills || []
  const overlappingSkills = matchResult.overlapping_skills || []
  const suggestions = matchResult.suggestions || []

  return (
    <div className="space-y-6">
      {/* Match Score */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Job Match Score
        </h3>
        <div className="flex items-center justify-center">
          <div className={`w-32 h-32 rounded-full ${getMatchBgColor(matchResult.match_score)} flex items-center justify-center`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getMatchColor(matchResult.match_score)}`}>
                {Math.round(matchResult.match_score)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {matchResult.match_score >= 80 ? 'Excellent Match' : 
                 matchResult.match_score >= 60 ? 'Good Match' : 'Poor Match'}
              </div>
            </div>
          </div>
        </div>
        
        {matchResult.job_title && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Position: <span className="font-medium">{matchResult.job_title}</span>
            </p>
          </div>
        )}
      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overlapping Skills */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-success-600" />
            Matching Skills ({overlappingSkills.length})
          </h3>
          <div className="space-y-2">
            {overlappingSkills.length > 0 ? (
              overlappingSkills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No matching skills found
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <XCircle className="h-5 w-5 mr-2 text-danger-600" />
            Missing Skills ({missingSkills.length})
          </h3>
          <div className="space-y-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-danger-500 rounded-full mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No missing skills - great match!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Improvement Suggestions
        </h3>
        <div className="space-y-3">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start">
                <span className="text-primary-600 mr-2 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {suggestion}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No suggestions available
            </p>
          )}
        </div>
      </div>

      {/* Action Items */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recommended Actions
        </h3>
        <div className="space-y-3">
          {missingSkills.length > 0 && (
            <div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
              <h4 className="font-medium text-warning-800 dark:text-warning-200 mb-2">
                Skill Development
              </h4>
              <p className="text-sm text-warning-700 dark:text-warning-300">
                Consider learning or highlighting experience with: {missingSkills.slice(0, 3).join(', ')}
                {missingSkills.length > 3 && ` and ${missingSkills.length - 3} more`}
              </p>
            </div>
          )}
          
          {matchResult.match_score < 80 && (
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-2">
                Resume Optimization
              </h4>
              <p className="text-sm text-primary-700 dark:text-primary-300">
                Tailor your resume to include more keywords from the job description to improve your match score.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobMatchResults
