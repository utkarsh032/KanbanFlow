import React from 'react'
import { BoardCard } from '../../compoenent/BoardCard'

export const BoardLists = ({ boards, onEdit, onDuplicate, onDelete }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
      {boards.length === 0 ? (
        <p className='text-center col-span-full text-gray-500'>
          No boards created yet.
        </p>
      ) : (
        boards.map(board => (
          <BoardCard
            key={board.id}
            {...board}
            onEdit={() => onEdit(board.id)}
            onDuplicate={() => onDuplicate(board.id)}
            onDelete={() => onDelete(board.id)}
          />
        ))
      )}
    </div>
  )
}
