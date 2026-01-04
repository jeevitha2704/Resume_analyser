import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Upload, Target, CheckCircle, ArrowRight, ArrowLeft, Briefcase, Code, BarChart3, Palette } from 'lucide-react'

const Onboarding = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const jobRoles = [
    { id: 'python-dev', name: 'Python Developer', icon: Code, description: 'Backend development, APIs, data processing' },
    { id: 'data-analyst', name: 'Data Analyst', icon: BarChart3, description: 'Data analysis, visualization, reporting' },
    { id: 'frontend-dev', name: 'Frontend Developer', icon: Palette, description: 'UI/UX, React, modern web technologies' },
    { id: 'custom', name: 'Custom Role', icon: Briefcase, description: 'Specify your own target role' }
  ]

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Complete onboarding and go to dashboard
      navigate('/app/dashboard')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile) return
    
    setIsUploading(true)
    try {
      // Here you would upload the file and start analysis
      // For now, simulate upload and redirect
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/app/resume-analysis')
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Upload Your Resume
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Get started by uploading your resume in PDF or DOCX format
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                />
                
                {resumeFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {resumeFile.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        Drop your resume here
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PDF or DOCX, maximum 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Select Your Target Role
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Choose the role you're applying for to get tailored recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {jobRoles.map((role) => (
                <div
                  key={role.id}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <role.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {role.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedRole === 'custom' && (
              <div className="mt-6 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Enter your target role..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Analyze
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We're ready to analyze your resume and provide personalized insights
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  What you'll get:
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      ATS compatibility score (0-100)
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Skill gap analysis
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Actionable improvement suggestions
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Job matching capabilities
                    </span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isUploading}
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto mb-2"></div>
                    Analyzing your resume...
                  </>
                ) : (
                  'Analyze My Resume'
                )}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step > stepNum ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepNum
                  )}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-full h-1 mx-4 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Upload Resume</span>
            <span>Select Role</span>
            <span>Analyze</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={step === 1 ? () => navigate('/') : handleBack}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {step === 1 ? 'Back to Home' : 'Previous'}
          </button>

          {step < 3 && (
            <button
              onClick={handleNext}
              disabled={(step === 1 && !resumeFile) || (step === 2 && !selectedRole)}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding
