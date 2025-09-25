import React, { useState, useEffect } from 'react'
import { CreateBoardForm } from '../Forms/CreateBoardForm'
import { BoardLists } from '../DataLists/BoardLists'
import { useTheme } from '../../context/ThemeContext'

export const Board = () => {
  const [boards, setBoards] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem('boards')) || []
    setBoards(storedBoards)
  }, [])

  const saveBoards = updatedBoards => {
    setBoards(updatedBoards)
    localStorage.setItem('boards', JSON.stringify(updatedBoards))
  }

  const handleBoardCreate = data => {
    if (editIndex !== null) {
      // Edit existing board
      const updatedBoards = boards.map((b, i) =>
        i === editIndex ? { ...b, ...data } : b
      )
      saveBoards(updatedBoards)
      setEditIndex(null)
    } else {
      // Create new board
      const updatedBoards = [...boards, data]
      saveBoards(updatedBoards)
    }
    setShowForm(false)
  }

  const handleEdit = index => {
    setEditIndex(index)
    setShowForm(true)
  }

  const handleDuplicate = index => {
    const boardToDuplicate = boards[index]
    const duplicatedBoard = {
      ...boardToDuplicate,
      title: boardToDuplicate.title + ' (Copy)'
    }
    const updatedBoards = [...boards, duplicatedBoard]
    saveBoards(updatedBoards)
  }

  const handleDelete = index => {
    const updatedBoards = boards.filter((_, i) => i !== index)
    saveBoards(updatedBoards)
  }

  return (
    <div
      className={`px-6 py-6 shadow-md border-b border-gray-700 min-h-screen ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
      }`}
    >
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1
            className={`text-2xl font-semibold ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Your Boards
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Manage your projects and stay organized
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true)
            setEditIndex(null)
          }}
          className='px-4 py-2 rounded-md bg-gray-100 text-gray-900 hover:bg-gray-300 transition'
        >
          New Board
        </button>
      </div>

      {/* Show form conditionally */}
      {showForm && (
        <div className='mt-4'>
          <CreateBoardForm
            onSubmit={handleBoardCreate}
            onCancel={() => {
              setShowForm(false)
              setEditIndex(null)
            }}
            initialData={editIndex !== null ? boards[editIndex] : null}
          />
        </div>
      )}

      {/* Pass boards state and actions */}
      <BoardLists
        boards={boards}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />
    </div>
  )
}
