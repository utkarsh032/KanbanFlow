import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

export const CreateListForm = ({ onAdd }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
    setShowForm(false)
  }

  const containerClass = isDark
    ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)] border-gray-700'
    : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)] border-gray-300'

  return showForm ? (
    <form
      onSubmit={handleSubmit}
      className={`border-dotted border-2 p-4 rounded-md bg-transparent text-center w-1/4 ${containerClass}`}
    >
      <input
        type='text'
        placeholder='Enter list title...'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className={`border p-2 rounded-lg w-full ${
          isDark
            ? ' text-gray-100  border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />
      <div className='flex gap-2 mt-2 '>
        <button
          type='submit'
          className='px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400'
        >
          Add List
        </button>
        <button
          type='button'
          onClick={() => setShowForm(false)}
          className={`px-3 py-1 border rounded ${
            isDark
              ? 'border-gray-600 text-gray-300'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <div
      className={`border-dotted border-2 p-4 m-4 rounded-md text-center cursor-pointer w-1/4 ${containerClass}`}
      onClick={() => setShowForm(true)}
    >
      <button className='text-sm font-medium'>+ Add Another List</button>
    </div>
  )
}
