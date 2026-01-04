import React, { useState } from 'react'
import { Upload, FileText, AlertCircle } from 'lucide-react'

const ResumeUpload = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file) => {
    setError('')
    setUploading(true)

    // Validate file type
    if (!file.type.includes('pdf') && !file.type.includes('wordprocessingml.document')) {
      setError('Please upload a PDF or DOCX file')
      setUploading(false)
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      setUploading(false)
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Upload failed')
      }

      const result = await response.json()
      onUploadSuccess(result)
    } catch (err) {
      setError(err.message || 'Failed to upload resume. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center">
        <FileText className="mx-auto h-12 w-12 text-primary-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Upload Your Resume
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Upload your resume in PDF or DOCX format for AI-powered analysis
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleChange}
          disabled={uploading}
        />
        
        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
        
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-sm text-gray-600 dark:text-gray-400"
        >
          <span className="font-medium text-primary-600 hover:text-primary-500">
            Click to upload
          </span>
          {' '}or drag and drop
        </label>
        
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          PDF or DOCX (max 5MB)
        </p>
      </div>

      {error && (
        <div className="mt-4 flex items-center text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      {uploading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
            Uploading and analyzing...
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeUpload
