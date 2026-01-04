import React from 'react'
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react'

const FeedbackCard = ({ type, title, items, icon: Icon }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'strength':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          icon: 'text-green-600',
          title: 'text-green-800 dark:text-green-200',
          text: 'text-green-700 dark:text-green-300'
        }
      case 'improvement':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          icon: 'text-yellow-600',
          title: 'text-yellow-800 dark:text-yellow-200',
          text: 'text-yellow-700 dark:text-yellow-300'
        }
      case 'critical':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          icon: 'text-red-600',
          title: 'text-red-800 dark:text-red-200',
          text: 'text-red-700 dark:text-red-300'
        }
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          border: 'border-gray-200 dark:border-gray-800',
          icon: 'text-gray-600',
          title: 'text-gray-800 dark:text-gray-200',
          text: 'text-gray-700 dark:text-gray-300'
        }
    }
  }

  const styles = getTypeStyles()
  const DefaultIcon = type === 'strength' ? CheckCircle : type === 'improvement' ? AlertTriangle : XCircle

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-xl p-6`}>
      <div className="flex items-center mb-4">
        <div className={`${styles.icon} mr-3`}>
          {Icon ? <Icon className="h-6 w-6" /> : <DefaultIcon className="h-6 w-6" />}
        </div>
        <h3 className={`text-lg font-semibold ${styles.title}`}>
          {title}
        </h3>
      </div>
      
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className={`w-2 h-2 rounded-full ${styles.icon} mt-2 mr-3 flex-shrink-0`}></div>
            <span className={`${styles.text} text-sm leading-relaxed`}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className={`${styles.text} text-sm italic`}>
          No {type} items to display.
        </p>
      )}
    </div>
  )
}

export default FeedbackCard
