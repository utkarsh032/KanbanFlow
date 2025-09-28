import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Greeting from '../../Greeting'
import { CreateListForm } from '../../Forms/CreateListForm'
import { v4 as uuidv4 } from 'uuid'
import Lists from '../../DataLists/Lists'
import { useTheme } from '../../../context/ThemeContext'
import { useAuth } from '../../../context/AuthContext'

export default function BoardById () {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [board, setBoard] = useState(null)
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [draggedTask, setDraggedTask] = useState(null)

  const getStorageKey = () => {
    if (!user) return 'boards'
    return `boards_${user.uid}`
  }

  const loadBoards = () => {
    const userKey = getStorageKey()
    const raw = localStorage.getItem(userKey) ?? localStorage.getItem('boards')
    try {
      return JSON.parse(raw) || []
    } catch {
      return []
    }
  }

  useEffect(() => {
    setLoading(true)
    if (!user && !localStorage.getItem('boards')) {
      setBoard(null)
      setLists([])
      setLoading(false)
      return
    }

    const boards = loadBoards()
    const found = boards.find(b => b.id === id)
    if (found) {
      setBoard(found)
      setLists(found.lists || [])
    } else {
      setBoard(null)
      setLists([])
    }
    setLoading(false)
  }, [id, user])

  const persistLists = updatedLists => {
    setLists(updatedLists)

    const userKey = getStorageKey()
    const raw = localStorage.getItem(userKey) ?? localStorage.getItem('boards')
    let boards = []
    try {
      boards = JSON.parse(raw) || []
    } catch {
      boards = []
    }

    const updatedBoards = boards.map(b =>
      b.id === id ? { ...b, lists: updatedLists } : b
    )
    localStorage.setItem(userKey, JSON.stringify(updatedBoards))
    const current = updatedBoards.find(b => b.id === id)
    if (current) setBoard(current)
  }

  const addList = title => {
    const newList = { id: uuidv4(), title, tasks: [] }
    const updated = [...lists, newList]
    persistLists(updated)
  }

  // Handle drag start
  const handleDragStart = (task, sourceListId) => {
    setDraggedTask({ ...task, sourceListId })
  }

  // Handle drop into a list
  const handleDrop = targetListId => {
    if (!draggedTask) return

    // Remove from source list
    const updatedLists = lists.map(list => {
      if (list.id === draggedTask.sourceListId) {
        return {
          ...list,
          tasks: list.tasks.filter(t => t.id !== draggedTask.id)
        }
      }
      return list
    })

    // Add to target list
    const finalLists = updatedLists.map(list => {
      if (list.id === targetListId) {
        return {
          ...list,
          tasks: [...list.tasks, { ...draggedTask }]
        }
      }
      return list
    })

    persistLists(finalLists)
    setDraggedTask(null)
  }

  if (loading) return <p className='p-4'>Loading...</p>

  if (!board)
    return (
      <div className='p-6'>
        <p className='mb-4'>Board not found.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className='px-3 py-2 rounded bg-gray-200 text-gray-900'
        >
          Back to Dashboard
        </button>
      </div>
    )

  return (
    <div
      className={`p-4 min-h-screen ${
        isDark
          ? 'bg-[var(--color-bg-dark)] text-[var(--color-text-dark)]'
          : 'bg-[var(--color-bg-light)] text-[var(--color-text-light)]'
      }`}
    >
      <Greeting />
      <div className='flex gap-4 mt-6'>
        <Lists
          lists={lists}
          boardId={id}
          onUpdateLists={persistLists}
          onDragStart={handleDragStart}
          onDropTask={handleDrop}
        />
        <CreateListForm onAdd={addList} />
      </div>
    </div>
  )
}
