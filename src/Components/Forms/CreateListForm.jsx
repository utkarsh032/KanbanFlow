import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { FiPlus } from 'react-icons/fi'

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
      className={`border-dashed border-2 p-4 rounded-md bg-transparent text-center w-80 ${containerClass}`}
    >
      <input
        type='text'
        placeholder='Enter list title...'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className={`border p-2 rounded-lg w-72 ${
          isDark
            ? ' text-gray-100  border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />
      <div className='flex gap-2 mt-2 '>
        <button
          type='submit'
          className='px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400 w-24'
        >
          Add List
        </button>
        <button
          type='button'
          onClick={() => setShowForm(false)}
          className={`px-3 py-1 border rounded w-20 ${
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
      className={`w-80 h-[10vh] flex items-center justify-center rounded-xl border-2 border-dashed transition ${containerClass}`}
      onClick={() => setShowForm(true)}
    >
      <button className='w-80 text-md font-semibold flex items-center gap-2  justify-center'>
        <FiPlus /> Add Another List
      </button>
    </div>
  )
}
