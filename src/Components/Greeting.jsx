import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Greeting () {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { id } = useParams()
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('boards')) || []
    const foundBoard = boards.find(b => b.id === id)
    setBoard(foundBoard)
  }, [id])

  if (!board) return <p className='p-4'>Board not found.</p>

  return (
    <div className='p-6'>
      <h1
        className={`text-2xl font-bold ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        {board.title}
      </h1>
      <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {board.description || 'No description provided.'}
      </p>
    </div>
  )
}
