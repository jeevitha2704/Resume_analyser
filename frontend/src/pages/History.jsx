import React, { useState, useEffect } from 'react'
import { FileText, Calendar, Eye, Download, TrendingUp, CheckCircle, AlertCircle, XCircle, Filter, Target } from 'lucide-react'

const History = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/resume/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const resumes = await response.json()
        
        // Mock history data with analyses and job matches
        const mockHistory = resumes.map((resume, index) => ({
          id: resume.id,
          date: resume.uploaded_at,
          resumeName: resume.filename,
          atsScore: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
          jobMatchScore: Math.floor(Math.random() * 40) + 40, // Random score between 40-80
          status: index === 0 ? 'completed' : index === 1 ? 'in-progress' : 'pending',
          type: resume.file_type.toUpperCase()
        }))
        
        setHistory(mockHistory.sort((a, b) => new Date(b.date) - new Date(a.date)))
      }
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600'
      case 'in-progress': return 'text-yellow-600'
      case 'pending': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in-progress': return <AlertCircle className="h-4 w-4" />
      case 'pending': return <XCircle className="h-4 w-4" />
      default: return <XCircle className="h-4 w-4" />
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredHistory = history.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter
    const matchesSearch = item.resumeName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const exportData = () => {
    const csvContent = [
      ['Date', 'Resume Name', 'Type', 'ATS Score', 'Job Match Score', 'Status'],
      ...filteredHistory.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.resumeName,
        item.type,
        item.atsScore,
        item.jobMatchScore,
        item.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume-history-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mr-3"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading history...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Resume History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track all your resume analyses and job matches
        </p>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by resume name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportData}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{filteredHistory.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Analyses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredHistory.filter(item => item.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredHistory.filter(item => item.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {filteredHistory.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="card overflow-hidden">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No history found
            </p>
            <p className="text-sm text-gray-400">
              Upload and analyze your first resume to see history here
            </p>
            <button
              onClick={() => window.location.href = '/app/resume-analysis'}
              className="btn-primary"
            >
              Upload Resume
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Resume Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ATS Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Job Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.resumeName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        <span className={`text-sm font-bold ${getScoreColor(item.atsScore)}`}>
                          {item.atsScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        <span className={`text-sm font-bold ${getScoreColor(item.jobMatchScore)}`}>
                          {item.jobMatchScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`flex items-center ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span className="ml-2 text-sm font-medium capitalize">
                            {item.status.replace('-', ' ')}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-700 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Analyze
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default History
