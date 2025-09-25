import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { CreateTaskForm } from '../Forms/CreateTaskForm'
import { FiEdit, FiDelete, FiCheck, FiX } from 'react-icons/fi'
import TaskLists from './TaskLists'

export default function Lists ({ lists, boardId, onUpdateLists }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [editListId, setEditListId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const updateLists = updatedLists => {
    onUpdateLists(updatedLists)
    const boards = JSON.parse(localStorage.getItem('boards')) || []
    const updatedBoards = boards.map(board =>
      board.id === boardId ? { ...board, lists: updatedLists } : board
    )
    localStorage.setItem('boards', JSON.stringify(updatedBoards))
  }

  const addTaskToList = (listId, newTask) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? { ...list, tasks: [...(list.tasks || []), newTask] }
        : list
    )
    updateLists(updatedLists)
  }

  const deleteList = listId => {
    const updatedLists = lists.filter(list => list.id !== listId)
    updateLists(updatedLists)
  }

  const startEditList = list => {
    setEditListId(list.id)
    setEditTitle(list.title)
  }

  const saveEditList = listId => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, title: editTitle } : list
    )
    updateLists(updatedLists)
    setEditListId(null)
    setEditTitle('')
  }

  // Task Features: Edit, Delete
  const handleEditTask = (listId, taskId, updatedTask) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, ...updatedTask } : task
            )
          }
        : list
    )
    updateLists(updatedLists)
  }

  const handleDeleteTask = (listId, taskId) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    )
    updateLists(updatedLists)
  }

  return (
    <div className='flex gap-4 px-4'>
      {lists.length === 0 ? (
        <div
          className={`w-80 h-[10vh] flex items-center justify-center rounded-xl border-2 border-dashed transition ${
            isDark
              ? 'border-gray-600 bg-gray-800/40 text-gray-400 hover:bg-gray-800/70'
              : 'border-gray-300 bg-gray-100/60 text-gray-600 hover:bg-gray-200/80'
          }`}
        >
          <span className='text-sm font-medium'>
            ✨ No lists yet. Start by creating one!
          </span>
        </div>
      ) : (
        lists.map(list => (
          <div
            key={list.id}
            className={`border border-gray-700 rounded-lg w-82 ${
              isDark ? 'bg-transparent text-gray-100' : 'bg-white text-gray-900'
            }`}
          >
            <div className='p-2 border-b border-gray-700 flex justify-between items-center'>
              <div>
                {editListId === list.id ? (
                  <div className='flex gap-2 items-center'>
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className='border p-1 rounded text-sm'
                    />
                    <button
                      onClick={() => saveEditList(list.id)}
                      className='text-green-500'
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={() => setEditListId(null)}
                      className='text-red-500'
                    >
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className='font-semibold text-lg line-clamp-1'>
                      {list.title}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      {list.tasks?.length || 0} task
                      {list.tasks?.length !== 1 ? 's' : ''}
                    </p>
                  </>
                )}
              </div>
              {editListId !== list.id && (
                <div className='flex flex-col gap-2'>
                  <button onClick={() => deleteList(list.id)}>
                    <FiDelete />
                  </button>
                  <button onClick={() => startEditList(list)}>
                    <FiEdit />
                  </button>
                </div>
              )}
            </div>

            {/* Render tasks */}
            <TaskLists
              list={list}
              onEditTask={(taskId, updatedTask) =>
                handleEditTask(list.id, taskId, updatedTask)
              }
              onDeleteTask={taskId => handleDeleteTask(list.id, taskId)}
            />

            {/* Add task form */}
            <CreateTaskForm
              boardId={boardId}
              listId={list.id}
              onAddTask={newTask => addTaskToList(list.id, newTask)}
            />
          </div>
        ))
      )}
    </div>
  )
}
