import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { FiPlus } from 'react-icons/fi'

export const CreateTaskForm = ({ boardId, listId, onAddTask }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [showForm, setShowForm] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!taskTitle.trim()) return

    const newTask = {
      id: Date.now().toString(), // or uuid
      title: taskTitle,
      description,
      priority,
      date: dueDate || new Date().toISOString().split('T')[0]
    }

    onAddTask(boardId, listId, newTask)

    // reset form
    setTaskTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setShowForm(false)
  }

  const containerClass = isDark
    ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)] border-gray-700'
    : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)] border-gray-300'

  return showForm ? (
    <form
      onSubmit={handleSubmit}
      className={`m-2 p-2 border bg-transparent rounded-md shadow-md  ${containerClass}`}
    >
      <input
        type='text'
        placeholder='Enter task title...'
        value={taskTitle}
        onChange={e => setTaskTitle(e.target.value)}
        className={`border p-1 mb-2 rounded-lg w-full ${
          isDark
            ? 'text-gray-100 border-gray-700 '
            : 'bg-white text-gray-900 border-gray-300'
        }`}
        required
      />

      <textarea
        placeholder='Task description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        className={`border p-1 mb-1 rounded-lg w-full  resize-none ${
          isDark
            ? 'text-gray-100 border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
      />

      <div className='flex gap-2 mb-2'>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className={`border p-2 rounded-lg flex-1 ${
            isDark
              ? 'text-gray-100 border-gray-700 '
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        >
          <option className='bg-black' value='low'>
            Low
          </option>
          <option className='bg-black' value='medium'>
            Medium
          </option>
          <option className='bg-black' value='high'>
            High
          </option>
        </select>

        <input
          type='date'
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className={`border p-2 rounded-lg flex-1 ${
            isDark
              ? 'text-gray-100 border-gray-700'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
      </div>

      <div className='flex gap-2 justify-end'>
        <button
          type='button'
          onClick={() => setShowForm(false)}
          className={`px-3 py-1 border rounded ${
            isDark
              ? 'border-gray-600 text-gray-300 hover:bg-gray-900'
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600'
        >
          Add Task
        </button>
      </div>
    </form>
  ) : (
    <div
      className={`p-2 cursor-pointer m-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${containerClass}`}
      onClick={() => setShowForm(true)}
    >
      <button className='flex items-center gap-2 text-sm'>
        <FiPlus />
        Add a Task
      </button>
    </div>
  )
}
