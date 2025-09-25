import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Greeting from '../../Greeting'
import { CreateListForm } from '../../Forms/CreateListForm'
import { v4 as uuidv4 } from 'uuid'
import Lists from '../../DataLists/Lists'
import { useTheme } from '../../../context/ThemeContext'

export default function BoardById () {
  const { id } = useParams()
  const [board, setBoard] = useState(null)
  const [lists, setLists] = useState([])

  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  // Load board data on mount
  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('boards')) || []
    const foundBoard = boards.find(b => b.id === id)
    if (foundBoard) {
      setBoard(foundBoard)
      setLists(foundBoard.lists || [])
    }
  }, [id])

  // Add a new list
  const addList = title => {
    const newList = { id: uuidv4(), title, tasks: [] }
    const updatedLists = [...lists, newList]
    setLists(updatedLists)

    // Update board in localStorage
    const boards = JSON.parse(localStorage.getItem('boards')) || []
    const updatedBoards = boards.map(b =>
      b.id === id ? { ...b, lists: updatedLists } : b
    )
    localStorage.setItem('boards', JSON.stringify(updatedBoards))
  }

  if (!board) return <p className='p-4'>Board not found.</p>

  return (
    <div
      className={`p-4 ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
      }`}
    >
      <Greeting />
      <div className='flex  gap-4 mt-6'>
        <Lists
          lists={lists}
          boardId={id}
          onUpdateLists={updatedLists => setLists(updatedLists)}
        />
        <CreateListForm onAdd={addList} />
      </div>
    </div>
  )
}
