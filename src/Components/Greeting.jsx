import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Greeting () {
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
      <h1 className='text-2xl font-bold'>{board.title}</h1>
      <p className='mt-2 text-gray-600'>
        {board.description || 'No description provided.'}
      </p>
    </div>
  )
}
