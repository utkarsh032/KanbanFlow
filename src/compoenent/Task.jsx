import React from 'react'
import { FiClock } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

export const Task = ({ title, description, priority, date }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className={`p-2 mb-2 rounded-lg shadow border  ${
        isDark
          ? 'text-gray-100 border-gray-700'
          : 'bg-white text-gray-900 border-gray-300'
      }`}
    >
      <h4 className='text-sm font-semibold'>{title}</h4>
      {description && (
        <p className='text-sm text-gray-500 mt-1'>{description}</p>
      )}

      {/* Priority */}
      {priority && (
        <span
          className={`inline-block px-2 py-0.5 mt-2 text-xs font-medium rounded-lg ${
            priority === 'high'
              ? 'bg-red-500 text-white'
              : priority === 'medium'
              ? 'bg-yellow-400 text-black'
              : 'bg-green-500 text-white'
          }`}
        >
          {priority}
        </span>
      )}

      {/* Date with clock icon */}
      {date && (
        <div className='flex items-center gap-1 mt-2 text-xs text-gray-400'>
          <FiClock />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  )
}
