import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { CreateTaskForm } from '../Forms/CreateTaskForm'
import { Task } from '../../compoenent/Task'

export default function Lists ({ lists, boardId, onUpdateLists }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const addTaskToList = (listId, newTask) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: [...(list.tasks || []), newTask]
          }
        : list
    )
    onUpdateLists(updatedLists)

    // persist to localStorage
    const boards = JSON.parse(localStorage.getItem('boards')) || []
    const updatedBoards = boards.map(board =>
      board.id === boardId ? { ...board, lists: updatedLists } : board
    )
    localStorage.setItem('boards', JSON.stringify(updatedBoards))
  }

  return (
    <div className='flex gap-4'>
      {lists.length === 0 ? (
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          No lists yet.
        </p>
      ) : (
        lists.map(list => (
          <div
            key={list.id}
            className={`border border-gray-700 rounded-lg w-82 ${
              isDark ? 'bg-transparent text-gray-100' : 'bg-white text-gray-900'
            }`}
          >
            <div className='p-2 border-b border-gray-700'>
              <h2 className='font-semibold text-lg line-clamp-1'>
                {list.title}
              </h2>
              <p className='text-sm text-gray-500'>
                {list.tasks?.length || 0} task
                {list.tasks?.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Render tasks */}
            <div className='m-2'>
              {list.tasks?.map(task => (
                <Task
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  date={task.date}
                />
              ))}
            </div>

            {/* Add task form */}
            <CreateTaskForm
              boardId={boardId}
              listId={list.id}
              onAddTask={(boardId, listId, newTask) =>
                addTaskToList(list.id, newTask)
              }
            />
          </div>
        ))
      )}
    </div>
  )
}
