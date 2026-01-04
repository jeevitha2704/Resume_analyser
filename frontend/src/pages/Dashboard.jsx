import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import ResumeUpload from '../components/ResumeUpload'
import ScoreCard from '../components/ScoreCard'
import SkillsChart from '../components/SkillsChart'
import FeedbackCard from '../components/FeedbackCard'
import { Target, FileText, TrendingUp, Brain, Upload, BarChart3, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)

  const handleUploadSuccess = (newResume) => {
    setResumes([...resumes, newResume])
    setShowUpload(false)
    // Mock analysis data for demonstration
    setAnalysisData({
      atsScore: 85,
      skillMatch: 78,
      formattingScore: 92,
      skills: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'AWS'],
      strengths: [
        'Strong technical skills with modern frameworks',
        'Good project experience and achievements',
        'Clear and well-structured resume format'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Include more industry-specific keywords',
        'Expand on leadership experience'
      ],
      critical: [
        'Missing certifications section',
        'Limited soft skills description'
      ]
    })
  }

  // Mock data for demonstration
  const mockAnalysis = analysisData || {
    atsScore: 75,
    skillMatch: 68,
    formattingScore: 88,
    skills: ['Python', 'JavaScript', 'React', 'SQL'],
    strengths: [
      'Good technical foundation',
      'Relevant project experience'
    ],
    improvements: [
        'Add more specific metrics',
        'Include more skills keywords'
    ],
    critical: []
  }

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here's your resume optimization dashboard
        </p>
      </div>

      {showUpload ? (
        <ResumeUpload onUploadSuccess={handleUploadSuccess} />
      ) : (
        <div className="space-y-8">
          {/* Score Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScoreCard
              title="ATS Score"
              score={mockAnalysis.atsScore}
              icon={Target}
              description="How well your resume performs with automated screening systems"
              color="blue"
            />
            <ScoreCard
              title="Skill Match"
              score={mockAnalysis.skillMatch}
              icon={Brain}
              description="Alignment of your skills with target job requirements"
              color="green"
            />
            <ScoreCard
              title="Formatting"
              score={mockAnalysis.formattingScore}
              icon={FileText}
              description="Resume structure, readability, and professional formatting"
              color="purple"
            />
          </div>

          {/* Skills Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkillsChart 
              skills={mockAnalysis.skills}
              title="Your Top Skills"
            />
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Quick Actions
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowUpload(true)}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Upload New Resume
                    </span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                
                <button 
                  onClick={() => navigate('/app/job-match')}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Analyze Job Match
                    </span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                
                <button 
                  onClick={() => navigate('/app/resume-analysis')}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      View Detailed Analysis
                    </span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Feedback Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FeedbackCard
              type="strength"
              title="Strengths"
              items={mockAnalysis.strengths}
              icon={CheckCircle}
            />
            
            <FeedbackCard
              type="improvement"
              title="Improvements"
              items={mockAnalysis.improvements}
              icon={AlertTriangle}
            />
            
            <FeedbackCard
              type="critical"
              title="Critical Gaps"
              items={mockAnalysis.critical}
              icon={XCircle}
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h3>
            
            {resumes.length > 0 ? (
              <div className="space-y-4">
                {resumes.slice(0, 3).map((resume, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {resume.filename}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(resume.uploaded_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-green-600">
                        {mockAnalysis.atsScore}% ATS
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No recent activity. Start by uploading your resume!
                </p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Resume
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
