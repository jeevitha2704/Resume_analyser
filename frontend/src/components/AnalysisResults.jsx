import React from 'react'
import { CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react'

const AnalysisResults = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="card">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No analysis available. Please upload and analyze a resume first.
        </p>
      </div>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-warning-600'
    return 'text-danger-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success-100'
    if (score >= 60) return 'bg-warning-100'
    return 'bg-danger-100'
  }

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-success-600" />
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-warning-600" />
    return <XCircle className="h-5 w-5 text-danger-600" />
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Overall ATS Score
        </h3>
        <div className="flex items-center justify-center">
          <div className={`w-32 h-32 rounded-full ${getScoreBgColor(analysis.ats_score)} flex items-center justify-center`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(analysis.ats_score)}`}>
                {Math.round(analysis.ats_score)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {analysis.ats_score >= 80 ? 'Excellent' : 
                 analysis.ats_score >= 60 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Score Breakdown
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getScoreIcon(analysis.grammar_score)}
              <span className="ml-2 text-gray-700 dark:text-gray-300">Grammar & Clarity</span>
            </div>
            <span className={`font-semibold ${getScoreColor(analysis.grammar_score)}`}>
              {Math.round(analysis.grammar_score)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                analysis.grammar_score >= 80 ? 'bg-success-500' :
                analysis.grammar_score >= 60 ? 'bg-warning-500' : 'bg-danger-500'
              }`}
              style={{ width: `${analysis.grammar_score}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getScoreIcon(analysis.formatting_score)}
              <span className="ml-2 text-gray-700 dark:text-gray-300">Formatting</span>
            </div>
            <span className={`font-semibold ${getScoreColor(analysis.formatting_score)}`}>
              {Math.round(analysis.formatting_score)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                analysis.formatting_score >= 80 ? 'bg-success-500' :
                analysis.formatting_score >= 60 ? 'bg-warning-500' : 'bg-danger-500'
              }`}
              style={{ width: `${analysis.formatting_score}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getScoreIcon(analysis.keyword_score)}
              <span className="ml-2 text-gray-700 dark:text-gray-300">Keyword Optimization</span>
            </div>
            <span className={`font-semibold ${getScoreColor(analysis.keyword_score)}`}>
              {Math.round(analysis.keyword_score)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                analysis.keyword_score >= 80 ? 'bg-success-500' :
                analysis.keyword_score >= 60 ? 'bg-warning-500' : 'bg-danger-500'
              }`}
              style={{ width: `${analysis.keyword_score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Extracted Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.skills && analysis.skills.length > 0 ? (
            analysis.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No skills detected</p>
          )}
        </div>
      </div>

      {/* Feedback */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI Feedback
        </h3>
        <div className="space-y-3">
          {analysis.feedback?.strengths?.length > 0 && (
            <div>
              <h4 className="font-medium text-success-600 mb-2">Strengths</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {analysis.feedback?.weaknesses?.length > 0 && (
            <div>
              <h4 className="font-medium text-danger-600 mb-2">Areas for Improvement</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.feedback.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Improvement Suggestions
        </h3>
        <ul className="space-y-2">
          {analysis.suggestions?.length > 0 ? (
            analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {suggestion}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No suggestions available</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AnalysisResults
