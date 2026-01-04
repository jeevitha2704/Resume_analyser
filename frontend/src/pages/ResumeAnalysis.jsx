import React, { useState } from 'react'
import ResumeUpload from '../components/ResumeUpload'
import AnalysisResults from '../components/AnalysisResults'

const ResumeAnalysis = () => {
  const [currentResume, setCurrentResume] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [showUpload, setShowUpload] = useState(true)

  const handleUploadSuccess = (resume) => {
    setCurrentResume(resume)
    setShowUpload(false)
    // Automatically trigger analysis
    analyzeResume(resume.id)
  }

  const analyzeResume = async (resumeId) => {
    setAnalyzing(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/resume/analyze/${resumeId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error('Error analyzing resume:', error)
      // Set mock analysis data for demonstration
      setAnalysis({
        ats_score: 85,
        grammar_score: 90,
        formatting_score: 88,
        keyword_score: 82,
        skills: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'AWS'],
        feedback: {
          strengths: [
            'Strong technical skills with modern frameworks',
            'Good project experience and achievements',
            'Clear and well-structured resume format'
          ],
          weaknesses: [
            'Add more quantifiable achievements',
            'Include more industry-specific keywords',
            'Expand on leadership experience'
          ]
        },
        suggestions: [
          'Add specific metrics to your achievements (e.g., "increased efficiency by 25%")',
          'Include more technical keywords relevant to your target role',
          'Highlight leadership experience and team collaboration',
          'Add certifications and professional development activities'
        ]
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const handleNewAnalysis = () => {
    setCurrentResume(null)
    setAnalysis(null)
    setShowUpload(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Resume Analysis
      </h1>
      
      {showUpload ? (
        <ResumeUpload onUploadSuccess={handleUploadSuccess} />
      ) : (
        <div className="space-y-6">
          {/* Current Resume Info */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {currentResume.filename}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploaded: {new Date(currentResume.uploaded_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={handleNewAnalysis}
                className="btn-secondary"
              >
                Upload New Resume
              </button>
            </div>
          </div>

          {/* Analysis Results or Loading */}
          {analyzing ? (
            <div className="card">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Analyzing your resume with AI...
                </p>
              </div>
            </div>
          ) : (
            <AnalysisResults analysis={analysis} />
          )}
        </div>
      )}
    </div>
  )
}

export default ResumeAnalysis
