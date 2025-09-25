import React, { useState } from 'react'
import { FiFolder, FiCalendar } from 'react-icons/fi'
import { PiDotsThreeOutlineFill } from 'react-icons/pi'

import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom'

export const BoardCard = ({
  id,
  title,
  description,
  lists,
  tasks,
  onEdit,
  onDuplicate,
  onDelete
}) => {
  const [openMenu, setOpenMenu] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Link
      to={`/dashboard/BoardById/${id}`}
      className={`flex flex-col border rounded-lg shadow-sm p-4   ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)] border-gray-700'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)] border-gray-300'
      }`}
    >
      {/* Header */}
      <div className='flex justify-between items-start mb-2'>
        <div>
          <h2
            className={`text-lg font-semibold line-clamp-1 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`text-sm line-clamp-2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Menu button */}
        <div className='relative'>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={`p-2 rounded-full transition ${
              isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            }`}
          >
            <PiDotsThreeOutlineFill />
          </button>

          {openMenu && (
            <div
              className={`absolute right-0 mt-2 w-40 rounded-lg shadow-md text-sm ${
                isDark ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
              }`}
            >
              <button
                onClick={() => {
                  onEdit?.()
                  setOpenMenu(false)
                }}
                className='block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                Edit Board
              </button>
              <button
                onClick={() => {
                  onDuplicate?.()
                  setOpenMenu(false)
                }}
                className='block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                Duplicate
              </button>
              <hr className='border-gray-200 dark:border-gray-700' />
              <button
                onClick={() => {
                  onDelete?.()
                  setOpenMenu(false)
                }}
                className='block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900'
              >
                Delete Board
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex gap-6 mt-6 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        <div className='flex items-center gap-2'>
          <FiFolder /> <span>{lists} Lists</span>
        </div>
        <div className='flex items-center gap-2'>
          <FiCalendar /> <span>{tasks} Tasks</span>
        </div>
      </div>
    </Link>
  )
}
