import React, { useState } from 'react'
import JobMatchForm from '../components/JobMatchForm'
import JobMatchResults from '../components/JobMatchResults'

const JobMatch = () => {
  const [matchResult, setMatchResult] = useState(null)
  const [currentJobRole, setCurrentJobRole] = useState('')

  const handleMatchSuccess = (result) => {
    setMatchResult(result)
  }

  const handleNewMatch = () => {
    setMatchResult(null)
    setCurrentJobRole('')
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Job Matching
      </h1>
      
      {!matchResult ? (
        <JobMatchForm onMatchSuccess={handleMatchSuccess} onJobRoleChange={setCurrentJobRole} />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Match Results for {currentJobRole}
            </h2>
            <button
              onClick={handleNewMatch}
              className="btn-secondary"
            >
              New Match Analysis
            </button>
          </div>
          <JobMatchResults matchResult={matchResult} jobRole={currentJobRole} />
        </div>
      )}
    </div>
  )
}

export default JobMatch
