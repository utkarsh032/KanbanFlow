import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export const CreateBoardForm = ({ onSubmit, onCancel, initialData }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      description: formData.get('description')
    }
    onSubmit?.(data)
  }

  return (
    <div
      className={`border p-6 rounded-lg shadow-md ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)] border-gray-700'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)] border-gray-300'
      }`}
    >
      <div className='mb-4'>
        <h3
          className={`text-xl font-semibold ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          {initialData ? 'Edit Board' : 'Create New Board'}
        </h3>
        <p
          className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}
        >
          {initialData
            ? 'Update your board details'
            : 'Set up a new project board to organize your tasks'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='title'
          placeholder='Board Title'
          defaultValue={initialData?.title || ''}
          required
          className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-gray-500 ${
            isDark
              ? ' text-gray-200 border-gray-600'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
        <input
          type='text'
          name='description'
          placeholder='Description (Optional)'
          defaultValue={initialData?.description || ''}
          className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-gray-500 ${
            isDark
              ? ' text-gray-200 border-gray-600'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />

        <div className='flex gap-3 justify-end'>
          <button
            type='button'
            onClick={onCancel}
            className={`px-4 py-2 rounded-md border transition ${
              isDark
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-300 transition'
          >
            {initialData ? 'Update Board' : 'Create Board'}
          </button>
        </div>
      </form>
    </div>
  )
}
