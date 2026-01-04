import React, { useState } from 'react'
import { Lightbulb, Copy, CheckCircle, AlertCircle, TrendingUp, BookOpen, Target, Award, RefreshCw } from 'lucide-react'

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState({
    bulletImprovements: [
      {
        id: 1,
        original: "Managed team projects",
        improved: "Led cross-functional team of 5 developers to deliver 3 major projects 2 weeks ahead of schedule, improving team productivity by 25%",
        reason: "Added quantifiable impact and leadership specificity"
      },
      {
        id: 2,
        original: "Wrote code for application",
        improved: "Developed and deployed full-stack web application using React and Node.js, serving 10,000+ users with 99.9% uptime",
        reason: "Added technology stack and scale metrics"
      }
    ],
    skillAdditions: [
      {
        skill: "Docker & Kubernetes",
        level: "High Priority",
        description: "Containerization and orchestration skills are in high demand for senior roles",
        resources: ["Docker Official Docs", "Kubernetes Tutorial on Udemy", "Hands-on labs"]
      },
      {
        skill: "AWS Cloud Services",
        level: "Medium Priority",
        description: "Cloud platform knowledge is essential for modern development roles",
        resources: ["AWS Free Tier", "Cloud Practitioner Certification", "Project-based learning"]
      },
      {
        skill: "GraphQL",
        level: "Low Priority",
        description: "Modern API technology that complements REST knowledge",
        resources: ["GraphQL Official Docs", "Apollo GraphQL Tutorial", "Build a GraphQL API"]
      }
    ],
    projectSuggestions: [
      {
        title: "AI-Powered Task Manager",
        description: "Build a smart task management application using machine learning for priority prediction",
        skills: ["Python", "TensorFlow", "React", "Node.js"],
        impact: "Demonstrates AI/ML integration with full-stack development"
      },
      {
        title: "Real-Time Analytics Dashboard",
        description: "Create a live data visualization dashboard with WebSocket connections",
        skills: ["React", "D3.js", "WebSocket", "PostgreSQL"],
        impact: "Shows real-time data processing and visualization skills"
      },
      {
        title: "Microservices E-Commerce Platform",
        description: "Design and implement a scalable e-commerce backend with microservices architecture",
        skills: ["Node.js", "Docker", "Redis", "MongoDB", "API Gateway"],
        impact: "Demonstrates enterprise-level architecture patterns"
      }
    ],
    summaryRewrite: {
      current: "Experienced software developer with strong technical skills and team leadership experience.",
      improved: "Results-driven Full Stack Developer with 5+ years of experience leading cross-functional teams to deliver scalable web applications. Proven track record of optimizing system performance by 40% and reducing operational costs by 25% through innovative cloud solutions. Passionate about mentoring junior developers and implementing best practices in code quality and system architecture.",
      keyPoints: [
        "Quantifiable achievements (40% performance improvement, 25% cost reduction)",
        "Leadership and mentoring experience",
        "Cloud optimization expertise",
        "Scalability focus"
      ]
    },
    roleSpecific: {
      "Software Engineer": [
        "Highlight system design and architecture experience",
        "Add specific technologies and frameworks you've mastered",
        "Include performance optimization examples"
      ],
      "Data Scientist": [
        "Emphasize statistical analysis and modeling experience",
        "Showcase specific ML algorithms and techniques used",
        "Include data visualization and communication skills"
      ],
      "Product Manager": [
        "Focus on cross-functional collaboration and stakeholder management",
        "Highlight product lifecycle and roadmap experience",
        "Include metrics and KPI achievements"
      ]
    }
  })

  const [copiedItem, setCopiedItem] = useState(null)

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(type)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI-Powered Resume Suggestions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Actionable recommendations to make your resume stand out
        </p>
      </div>

      <div className="space-y-8">
        {/* Resume Bullet Improvements */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <RefreshCw className="h-5 w-5 mr-2" />
              Resume Bullet Improvements
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {suggestions.bulletImprovements.length} improvements
            </span>
          </div>
          
          <div className="space-y-6">
            {suggestions.bulletImprovements.map((item) => (
              <div key={item.id} className="border-l-4 border-blue-500 pl-4">
                <div className="mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Original:</span>
                  <p className="text-gray-700 dark:text-gray-300 italic">{item.original}</p>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Improved:</span>
                  <p className="text-gray-900 dark:text-white font-medium">{item.improved}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.reason}</span>
                  <button
                    onClick={() => copyToClipboard(item.improved, `bullet-${item.id}`)}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                  >
                    {copiedItem === `bullet-${item.id}` ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Additions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Skill Additions
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {suggestions.skillAdditions.length} skills to learn
            </span>
          </div>
          
          <div className="space-y-4">
            {suggestions.skillAdditions.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{skill.skill}</h4>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      skill.level === 'High Priority' ? 'bg-red-100 text-red-700' :
                      skill.level === 'Medium Priority' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{skill.description}</p>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Resources:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.resources.map((resource, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Suggestions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Project Suggestions
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {suggestions.projectSuggestions.length} portfolio projects
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.projectSuggestions.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{project.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Skills:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">{project.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Rewrite */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Professional Summary Rewrite
            </h3>
            <button
              onClick={() => copyToClipboard(suggestions.summaryRewrite.improved, 'summary')}
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
            >
              {copiedItem === 'summary' ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Summary
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Current Summary:</span>
              <p className="text-gray-700 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-700 p-3 rounded">
                {suggestions.summaryRewrite.current}
              </p>
            </div>
            
            <div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">Improved Summary:</span>
              <p className="text-gray-900 dark:text-white bg-green-50 dark:bg-green-900/20 p-3 rounded">
                {suggestions.summaryRewrite.improved}
              </p>
            </div>
            
            <div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Key Improvements:</span>
              <ul className="mt-2 space-y-1">
                {suggestions.summaryRewrite.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Role-Specific Recommendations */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Role-Specific Recommendations
            </h3>
          </div>
          
          <div className="space-y-6">
            {Object.entries(suggestions.roleSpecific).map(([role, recommendations]) => (
              <div key={role} className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{role}</h4>
                <ul className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggestions
