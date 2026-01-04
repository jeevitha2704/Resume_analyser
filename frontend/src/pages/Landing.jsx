import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, FileText, Target, Lightbulb, ArrowRight, Upload, Play, CheckCircle, Star, Users, TrendingUp } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleGetStarted = () => {
    navigate('/register')
  }

  const handleDemo = () => {
    // Navigate to dashboard with demo resume
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">ResumeIQ</span>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Pricing</a>
              <button onClick={handleDemo} className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Demo</button>
            </div>

            {/* Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20 transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                AI That Fixes Your Resume Before Recruiters Reject It
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Upload your resume. Get ATS score, skill gaps, and job match insights in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Resume
                </button>
                <button 
                  onClick={handleDemo}
                  className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Try Demo Resume
                </button>
              </div>
              
              {/* Social Proof */}
              <div className="mt-12 flex items-center space-x-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white dark:border-gray-800"></div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">10,000+</span> professionals improved their resumes
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  {/* Resume → AI Brain → Score */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <FileText className="h-16 w-16 text-blue-600 mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Your Resume</span>
                    </div>
                    <ArrowRight className="h-8 w-8 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Brain className="h-16 w-16 text-purple-600 mb-2 animate-pulse" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">AI Analysis</span>
                    </div>
                    <ArrowRight className="h-8 w-8 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-green-600">95%</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">ATS Score</span>
                    </div>
                  </div>
                  
                  {/* Sample Charts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">Skill Match</div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <div className="text-sm text-green-600 dark:text-green-400 mb-2">Readiness</div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              AI-powered tools that give you the competitive edge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ATS Score Analyzer
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant feedback on how well your resume performs against automated screening systems used by 98% of Fortune 500 companies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Skill & Job Match Engine
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compare your resume with any job description to see exactly what skills you're missing and how to improve your match percentage.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                AI Resume Suggestions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get actionable recommendations on bullet points, skills to highlight, and professional summary rewrites tailored to your target role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Four simple steps to resume perfection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Upload Resume", desc: "Drag & drop your PDF or DOCX file", icon: Upload },
              { step: 2, title: "AI Parses Content", desc: "Our AI extracts skills, experience, and education", icon: Brain },
              { step: 3, title: "Compare with Job Role", desc: "Match against specific job descriptions", icon: Target },
              { step: 4, title: "Get Actionable Suggestions", desc: "Receive specific improvements to make", icon: Lightbulb }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">ATS Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Resumes Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">3x</div>
              <div className="text-blue-100">Interview Rate Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">AI Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of professionals who've improved their resumes with AI
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">ResumeIQ</span>
              </div>
              <p className="text-gray-400">
                AI-powered resume analysis that gets you hired.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResumeIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
