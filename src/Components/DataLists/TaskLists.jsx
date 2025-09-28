import React from 'react'
import { Task } from '../../compoenent/Task'

export default function TaskLists ({
  list,
  onEditTask,
  onDeleteTask,
  onDragStart
}) {
  return (
    <div className='m-2'>
      {list.tasks?.length > 0 ? (
        list.tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={() => onDragStart(task)}
            className='cursor-move'
          >
            <Task
              id={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              date={task.date}
              onEdit={(taskId, updatedTask) => onEditTask(taskId, updatedTask)}
              onDelete={() => onDeleteTask(task.id)}
            />
          </div>
        ))
      ) : (
        <p className='text-sm text-gray-500 p-2'>No tasks yet</p>
      )}
    </div>
  )
}
