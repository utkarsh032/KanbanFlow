import React, { useState } from 'react'
import { FiClock, FiDelete, FiEdit, FiCheck, FiX } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

export const Task = ({
  id,
  title,
  description,
  priority,
  date,
  onEdit,
  onDelete
}) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDesc, setEditDesc] = useState(description)

  const handleSave = () => {
    if (!editTitle.trim()) return
    onEdit(id, {
      title: editTitle,
      description: editDesc,
      priority,
      date
    })
    setIsEditing(false)
  }

  return (
    <div
      className={`p-2 mb-2 rounded-lg shadow border ${
        isDark
          ? 'text-gray-100 border-gray-700'
          : 'bg-white text-gray-900 border-gray-300'
      }`}
    >
      {isEditing ? (
        <div>
          <input
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className='w-full p-1 mb-2 border rounded text-sm'
          />
          <textarea
            value={editDesc}
            onChange={e => setEditDesc(e.target.value)}
            className='w-full p-1 mb-2 border rounded text-sm resize-none'
          />
          <div className='flex gap-2 justify-end'>
            <button onClick={handleSave} className='text-green-500'>
              <FiCheck />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='text-red-500'
            >
              <FiX />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='flex justify-between items-start'>
            <div>
              <h4 className='text-sm font-semibold'>{title}</h4>
              {description && (
                <p className='text-sm text-gray-500 mt-1'>{description}</p>
              )}
            </div>
            <div className='flex gap-2'>
              <button onClick={() => setIsEditing(true)}>
                <FiEdit />
              </button>
              <button onClick={() => onDelete(id)}>
                <FiDelete />
              </button>
            </div>
          </div>

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
        </>
      )}
    </div>
  )
}
