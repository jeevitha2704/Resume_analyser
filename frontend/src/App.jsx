import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ResumeAnalysis from './pages/ResumeAnalysis'
import JobMatch from './pages/JobMatch'
import Suggestions from './pages/Suggestions'
import History from './pages/History'
import Layout from './components/Layout'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/app" element={<Layout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="resume-analysis" element={<ResumeAnalysis />} />
                <Route path="job-match" element={<JobMatch />} />
                <Route path="suggestions" element={<Suggestions />} />
                <Route path="history" element={<History />} />
              </Route>
              {/* Redirect old routes to new ones */}
              <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
              <Route path="/resume-analysis" element={<Navigate to="/app/resume-analysis" replace />} />
              <Route path="/job-match" element={<Navigate to="/app/job-match" replace />} />
              <Route path="/suggestions" element={<Navigate to="/app/suggestions" replace />} />
              <Route path="/history" element={<Navigate to="/app/history" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
